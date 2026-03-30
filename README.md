![UNIMERCS Logo](assets/UnimercsLogo.png)

# UNIMERCS
### Compra. Vende. Conéctate en el campus.

## Descripción

UNIMERCS es una plataforma web de marketplace universitario diseñada exclusivamente para estudiantes de la Pontificia Universidad Javeriana. Permite publicar, explorar y contactar vendedores de productos y servicios dentro del campus, incluyendo libros, comida y objetos de segunda mano.

A diferencia de otras plataformas genéricas, UNIMERCS está pensada para la comunidad javeriana: acceso exclusivo con correo institucional, sin intermediarios y sin costos.

**¿Qué problema resuelve?**

Los estudiantes no tienen un espacio centralizado y seguro para intercambiar productos dentro del campus. Plataformas como Facebook Marketplace o Instagram no garantizan que el comprador o vendedor sea alguien de la misma universidad, generando desconfianza. UNIMERCS resuelve esto limitando el acceso únicamente a correos `@javeriana.edu.co`, creando una comunidad cerrada y confiable.

---

## Equipo del Proyecto

| Nombre               | Rol                                        | GitHub                                          |
|----------------------|--------------------------------------------|-------------------------------------------------|
| Juan Pablo Sánchez   | Scrum Master · Product Owner               | [@jsanchez312](https://github.com/jsanchez312) |
| German Rodriguez     | Developer · QA Lead                        | [@germandrzmr](https://github.com/germandrzmr) |

---

## Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Base de Datos:** PostgreSQL *(por implementar)*
- **Control de versiones:** Git + GitHub
- **Metodología:** Scrum + Gitflow

---

## Estructura del Proyecto

```text
unimercs/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── user_story.md
│   │   └── bug_report.md
│   └── PULL_REQUEST_TEMPLATE.md
├── assets/
│   └── logo.png
├── docs/
│   ├── ECB.md
│   ├── clases.md
│   ├── componentes.md
│   └── despliegue.md
├── src/
│   ├── prueba.html
│   ├── pruebaExplorar.html
│   ├── pruebaCrearPub.html
│   ├── pruebaPerfil.html
│   ├── betalogin.html
│   ├── BetaRegister.html
│   ├── pruebaPerfil.css
│   └── pruebaPerfil.js
├── .gitignore
├── README.md
└── CHANGELOG.md
```

---

## Instalación y Ejecución

### Prerrequisitos

- Git
- Navegador web moderno (Chrome, Firefox, Edge)
- IDE recomendado: Visual Studio Code
- Extensión recomendada: Live Server

### Clonar el repositorio

```bash
git clone https://github.com/jsanchez312/unimercs.git
cd unimercs
```

### Ejecución local

Abre `prueba.html` directamente en el navegador, o usa Live Server en VS Code:

```bash
# Click derecho sobre prueba.html → "Open with Live Server"
```

### Ejecución de pruebas

Las pruebas son manuales por ahora. Verifica los flujos principales:

- Registro e inicio de sesión con correo `@javeriana.edu.co`
- Creación y visualización de publicaciones
- Filtrado por categoría en la pantalla Explorar

---

## Contexto Académico

- **Asignatura:** Fundamentos de Ingeniería de Software
- **Docente:** Luis Gabriel Moreno Sandoval, PhD
- **Contacto docente:** morenoluis@javeriana.edu.co
- **Institución:** Pontificia Universidad Javeriana, Bogotá

---

## Contacto

**Juan Pablo Sánchez**
Estudiante de Ingeniería de Sistemas, Pontificia Universidad Javeriana
📧 sanchez.jp@javeriana.edu.co · 🐙 [@jsanchez312](https://github.com/jsanchez312)

**German Rodriguez**
Estudiante de Ingeniería de Sistemas, Pontificia Universidad Javeriana
📧 ge.rodriguez@javeriana.edu.co · 🐙 [@germandrzmr](https://github.com/germandrzmr)

---

## Licencia

Proyecto desarrollado con fines académicos — Pontificia Universidad Javeriana 2025.
