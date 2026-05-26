![UNIMERCS Logo](assets/UnimercsLogo.png)

# UNIMERCS – Marketplace Universitario

---

## Visión General
UNIMERCS es un **marketplace universitario** diseñada para la comunidad de la **Pontificia Universidad Javeriana**. Permite a los estudiantes publicar, explorar y contactar a vendedores de libros, alimentos y objetos de segunda mano dentro del campus, todo mediante una interfaz HTML/CSS/JS simple y un backend Node.js/Express.

---
## Equipo del Proyecto

| Nombre               | Rol                                   | GitHub                                             |
|----------------------|---------------------------------------|----------------------------------------------------|
| Juan Pablo Sánchez   | Scrum Master · Product Owner          | [jsanchez312](https://github.com/jsanchez312)      |
| German Rodriguez     | Developer · QA Lead                   | [germandrzmr](https://github.com/germandrzmr)      |

---

## Tecnologías
| Capa | Tecnologías |
|------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Node.js (v20+), Express, Mongoose (MongoDB) – se prevé migrar a PostgreSQL |
| **Base de datos** | MongoDB (actual) |
| **Pruebas** | Jest (unitarias e integración) |
| **Contenedores** | Docker, Docker‑Compose |
| **Integración continua / Linter** | SonarQube, ESLint (a través de `metrics.js`) |
| **Control de versiones** | Git + GitHub (flujo Gitflow) |
| **Documentación** | Markdown, diagramas Mermaid, wiki en `docs/wiki` |

---

## Estructura completa del proyecto
```
FIS_2610_3513_G6/
├─ .dockerignore
├─ .git/
├─ .github/
│   └─ ISSUE_TEMPLATE/
│       ├─ bug_report.md
│       └─ user_story.md
├─ .gitignore
├─ BOILERPLATE_template.md
├─ CHANGELOG.md
├─ CONTRIBUTING.md
├─ Dockerfile
├─ LICENSE
├─ Makefile
├─ README.md
├─ assets/
│   ├─ .gitkeep
│   └─ UnimercsLogo.png
├─ conf/
├─ docker-compose.yml
├─ docs/
│   ├─ ECB.md
│   ├─ clases.md
│   ├─ componentes.md
│   └─ despliegue.md
├─ frontend/
├─ jest.config.js
├─ jest.setup.js
├─ jupyter/
├─ metrics.js
├─ package.json
├─ reports/
├─ scripts/
├─ services/
├─ sonar-project.properties
├─ src/
│   ├─ CreationalPatterns/
│   │   ├─ .gitkeep
│   │   ├─ Prototype.js
│   │   └─ factoryMethod.js
│   ├─ behavioralPatterns/
│   │   ├─ .gitkeep
│   │   ├─ observer.js
│   │   └─ strategy.js
│   ├─ main/
│   │   ├─ html/
│   │   └─ resources/
│   ├─ structuralPatterns/
│   │   ├─ .gitkeep
│   │   ├─ decorator.js
│   │   └─ facade.js
│   └─ test/
├─ temp/
└─ unimercs-backend/
```

---

## Instalación y Ejecución Local
### Prerrequisitos
- **Git**
- **Node.js ≥ 20** (incluye npm)
- **Docker** (opcional, para despliegue en contenedor)
- **VS Code** con la extensión *Live Server* (recomendado)

### 1. Clonar el repositorio
```bash
git clone https://github.com/jsanchez312/unimercs.git
cd unimercs
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env   # editar .env con tus credenciales y puertos
```

### 4. Ejecutar la aplicación
#### Opción 1 – Servidor Node.js
```bash
npm start   # ejecuta server.js (escucha en http://localhost:3000)
```
#### Opción 2 – Docker
```bash
docker compose up --build   # levanta Node + Mongo
```
Accede a `http://localhost:3000`.

### 5. Frontend con Live Server (VS Code)
Abre cualquier archivo dentro de `src/` y elige **“Open with Live Server”** para recarga automática.

---

## Pruebas
```bash
npm test                # pruebas unitarias con Jest
npm run test:coverage   # genera reporte de cobertura
npm run test:watch      # modo watch para desarrollo
```
> Actualmente la mayoría de las pruebas son manuales (flujos de registro, inicio de sesión, creación y búsqueda de publicaciones). Se irán automatizando progresivamente.

---

## Documentación y Wiki
- **Docs** (`docs/`): decisiones de arquitectura, guía de despliegue, componentes, etc.
- **Guías de usuario** (`user_guide/`): tutoriales paso‑a‑paso para estudiantes.
- **Diagramas** (`Diagramas/`): diagramas de flujo, entidad‑relación, arquitectura.

---

## Contribuir
1. Haz **fork** del repositorio.
2. Crea una rama descriptiva: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza los cambios y verifica que pasen las pruebas.
4. Abre un **Pull Request** dirigido a la rama `dev` (flujo Gitflow).
5. Asegúrate de que el CI (Jest, SonarQube) apruebe el PR.

Consulta [`CONTRIBUTING.md`](file:///c:/Users/juanp/Downloads/iririr/FIS_2610_3513_G6/CONTRIBUTING.md) para más detalles.

---

## Contexto Académico

- **Asignatura:** Fundamentos de Ingeniería de Software
- **Docente:** Luis Gabriel Moreno Sandoval, PhD
- **Contacto docente:** morenoluis@javeriana.edu.co
- **Institución:** Pontificia Universidad Javeriana, Bogotá

---

## Contacto
- **Juan Pablo Sánchez** – estudiante – `sanchez.jp@javeriana.edu.co` – [GitHub](https://github.com/jsanchez312)
- **Germán Rodríguez** – estudiante – `ge.rodriguez@javeriana.edu.co` – [GitHub](https://github.com/germandrzmr)

---
