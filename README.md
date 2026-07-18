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
