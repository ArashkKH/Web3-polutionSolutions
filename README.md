# Climate Solutions Portfolio

A full-stack portfolio web application built with **Node.js, Express, EJS, Tailwind CSS, and DaisyUI**.

This project presents climate-focused solution data through a clean, responsive UI with server-rendered pages, dynamic routing, and sector-based filtering.

## Live Demo

- https://web3-arashkh.vercel.app/

## Project Purpose

This application was created as part of my web programming coursework and refined as a portfolio project for my resume. It demonstrates my ability to:

- Build and structure a Node/Express server-rendered application
- Work with modularized data/service layers
- Design responsive interfaces using Tailwind CSS + DaisyUI
- Implement dynamic routes, query filtering, and error handling
- Deploy a production-ready app to Vercel

## Features

- Server-side rendered pages using EJS templates
- Dynamic project listing and project detail routes
- Filter projects by sector using query parameters
- Reusable layout partials (header/imports)
- Random featured projects on homepage
- Custom 404 page handling
- Responsive UI for desktop and mobile

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Templating:** EJS
- **Styling:** Tailwind CSS, DaisyUI
- **Deployment:** Vercel

## Routes

- `/` - Home page with featured projects
- `/about` - Personal/about page
- `/solutions/projects` - All projects
- `/solutions/projects?sector=<name>` - Projects filtered by sector
- `/solutions/projects/:id` - Single project details
- `*` - Custom 404 page

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd Web3-polutionSolutions
npm install
```

### 2. Run the app

```bash
npm start
```

The server runs on:

- `http://localhost:8080` (default)
- or `process.env.PORT` when provided

### 3. Tailwind development build (optional)

```bash
npm run tw:build
```

## Project Structure

```text
.
|-- data/
|   |-- projectData.json
|   `-- sectorData.json
|-- modules/
|   `-- projects.js
|-- public/
|   |-- css/
|   `-- images/
|-- views/
|   |-- partials/
|   |-- home.ejs
|   |-- about.ejs
|   |-- projects.ejs
|   |-- project.ejs
|   `-- 404.ejs
`-- server.js
```

## What I Learned

- Structuring Express apps with separation of concerns
- Building reusable UI components with EJS partials
- Handling async data initialization and route-level errors
- Creating accessible, responsive layouts quickly with utility-first CSS

## Author

**Arash Kheirollahi**

- Portfolio: https://arashkh.com
- Live Project: https://web3-arashkh.vercel.app/
