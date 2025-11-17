# GitHub Copilot Instructions for react-supabase-saas-template

## Project Overview

This is a SaaS template/on-premise web platform built with Vite, React, TypeScript, and Supabase. The project is designed to support both SaaS deployment (Vercel) and template/on-premise deployment for organizations.

## Tech Stack

### Frontend
- **Framework**: Vite + React 19 + TypeScript
- **UI Library**: Ant Design (antd)
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Charts**: Chart.js with react-chartjs-2
- **Auth**: Supabase Auth SDK

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database & Auth**: Supabase
- **AI Services**: OpenAI, Google GenAI
- **Dev Tools**: tsx for development

## Repository Structure

```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Feature-specific modules
│   │   ├── services/      # API and external service integrations
│   │   ├── redux/         # Redux store configuration
│   │   ├── routes/        # Routing configuration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── themes/        # Theme and branding configuration
│   │   ├── utils/         # Utility functions
│   │   └── helper/        # Helper functions
│   ├── public/            # Static assets
│   └── package.json
├── backend/           # Fastify backend server
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic and AI services
│   ├── supabase/          # Supabase client configuration
│   ├── types/             # TypeScript type definitions
│   ├── server.ts          # Main server entry point
│   └── package.json
├── infra/             # Infrastructure configuration
├── doc/               # Documentation
│   ├── Roadmap.md
│   ├── Breakdown-Task.md
│   └── Deployment-Guide.md
└── .github/           # GitHub configuration and workflows

```

## Build, Test, and Lint Commands

### Frontend (from `/frontend` directory)
- **Install dependencies**: `npm install`
- **Development server**: `npm run dev` (runs on port 30001)
- **Build**: `npm run build` (compiles TypeScript and builds with Vite)
- **Lint**: `npm run lint` (ESLint with TypeScript)
- **Preview production build**: `npm run preview`

### Backend (from `/backend` directory)
- **Install dependencies**: `npm install`
- **Development server**: `npm run dev` (runs with tsx)
- **Build**: `npm run build` (compiles TypeScript)
- **Start production**: `npm start`

## Coding Conventions and Best Practices

### General
- Use **TypeScript** for all code - avoid `any` types when possible
- Follow **functional programming** patterns with React hooks
- Use **ES modules** (type: "module" in package.json)
- Prefer **named exports** over default exports for better refactoring support
- Keep components **small and focused** - single responsibility principle

### React/Frontend
- Use **functional components** with hooks (no class components)
- Follow React 19 best practices
- Use **Ant Design components** for UI consistency
- Implement proper **error boundaries** for production code
- Use **Redux Toolkit** for global state management
- Keep business logic in **custom hooks** or **services**, not in components
- Use **Tailwind CSS** for styling with Ant Design
- Prefix environment variables with `VITE_` for frontend

### TypeScript
- Define **interfaces** for component props and data structures
- Use **type inference** where appropriate
- Create shared types in dedicated type files
- Use **strict mode** TypeScript configuration

### Supabase Integration
- Use Supabase client from centralized configuration
- Implement **Row Level Security (RLS)** for multi-tenant data
- Handle authentication state properly with Supabase Auth
- Environment variables for Supabase: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### File Organization
- Group related files by feature/domain, not by type
- Keep components, hooks, and services near where they're used
- Use barrel exports (index.ts) for cleaner imports
- Place shared utilities in `/utils` or `/helper` directories

### Git and Version Control
- Write clear, descriptive commit messages
- Keep commits focused on single concerns
- Don't commit `.env` files (use `.env.example` as template)
- Exclude build artifacts (`dist/`, `node_modules/`) from commits

## Multi-tenant and SaaS Features

This template is designed for multi-tenant SaaS applications:
- Data isolation using Supabase RLS
- User and organization management
- Support for white-labeling and branding customization
- Feature flags for enabling/disabling features per tenant

## Deployment

- **SaaS Mode**: Deploy to Vercel (or similar platforms)
- **On-Premise Mode**: Can be deployed to customer infrastructure
- Frontend build output: `frontend/dist/`
- Backend is optional for simple use cases (can use Supabase directly)

## Important Notes

- The project uses Thai language in documentation (Roadmap.md, Breakdown-Task.md)
- Focus on **minimal, surgical changes** - don't refactor unnecessarily
- Test changes locally before committing
- This is a template - changes should be generic and reusable
- Security: Never commit secrets or API keys
- Keep the template flexible for different use cases

## Working with This Repository

When making changes:
1. Understand the feature context by reviewing relevant documentation in `/doc`
2. Test changes in both frontend and backend if they span both areas
3. Ensure changes work with Supabase integration
4. Consider multi-tenant implications
5. Update documentation if adding significant features
6. Run linters before committing
7. Keep changes minimal and focused on the issue at hand

## Common Tasks

### Adding a new page
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/routes/`
3. Import and use in routing configuration

### Adding a new API endpoint
1. Create route handler in `backend/routes/`
2. Implement business logic in `backend/services/`
3. Register route in `backend/server.ts`

### Integrating with Supabase
1. Use Supabase client from `backend/supabase/supabaseClient.ts` or frontend equivalent
2. Define RLS policies in Supabase dashboard
3. Handle authentication state properly

### Customizing theme/branding
1. Modify files in `frontend/src/themes/`
2. Update Ant Design theme configuration
3. Adjust Tailwind CSS configuration if needed

## Project Status

Currently in Phase 1-2 (Core SaaS Platform and SaaS Features). See `doc/Roadmap.md` for detailed feature status and future plans.
