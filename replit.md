# Overview

This full-stack web application, "Bright Properties," is designed for an immersive technology company based in Uganda. It functions as both a corporate showcase website and a robust content management system (CMS). The platform aims to provide VR/AR solutions across various industries (real estate, architecture, interior design, media, training) by showcasing projects, managing team members, publishing blog posts, handling customer inquiries, and facilitating service bookings. Its core purpose is to streamline business operations, enhance client engagement, and expand market reach in the immersive technology sector.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React and TypeScript, utilizing Vite for development and bundling. It employs a component-based architecture. Key technologies include: Wouter for routing, Shadcn/ui and Radix UI for accessible UI components, Tailwind CSS for styling with custom branding (Bright Yellow), TanStack Query for server state management, React Hook Form with Zod for form handling and validation, and Lucide React for icons. The structure organizes pages by routes and reusable components by function.

## Backend Architecture

The backend is an Express.js server developed with TypeScript, designed as a RESTful API. It uses custom middleware for logging and error handling. Data persistence is managed with PostgreSQL via Drizzle ORM, ensuring type-safe database operations. Zod schemas are shared across the stack for consistent data validation. An abstracted storage layer handles CRUD operations for all entities. The API endpoints are organized by resource type (projects, team, blog, contact). The server can serve the built React application in production and integrates with Vite for development.

## Data Storage

The primary database is PostgreSQL, hosted on Neon Database (serverless). Drizzle ORM manages database interactions and migrations. Shared TypeScript schema definitions ensure type safety. Key data models include Users, Projects, Team Members, Blog Posts, Contact Inquiries, Newsletter Subscribers, Demo Bookings, Service Bookings, and Properties. Design decisions include JSON fields for flexible metadata, standardized timestamp fields, categorical data with enums, and separate tables for various user interactions. A comprehensive service booking system with status tracking is integrated, alongside property management capabilities that support multi-source data.

## Authentication & Authorization

The system incorporates basic role-based access control, distinguishing between 'user' and 'admin' roles. Admin-only routes and functionalities are implemented for content management.

## UI/UX Decisions & Features

The application integrates the "Bright Properties" logo and custom favicon for consistent branding, primarily using yellow and black. It features an authentic portfolio with 16 projects across six categories, including interactive cards with filtering. A complete service booking system allows users to request services across various categories without payment processing, managed via an admin panel. Contact information is updated with corrected phone numbers and interactive Google Maps integration. Property management includes multi-source integration, filtering, and search. Smooth page transitions and animated elements are implemented using Framer Motion for an enhanced user experience, including a first-visit logo reveal. A custom chat widget, branded in bright yellow and positioned on the left, provides immediate support with professional messaging related to Bright's services. The system strictly enforces content integrity, especially for property images and videos, by removing all fake or mismatched content and ensuring only authentic building photos are displayed.

# External Dependencies

## Cloud Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Google Cloud Storage**: File and media storage (configured)

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
- **Uppy**: File upload library
- **AWS S3**: Alternative file storage option (via Uppy)

## Third-Party Integrations
- **ConversioBot**: Chat widget for visitor engagement