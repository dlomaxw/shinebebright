# Overview

This is a full-stack web application for "Bright," an immersive technology company that provides VR/AR solutions across multiple industries including real estate, architecture, interior design, media, and training. The application serves as both a company showcase website and a content management system with an admin panel for managing projects, team members, blog posts, and customer inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React and TypeScript using Vite as the build tool. The application uses a component-based architecture with the following key design decisions:

- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and brand colors (Bright Yellow as primary)
- **State Management**: TanStack Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form schemas
- **Icons**: Lucide React for consistent iconography

The frontend follows a pages-and-components structure where pages represent different routes and reusable components are organized by function (UI components, forms, admin components, layout components).

## Backend Architecture

The backend is an Express.js server with TypeScript, designed as a RESTful API:

- **Framework**: Express.js with custom middleware for logging and error handling
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Storage Interface**: Abstracted storage layer that implements common CRUD operations for all entities
- **API Design**: RESTful endpoints organized by resource type (projects, team, blog, contact, etc.)

The server handles both API routes and serves the built React application in production, with Vite integration for development hot-reloading.

## Data Storage

- **Primary Database**: PostgreSQL via Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with migrations managed through drizzle-kit
- **Schema**: Shared TypeScript schema definitions ensuring type safety across the stack
- **Data Models**: Users, Projects, Team Members, Blog Posts, Contact Inquiries, Newsletter Subscribers, Demo Bookings

Key design decisions for data modeling:
- JSON fields for flexible metadata and amenities storage
- Standardized timestamp fields (createdAt, updatedAt)
- Categorical data with predefined enums for consistency
- Separate tables for different types of user interactions (inquiries, bookings, subscriptions)

## Authentication & Authorization

Basic role-based access control with user roles (user, admin). The system includes admin-only routes and functionality for content management.

# External Dependencies

## Cloud Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Google Cloud Storage**: File and media storage (configured but implementation not visible in current codebase)

## UI & Styling
- **Shadcn/ui**: Pre-built accessible UI components
- **Radix UI**: Primitive component library for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Development & Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across the entire stack
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Backend bundling for production

## File Upload (Configured)
- **Uppy**: File upload library with multiple provider support
- **AWS S3**: Alternative file storage option (via Uppy integration)

The application is designed to be deployment-ready on Replit with proper environment variable configuration for the database connection.