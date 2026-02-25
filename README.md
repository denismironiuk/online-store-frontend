# EasyStore - Frontend Service 🚀

This is the frontend microservice for the **EasyStore** platform. It provides a fast and responsive e-commerce experience built with **React 18** and **Vite**, fully integrated into a GitOps-driven infrastructure.

---

## 🏗 DevOps & CI/CD Integration

This repository is a core part of a high-availability CI/CD pipeline:

### 1. Automated Quality Gate (ESLint)
* Every push to `main` triggers an automated **Quality Gate** in Jenkins.
* We enforce strict linting rules using **ESLint**. The pipeline will fail if any errors are detected, ensuring code consistency before the build starts.

### 2. "Build Once, Run Anywhere" (Dynamic Config)
* To avoid hardcoding backend URLs, the app uses **dynamic environment injection**.
* It reads configurations from `window._env_.VITE_API_URL`.
* In Kubernetes, an entrypoint script generates `env-config.js` on the fly from ConfigMaps, allowing the same Docker image to work across any environment.

### 3. Professional Containerization
* **Multi-stage Docker Build**:
    * **Build Stage**: Uses `node:22-alpine` to compile and minify assets.
    * **Production Stage**: Uses `nginx:1.27-alpine` to serve content, resulting in a secure and ultra-lightweight image.

---

## 🛠 Tech Stack
* **Framework**: React 18 (Vite)
* **State Management**: Redux Toolkit
* **Routing**: React Router 6
* **CI/CD Tools**: Jenkins, Kaniko, ArgoCD, Kustomize
* **Cloud Networking**: Azure CNI Overlay

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
2. **Run dev server**:
   ```bash
   npm run dev
3. **Manual Lint Check**:
    ```bash
    npm run lint
