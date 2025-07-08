# NoteApp

> A full-stack note-taking application with authentication (email + OTP + Google) and JWT-protected API.

## Features

* Signup/Login with Email + OTP or Google
* JWT-based authentication
* Create & delete notes
* Responsive design with light/dark theme
* Production-ready Docker setup

## Tech Stack

| Layer        | Tech                                             |
| ------------ | ------------------------------------------------ |
| **Frontend** | React (TypeScript) + Vite + TailwindCSS + ShadCN |
| **Backend**  | Node.js (TypeScript) + Express                   |
| **Database** | PostgreSQL / MongoDB / MySQL                     |
| **Auth**     | Google OAuth & Email OTP                         |

---

## Getting Started

### Project Structure

```
.
├── client/            # Frontend (React app)
├── src/               # Backend (Node.js + Express)
├── docker-compose.yaml
├── Dockerfile / etc.
└── Makefile
```

### Prerequisites

* [Node.js](https://nodejs.org/) ≥ 18
* [pnpm](https://pnpm.io/) ≥ 8
* [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## Development Setup

### Install Dependencies

```bash
# Frontend
cd client && pnpm install

# Backend
cd .. && pnpm install
```

### Run Frontend

```bash
cd client
pnpm dev
```

### Run Backend

```bash
pnpm dev
```

---

## Lint & Format

### Frontend

```bash
cd client
pnpm lint
pnpm format
```

### Backend

```bash
pnpm lint
pnpm format
```

---

## Build

### Frontend

```bash
cd client
pnpm build
```

### Backend

```bash
pnpm build
```

---

## Run with Docker

### Build Images

```bash
# Frontend
docker build -t note-app-frontend client

# Backend
docker build -t note-app-backend .
```

### Run Containers

```bash
docker run -p 80:80 note-app-frontend
docker run -p 3000:3000 note-app-backend
```

---

## Docker Compose

For full-stack local setup:

```bash
docker-compose up -d --build
```

Stop and clean up:

```bash
docker-compose down -v
```

---

## Makefile Commands

You can also use the provided `Makefile` for common tasks:

| Task                       | Command                      |
| -------------------------- | ---------------------------- |
| Install deps (both)        | `make install`               |
| Dev frontend               | `make dev-frontend`          |
| Dev backend                | `make dev-backend`           |
| Lint frontend              | `make lint-frontend`         |
| Lint backend               | `make lint-backend`          |
| Format frontend            | `make format-frontend`       |
| Format backend             | `make format-backend`        |
| Build frontend             | `make build-frontend`        |
| Build backend              | `make build-backend`         |
| Docker build frontend      | `make docker-build-frontend` |
| Docker build backend       | `make docker-build-backend`  |
| Docker bake                | `make docker-bake`           |
| Docker bake (no cache)     | `make docker-bake-clean`     |
| Compose up                 | `make compose-up`            |
| Compose down               | `make compose-down`          |
| Clean node\_modules & dist | `make clean`                 |

---

## Notes

* The frontend React app lives in the `client/` folder.
* Both frontend & backend use `pnpm` and have their own `node_modules`.
* Recommended to use Docker Compose or Makefile for local dev & production builds.

