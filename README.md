# Therapy Management System

A full-stack app for managing therapists, clients and therapy sessions, with create, edit and delete for each and validation on both the front end and the API.

**Tech:** React 18, React Router, Axios, Node.js, Express, Sequelize, MySQL.

## Run it

You need **Node.js 18+** and **MySQL** running locally.

1. Check `server/.env` matches your MySQL login (default user `root`, password `password`). The database is created automatically on first run.
2. Install and start:

```bash
npm install
npm run dev
```

The API runs on http://localhost:5000 and the app opens on http://localhost:3000.

## API

| Method | Path | Description |
| --- | --- | --- |
| GET/POST | `/api/therapists` | List or create therapists |
| GET/PUT/DELETE | `/api/therapists/:id` | Read, update or delete one |
| GET/POST | `/api/clients` | List or create clients |
| GET/PUT/DELETE | `/api/clients/:id` | Read, update or delete one |
| GET/POST | `/api/sessions` | List or book sessions (includes therapist and client names) |
| GET/PUT/DELETE | `/api/sessions/:id` | Read, update or delete one |

Deleting a therapist or client also deletes their sessions.
