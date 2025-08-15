# React + TypeScript + Vite

Este proyecto corresponde al módulo de **Recargas de Punto Red**, desarrollado con **React**, **TypeScript** y **Vite**.  
Su objetivo es permitir la gestión y ejecución de recargas de manera rápida, segura y eficiente, sirviendo como una base sólida para aplicaciones web modernas y escalables.

## ⚡ Características principales

- **React** – Biblioteca para la construcción de interfaces de usuario.
- **Vite** – Herramienta de desarrollo y empaquetado rápido.
- **TypeScript** – Tipado estático para mayor robustez.
- **Tailwind CSS** – Estilos modernos y responsivos.

## 🛠 Requisitos previos

Asegúrate de tener instalado en tu sistema:

- **Node.js** (versión recomendada: 18 o superior)
- **npm** o **yarn** como gestor de paquetes

## 📌 Funcionalidades implementadas

- **Autenticación**:
   - Inicio de sesión.
   - Registro de usuario.

- **Gestión de recargas**:
   - Realizar recargas.
   - Selección de operadores y montos.

- **Historial de recargas**:
   - Visualización de recargas realizadas.
   - Detalles y estado de cada transacción.

- **Interfaz modular**:
   - Panel principal de recargas.
   - Modales para confirmación y flujo de recarga.

---

## 🧪 Pruebas automatizadas

El proyecto incluye pruebas con **Vitest** para asegurar la calidad del código y el correcto funcionamiento de los módulos.

### Archivos de test disponibles:

- `test/RechargeDashboard.test.ts` – Pruebas para el panel principal de recargas.'
- `test/RechargeModal.test.ts` – Pruebas para el modal de confirmación de recarga.
- `test/Login.test.ts` – Pruebas para el flujo de inicio de sesión.
- `test/AuthService.test.ts` – Pruebas para el servicio de autenticación.
- `test/OperatorService.ts` – Pruebas para el servicio de autenticación.
- `test/RechargeHistoryService.ts` – Pruebas para el historial de recargas.
- `test/RechargeService.ts` – Pruebas para el servicio de recargas.

### Ejecutar todos los tests:

   npx vitest

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Efbayona/punto-red-front

2. Cd punto-red-front

3. npm install
4. npm run dev
