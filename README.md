# RecurEngine

A NestJS backend API server with a React frontend.

## Project Structure

```
recurengine/
├── backend/          - NestJS API server
├── frontend/         - React Vite frontend
├── package.json      - Root package.json
├── tsconfig.json     - TypeScript config
└── README.md         - This file
```

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Backend (NestJS)

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Run the backend:
   ```bash
   npx ts-node main.ts
   ```
   OR compile first then run:
   ```bash
   npx tsc && node dist/main.js
   ```
   
   The API will run on `http://localhost:3000`

### Frontend (React)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` (default Vite port)

### API Endpoints

The NestJS backend provides these API modules:
- `/auth` - Authentication (signup, login, password update)
- `/users` - User management
- `/products` - Product catalog
- `/plans` - Subscription plans
- `/subscriptions` - Subscription management
- `/invoices` - Invoice generation
- `/payments` - Payment processing
- `/discounts` - Discount codes
- `/finance` - Financial reports

### Environment Variables

Create a `.env` file in the backend root if needed for database configuration (Prisma ORM).

## License

ISC