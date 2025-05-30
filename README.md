# Clone X Fullstack App

This project runs a fullstack web application using Docker and Docker Compose. It includes:

- **Backend**: REST API (located in `clone_x_backend/`)
- **Frontend**: React (or similar) client (located in `clone_x_frontend/`)

## 🗂 Directory Structure

```
project-root/
├── docker-compose.yml
├── clone_x_backend/
│ └── Dockerfile
│ └── [backend source code]
├── clone_x_frontend/
│ └── Dockerfile
│ └── [frontend source code]
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Run the App

```bash
docker-compose up --build

Backend will be available at: http://localhost:5000
Frontend will be available at: http://localhost:3000 (if exposed)

# Shutdown
docker-compose down



