const fs   = require('fs');
const path = require('path');


function calcularComplejidadCiclomatica(codigoFuente) {
  const condiciones = [
    /\bif\b/g,
    /\belse\s+if\b/g,
    /\bwhile\b/g,
    /\bfor\b/g,
    /\bcase\b/g,
    /\bcatch\b/g,
    /\?\./g,      
    /\?\?/g,     
    /&&/g,
    /\|\|/g
  ];

  let total = 1; 
  for (const patron of condiciones) {
    const coincidencias = codigoFuente.match(patron);
    if (coincidencias) total += coincidencias.length;
  }

  return total;
}


function calcularDensidadComentarios(codigoFuente) {
  const lineas = codigoFuente.split('\n').filter(l => l.trim().length > 0);
  const comentarios = lineas.filter(l => {
    const t = l.trim();
    return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('/**');
  });

  if (lineas.length === 0) return 0;
  return ((comentarios.length / lineas.length) * 100).toFixed(2);
}


function calcularLineasEfectivas(codigoFuente) {
  return codigoFuente
    .split('\n')
    .filter(l => {
      const t = l.trim();
      return t.length > 0 &&
             !t.startsWith('//') &&
             !t.startsWith('*') &&
             !t.startsWith('/*') &&
             !t.startsWith('/**');
    }).length;
}


function analizarArchivo(rutaArchivo) {
  const codigo = fs.readFileSync(rutaArchivo, 'utf8');
  const nombre = path.basename(rutaArchivo);

  const cc        = calcularComplejidadCiclomatica(codigo);
  const densidad  = calcularDensidadComentarios(codigo);
  const lineas    = calcularLineasEfectivas(codigo);

  return {
    archivo: nombre,
    complejidadCiclomatica: cc,
    nivelCC: cc <= 5 ? 'BAJA' : cc <= 10 ? 'MODERADA ' : 'ALTA',
    densidadComentarios: `${densidad}%`,
    nivelDoc: densidad < 10 ? 'SUBDOCUMENTADO ' : densidad <= 30 ? 'ADECUADO' : 'SOBRECOMENTADO',
    lineasEfectivas: lineas,
    nivelTamanio: lineas < 100 ? 'PEQUEÑO ' : lineas <= 300 ? 'MEDIANO' : 'GRANDE'
  };
}

function generarReporte(directorioBackend) {
  const resultados = [];

  function recorrer(dir) {
    if (!fs.existsSync(dir)) return;
    const entradas = fs.readdirSync(dir);
    for (const entrada of entradas) {
      const ruta = path.join(dir, entrada);
      const stat = fs.statSync(ruta);
      if (stat.isDirectory() && entrada !== 'node_modules') {
        recorrer(ruta);
      } else if (entrada.endsWith('.js') && !entrada.includes('.test.')) {
        resultados.push(analizarArchivo(ruta));
      }
    }
  }

  recorrer(directorioBackend);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('       REPORTE DE MÉTRICAS DE CALIDAD - UniMercs       ');
  console.log('═══════════════════════════════════════════════════════\n');

  for (const r of resultados) {
    console.log(`${r.archivo}`);
    console.log(`   Complejidad Ciclomática : ${r.complejidadCiclomatica} → ${r.nivelCC}`);
    console.log(`   Densidad de Comentarios : ${r.densidadComentarios} → ${r.nivelDoc}`);
    console.log(`   Líneas Efectivas        : ${r.lineasEfectivas} → ${r.nivelTamanio}`);
    console.log('');
  }

  const promCC      = (resultados.reduce((a, r) => a + r.complejidadCiclomatica, 0) / resultados.length).toFixed(1);
  const archivosAlta = resultados.filter(r => r.complejidadCiclomatica > 10).length;

  console.log('─── RESUMEN ────────────────────────────────────────────');
  console.log(`   Archivos analizados      : ${resultados.length}`);
  console.log(`   Complejidad CC promedio  : ${promCC}`);
  console.log(`   Archivos con CC alta (>10): ${archivosAlta}`);
  console.log('════════════════════════════════════════════════════════\n');

  return resultados;
}

if (require.main === module) {
  const dir = process.argv[2] || './unimercs-backend';
  generarReporte(dir);
}

module.exports = {
  calcularComplejidadCiclomatica,
  calcularDensidadComentarios,
  calcularLineasEfectivas,
  analizarArchivo,
  generarReporte
};
