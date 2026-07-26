# Budgety

Budgety is a personal budgeting web application built with Angular on the frontend and Node.js/Express on the backend. It helps users manage income and expenses, organize transactions into categories, track savings, and review budget trends over time.

## Overview

Budgety is designed to make personal finance management simple and visual. Users can create and manage transactions, monitor their balance, and gain insight into their spending habits through category-based summaries and budget views.

## Features

- Track income and expenses with transaction management
- Organize spending with custom categories, colors, and icons
- Review budgets through latest, monthly, and yearly views
- Monitor savings and overall balance
- Sign in securely with Google OAuth
- Enjoy a responsive interface built with Angular Material and Bootstrap
- Internationalization (i18n) on the frontend with runtime language switching

## Supported Locales

- en-GB (default)
- de-DE
- bg-BG
- fr-FR
- es-ES

## i18n Architecture

The frontend uses `@ngx-translate/core` with a custom HTTP loader that merges the locale JSON files from `assets/i18n/<locale>/` into one dictionary per language.

Frontend translation assets are under:

- server/client/src/assets/i18n/en-GB/{common.json, validation.json, errors.json}
- server/client/src/assets/i18n/de-DE/{common.json, validation.json, errors.json}
- server/client/src/assets/i18n/bg-BG/{common.json, validation.json, errors.json}
- server/client/src/assets/i18n/fr-FR/{common.json, validation.json, errors.json}
- server/client/src/assets/i18n/es-ES/{common.json, validation.json, errors.json}

Core frontend i18n files:

- server/client/src/app/app.module.ts
- server/client/src/app/shared/i18n/locales.ts
- server/client/src/app/shared/services/language.service.ts

Behavior:

1. `LanguageService` owns locale state and exposes `currentLanguage$`.
2. Selected language is persisted in localStorage and restored on startup.
3. App bootstrap sets the current language and preloads the merged translation dictionary.
4. The `translate` pipe and `translate` directive come from ngx-translate.
5. Missing keys fall back to the default locale data that is merged into each loaded language.

Usage examples:

```html
{{ 'common.save' | translate }}
{{ 'common.welcome' | translate:{name: user.name} }}
<div translate="common.cancel"></div>
```

## Adding a New Language

1. Add locale code to `SUPPORTED_LOCALES` in:
   - server/client/src/app/shared/i18n/locales.ts
2. Create translation folders/files for frontend:
   - `server/client/src/assets/i18n/<locale>/common.json`
   - `server/client/src/assets/i18n/<locale>/validation.json`
   - `server/client/src/assets/i18n/<locale>/errors.json`
3. Add translated keys to all namespaces.
4. Restart frontend.

## Tech Stack

- Frontend: Angular 17, TypeScript, Angular Material, Bootstrap, NgRx
- Backend: Node.js, Express.js, MongoDB with Mongoose
- Authentication: Passport.js with Google OAuth 2.0
- Development tools: Concurrently, Nodemon, ESLint, Prettier

## Project Structure

- server/: Express API, authentication, MongoDB models, and routes
- server/client/: Angular frontend application
- server/client/src/app/: feature modules for home, latest, monthly, yearly, categories, dashboard, and shared UI components

## Prerequisites

Make sure you have the following installed:

- Node.js 22.22.3
- npm 10.9.2
- MongoDB running locally or a reachable MongoDB Atlas instance

## Getting Started

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd budgety
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd client
   npm install
   ```

4. Create local development configuration

   Create a file at server/config/dev.js with your local settings:

   ```js
   module.exports = {
     googleClientID: 'your-google-client-id',
     googleClientSecret: 'your-google-client-secret',
     cookieKey: 'your-cookie-key',
     mongoURL: 'mongodb://localhost:27017/budgety',
     redirectDomain: 'http://localhost:4200'
   };
   ```

   You will need Google OAuth credentials from the Google Cloud Console.

5. Start the application

   From the server directory, run:
   ```bash
   npm run dev
   ```

   For Render deployments, set the runtime to Node.js 22.22.3 explicitly in the service settings.

   This launches:
   - the backend API on http://localhost:5000
   - the Angular client on http://localhost:4200

## Available Scripts

### Backend

- npm run server: start the API with Nodemon
- npm run client: start the Angular frontend
- npm run dev: run the backend and frontend together

### Frontend

From server/client:

- npm start: start the Angular development server
- npm run build: build the frontend for production
- npm run test: run unit tests
- npm run e2e: run end-to-end tests

## License

This project is licensed under the ISC license.
