# EventConnect Backend

Backend API REST para EventConnect, una plataforma de gestión de eventos, usuarios, chats y amigos.

## Requisitos
- Node.js >= 18
- MongoDB (se recomienda usar Docker Compose incluido)

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd backend-stw
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y completa los valores necesarios:
```bash
cp .env.example .env
# Edita .env con tus valores
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecutar con Docker Compose (recomendado)
```bash
docker-compose up --build
```
Esto levantará el backend, MongoDB y mongo-express.

### 5. Ejecutar localmente (sin Docker)
Lanza MongoDB localmente y luego:
```bash
npm run dev
# o
npm start
```

## Documentación de la API

Swagger UI disponible en:
```
http://localhost:3000/api/docs
```

## Entidades principales

- **User**: Usuarios registrados (nombre, email, contraseña, amigos, etc.)
- **Event**: Eventos creados por usuarios (título, descripción, fecha, ubicación, participantes)
- **FriendRequest**: Solicitudes de amistad entre usuarios
- **Conversation**: Conversaciones de chat entre usuarios
- **Message**: Mensajes dentro de una conversación

## Estructura de carpetas

- `src/routes/` — Definición de rutas de la API
- `src/controllers/` — Lógica de negocio
- `src/models/` — Modelos de datos (Mongoose)
- `src/middlewares/` — Middlewares de autenticación, validación, etc.
- `src/services/` — Servicios auxiliares
- `src/utils/` — Utilidades y helpers
- `src/tests/` — Tests automáticos

## Scripts útiles

- `npm run dev` — Ejecuta el backend en modo desarrollo con nodemon
- `npm start` — Ejecuta el backend en modo producción
- `npm test` — Ejecuta los tests

## Notas
- El backend escucha por defecto en el puerto 3000 (configurable por variable de entorno `PORT`).
- La documentación Swagger se genera automáticamente a partir de anotaciones en los archivos de rutas.
- Para desarrollo, puedes usar mongo-express en `http://localhost:8081` para gestionar la base de datos visualmente.

---
© 2026 EventConnect