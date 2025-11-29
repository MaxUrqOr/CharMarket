# CharMarket - Centro de Notificaciones

Este es un proyecto de demostración técnica que implementa un centro de notificaciones multicanal utilizando Next.js y una arquitectura basada en el patrón de diseño Strategy. El sistema es capaz de enviar notificaciones a través de Email, SMS, WhatsApp y notificaciones Push.

![Diagrama UML](DiagramaUML/UML.svg)

## Características

- **Notificaciones Multicanal:** Envía mensajes a través de diferentes canales según la configuración del evento.
- **Arquitectura Flexible:** Utiliza el patrón de diseño Strategy para desacoplar la lógica de envío de cada canal, permitiendo añadir nuevos canales fácilmente.
- **Configuración por Evento:** Permite definir qué canales de notificación se deben usar para diferentes tipos de eventos (ej. "Nuevo Pedido", "Promoción", etc.).
- **Frontend Interactivo:** Una interfaz construida con Next.js y Tailwind CSS para configurar y enviar notificaciones.

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Notificaciones Push:** [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 
[!!!PENDIENTE!!! NO FUNCIONA EL ENVIÓ DE NOTIFICACIONES DEBIDO A UN ERROR RELACIONADO A EL VAPID KEY]
- **Notificaciones Email:** [SendGrid](https://sendgrid.com/)
- **Notificaciones SMS/WhatsApp:** [Twilio](https://www.twilio.com/)

## Primeros Pasos

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

- Node.js (v18 o superior)
- Cuentas en Firebase, SendGrid y Twilio para obtener las credenciales necesarias.
- Activar las credenciales para cada api [Firebase, SendGrid, Twilio].

### 2. Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```
### 3. Configuración

Crea un archivo `.env` en la raíz del proyecto y agrega las credenciales de Firebase, SendGrid y Twilio:


# SendGrid (Correo Electrónico)
```bash
SENDGRID_API_KEY="SG.xxxxxx.yyyyyyyyy"
SENDGRID_FROM_EMAIL="notificaciones@tu-dominio.com"
```
# Twilio (WhatsApp y SMS)
```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_PHONE_NUMBER="+1234567890"
TWILIO_WHATSAPP_NUMBER="whatsapp:+1234567890"
```
# Firebase (Push Notifications)
```bash
FIREBASE_PROJECT_ID="xxxxxxxxxxxxxxxxx"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="xxxxxxxxxxxxxxxxx@xxxxxxxx-xxxxxxxx.xxxxxxxx.com"
NEXT_PUBLIC_FIREBASE_API_KEY="xxxxxxxxxxxxxxx"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="xxxxxxxxxx-xxxxx.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="xxxxxxxxxxxxx-xxxxxx"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="xxxxxxxxxxxxxxx-xxxx.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1111111111111111"
NEXT_PUBLIC_FIREBASE_APP_ID="1:111111111111:web:xxxxxxxxxxxx"
NEXT_PUBLIC_FIREBASE_VAPID_KEY="BCxxxxxxxxxxxxxxx-qEXXXXXXX"
```

### 4. Sobre el proyecto
Este es un proyecto de demostración que implementa un centro de notificaciones multicanal utilizando Next.js y una arquitectura basada en el patrón de diseño Strategy. El sistema es capaz de enviar notificaciones a través de Email, SMS, WhatsApp y notificaciones Push.

## Proyecto Next.js
Este es un proyecto creado con Next.js, inicializado mediante create-next-app.

## Inicio Rápido

Ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Luego abre tu navegador en:

```bash
http://localhost:3000
```
Puedes comenzar a editar la página inicial modificando el archivo:

```bash
app/page.tsx
```

Los cambios se aplicarán automáticamente gracias al Hot Reloading.
Este proyecto utiliza next/font para optimizar y cargar la tipografía Geist, desarrollada por Vercel.

## Documentación y Recursos

Para aprender más sobre Next.js, consulta los siguientes recursos:
Documentación oficial: https://nextjs.org/docs
Tutorial interactivo: https://nextjs.org/learn
Repositorio oficial en GitHub: https://github.com/vercel/next.js