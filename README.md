![UNIMERCS Logo](assets/UnimercsLogo.png)

# UNIMERCS

## Descripción

UNIMERCS es una plataforma de marketplace universitario diseñada para estudiantes de la Pontificia Universidad Javeriana. El sistema permite a los estudiantes publicar, explorar y contactar vendedores de productos y servicios dentro del campus, incluyendo libros, comida y objetos de segunda mano. El objetivo es centralizar el intercambio entre la comunidad estudiantil en un solo lugar seguro y accesible con correo institucional.

---

## Equipo del Proyecto

| Nombre               | Rol                                   | GitHub                                             |
|----------------------|---------------------------------------|----------------------------------------------------|
| Juan Pablo Sánchez   | Scrum Master · Product Owner          | [jsanchez312](https://github.com/jsanchez312)      |
| German Rodriguez     | Developer · QA Lead                   | [germandrzmr](https://github.com/germandrzmr)      |

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

**Requisitos**
- Git
- Navegador web moderno (Chrome, Firefox, Edge)
- Extensión Live Server (recomendada para desarrollo local)

### Clonar el repositorio

```bash
git clone https://github.com/jsanchez312/unimercs.git
cd unimercs
```

### Ejecución local

Abre el archivo `prueba.html` directamente en el navegador, o usa Live Server en VS Code:

```bash
# Con Live Server en VS Code
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
Estudiante, Pontificia Universidad Javeriana
📧 sanchez.jp@javeriana.edu.co
🐙 [github.com/jsanchez312](https://github.com/jsanchez312)

**Germán Rodríguez**
Estudiante, Pontificia Universidad Javeriana
📧 ge.rodriguez@javeriana.edu.co
🐙 [github.com/germandrzmr](https://github.com/germandrzmr)

---

## Licencia

Proyecto desarrollado con fines académicos — Pontificia Universidad Javeriana 2025.
