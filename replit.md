# Overview

This is a full-stack web application for "Bright," an immersive technology company that provides VR/AR solutions across multiple industries including real estate, architecture, interior design, media, and training. The application serves as both a company showcase website and a content management system with an admin panel for managing projects, team members, blog posts, customer inquiries, and service bookings. The platform includes comprehensive service booking functionality without payment processing, property management features, and complete administrative tools.

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
- **Data Models**: Users, Projects, Team Members, Blog Posts, Contact Inquiries, Newsletter Subscribers, Demo Bookings, Service Bookings, Properties

Key design decisions for data modeling:
- JSON fields for flexible metadata and amenities storage
- Standardized timestamp fields (createdAt, updatedAt)
- Categorical data with predefined enums for consistency
- Separate tables for different types of user interactions (inquiries, bookings, subscriptions, service bookings)
- Service booking system with status tracking and admin management capabilities
- Property management integration with data from multiple sources

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

## Recent Changes (January 2025)

### Service Booking System
- **Complete service booking functionality** implemented across all service categories (Real Estate, Architecture, Interior Design, Media Production, VR/AR Training)
- **Professional booking page** with testimonials, process steps, and service feature highlights
- **Comprehensive booking form** with project details, budget ranges, timeline selection, and requirements checkboxes
- **Admin panel integration** for managing service bookings with status tracking (pending, confirmed, in-progress, completed, cancelled)
- **No payment processing** as specifically requested by user - captures booking requests only
- **Call-to-action integration** throughout site with "Book Service" buttons in header and services pages

### Contact Information Updates
- **Phone numbers corrected** to +250 750 421 224 and +250 785 189 100 across contact page and footer
- **Interactive Google Maps integration** added to contact page for office location in Kampala
- **Enhanced contact page layout** with proper service booking call-to-action

### Property Management Features
- **Multi-source property integration** from properties.shinebebright.com, hk-properties.com, and rfdevelopers.ug
- **Property filtering and search capabilities**
- **HK properties configured** with proper featured flag requirements

### Technical Improvements
- **Enhanced admin dashboard** with service booking management table
- **Professional UI components** with shadcn/ui integration
- **Yellow/black branding** maintained throughout all new features
- **Mobile-responsive design** across all new components

The application is designed to be deployment-ready on Replit with proper environment variable configuration for the database connection.