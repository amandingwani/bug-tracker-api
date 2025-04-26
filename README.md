# 🐞 Bug Tracker API

A RESTful API built with **Node.js**, **TypeScript**, **Prisma**, and **Docker**, designed to manage and track bugs effectively in software projects. This service supports Google OAuth authentication and follows best practices for development, deployment, and testing.

<!-- Prettier badge -->
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## 🚀 Features

- User authentication via Google OAuth
- Bug creation, tracking, and status updates
- Project and user management
- Prisma ORM with PostgreSQL
- Fully Dockerized setup
- Pre-configured ESLint and Prettier for consistent code style

---

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- OAuth 2.0 (Google)
- JWT Authentication

---

## ⚙️ Environment Variables

These are required in a `.env` file:

```env
PORT=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
CLIENT_URL=
NODE_ENV=development
JWT_SECRET=
DATABASE_URL=
AXIOM_DATASET=
AXIOM_TOKEN=
AUTH_COOKIE_DOMAIN=