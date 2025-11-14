# Weatherly – Full Stack (Next.js + NestJS + MySQL)

Versión para despliegue en Kubernetes + ArgoCD

Este repositorio contiene:

- Frontend → Next.js + TypeScript
- Backend → NestJS + TypeScript
- Base de datos → MySQL
- Dockerfiles individuales por servicio

El objetivo final es tener:

frontend/
backend/
k8s/

Cada servicio tendrá su propia imagen Docker y su propio Deployment en Kubernetes.

---

1. Project Structure

---

/weatherly
│── /frontend # Next.js frontend
│── /backend # NestJS backend
│── /k8s # Kubernetes manifests
│── README.txt

---

2. Levantar MySQL localmente (desarrollo)

---

docker run -d \
 --name mysql-weatherly \
 -e MYSQL_ROOT_PASSWORD=yourpassword \
 -e MYSQL_DATABASE=weatherly \
 -p 3306:3306 \
 mysql:8

Credenciales para backend:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=weatherly

---

3. Levantar el Backend (NestJS)

---

1. Ir a /backend:

   cd backend
   npm install

2. Crear archivo .env:

   PORT=4000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=weatherly
   OPENWEATHER_API_KEY=your_api_key

3. Ejecutar:

   npm run start:dev

Backend disponible:
http://localhost:4000

Swagger:
http://localhost:4000/api

---

4. Levantar el Frontend (Next.js)

---

1. Ir a /frontend:

   cd frontend
   npm install

2. Crear archivo .env.local:

   NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

3. Ejecutar:

   npm run dev

Frontend disponible:
http://localhost:3000

---

5. Construir imágenes Docker individualmente

---

Backend:

    cd backend
    docker build -t weatherly-backend .
    docker run -p 4000:4000 weatherly-backend

Frontend:

    cd frontend
    docker build -t weatherly-frontend .
    docker run -p 3000:3000 weatherly-frontend

MySQL ya fue levantado con docker run.

---

6. Estructura recomendada para Kubernetes (ArgoCD)

---

/k8s
├── mysql/
│ ├── deployment.yaml
│ └── service.yaml
├── backend/
│ ├── deployment.yaml
│ ├── service.yaml
│ └── configmap.yaml
├── frontend/
│ ├── deployment.yaml
│ ├── service.yaml
└── ingress.yaml

Cada carpeta será una app para ArgoCD.

---

7. Flujo de despliegue recomendado

---

1. Hacer commit del código
2. Build de imágenes Docker
3. Push a Docker Hub / ECR / ACR (el que prefieras)
4. Actualizar images en los YAML de Kubernetes
5. ArgoCD sincroniza automáticamente

---

## ¿Necesitas algo más?

Puedo generarte:

- Los Dockerfile completos de frontend y backend
- Los YAML de Kubernetes listos para aplicar
- El Application de ArgoCD
- El archivo .env.example para cada servicio
