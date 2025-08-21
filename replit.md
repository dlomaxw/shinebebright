# Overview

This is a full-stack web application for "Bright," an immersive technology company based in Uganda that provides VR/AR solutions across multiple industries including real estate, architecture, interior design, media, and training. The application serves as both a company showcase website and a content management system with an admin panel for managing projects, team members, blog posts, customer inquiries, and service bookings. The platform includes comprehensive service booking functionality without payment processing, property management features, and complete administrative tools.

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

### Logo Integration and Branding
- **Bright Properties logo integration** throughout website including header navigation and footer
- **Custom favicon creation** using the Bright Properties logo design
- **Professional brand consistency** with yellow "D" logo and "BRIGHT Properties" text
- **Optimized logo sizing and positioning** for all responsive breakpoints

### Authentic Portfolio Implementation
- **Complete portfolio integration** with 16 authentic projects from shinebebright.com/portfolio/
- **Six professional categories**: Graphics Design and Animation, Branding, Content Marketing, Social Media Handling, Website Design and Development, Videography and Photography
- **Real project showcase** including Uhome, Salama Springs, Karveli Restaurant, Icon Heights, Eighth Wonder, and 11 other authentic projects
- **Interactive portfolio cards** with hover effects, category badges, and direct links to original project pages
- **Advanced filtering and search** functionality for portfolio browsing
- **Authentic project images** directly from the original Shine Be Bright portfolio

### Service Booking System
- **Complete service booking functionality** implemented across all service categories (Real Estate, Architecture, Interior Design, Media Production, VR/AR Training)
- **Professional booking page** with testimonials, process steps, and service feature highlights
- **Comprehensive booking form** with project details, budget ranges, timeline selection, and requirements checkboxes
- **Admin panel integration** for managing service bookings with status tracking (pending, confirmed, in-progress, completed, cancelled)
- **No payment processing** as specifically requested by user - captures booking requests only
- **Call-to-action integration** throughout site with "Book Service" buttons in header and services pages

### Contact Information Updates
- **Phone numbers corrected** to +256 750 421 224 and +256 785 189 100 (Uganda country code) across contact page, footer, properties page, and WhatsApp links
- **Interactive Google Maps integration** added to contact page for office location in Kampala
- **Enhanced contact page layout** with proper service booking call-to-action
- **ConversioBot chat widget** integrated for visitor engagement and customer support

### Property Management Features
- **Multi-source property integration** from properties.shinebebright.com, hk-properties.com, and rfdevelopers.ug
- **Property filtering and search capabilities**
- **HK properties configured** with proper featured flag requirements

### Animation and User Experience Enhancements
- **Smooth page transition effects** implemented between all sections using framer-motion
- **Animated logo reveal effect** for brand identity enhancement with fade-in, scale, and rotation animations
- **Section-by-section animations** including slide-in-left, slide-in-right, fade-in-up, scale-in effects
- **Staggered animations** for service cards, project cards, and stats with progressive delays
- **Interactive logo hover effects** in the header with spring animations
- **First-visit logo reveal sequence** with localStorage tracking for returning users

### Technical Improvements
- **Enhanced admin dashboard** with service booking management table
- **Professional UI components** with shadcn/ui integration
- **Yellow/black branding** maintained throughout all new features
- **Mobile-responsive design** across all new components
- **Framer Motion integration** for smooth animations and transitions

## Recent Changes (August 2025)

### Property Management System Improvements
- **Comprehensive image system overhaul** with developer-specific organization to prevent image mixing
- **Authentic VAAL Cadenza images** downloaded directly from vaal.co.ug (May 2025 real interior photos and facade renders)
- **Removed all sold-out properties** from the system (reduced from 27 to 24 active properties)
- **Fixed image mixing issues** where Canaan Apartments and Prince Charles were incorrectly showing Elite Palazzo images
- **Created residential properties folder** with authentic apartment building images for general properties
- **Enhanced property name visibility** with larger white text, drop shadows, and better contrast
- **Updated fallback image system** to use appropriate building images instead of logos or placeholders
- **Fixed file extension mismatches** (.png → .jpg) across all property configurations
- **Implemented developer-based image organization**:
  - VAAL: Cadenza interiors and facades, Bridge Kololo, The Futur
  - Saif Real Estate: Pearl View building and interior photos
  - Edifice Properties: Elite Palazzo, Embassy Towers, Horizon Residency
  - RF Developers: Skyrise buildings and apartments
  - Novus Real Estate: Icon 180 complex images
  - Residential: General apartment buildings for unaffiliated properties

### Property Database Cleanup
- **Deleted sold-out properties**: "Cadenza Studio Nakasero" and "Cadenza Residence - Studio"
- **Corrected property-developer assignments** to prevent wrong image display
- **24 active properties** now properly categorized and displayed
- **All properties now have authentic images** with no placeholder or stock images

### Image Configuration System
- **Property-to-developer mapping** prevents image cross-contamination
- **Fallback system** using authentic building images instead of generic placeholders
- **Multiple images per property** for carousel functionality
- **Proper file path management** with consistent naming conventions

### Critical Image System Fixes (August 21, 2025)
- **REMOVED ALL FAKE/GENERATED IMAGES**: Eliminated all Unsplash stock photos and AI-generated property images
- **Property Database Cleanup**: Deleted 8 properties with fake images from system:
  - Atlantic Heights (fake stock image)
  - Amber Residency (fake stock image) 
  - Sapphire Residency (fake stock image)
  - Urban View Apartments (fake stock image)
  - Canaan Apartments (fake stock image)
  - Canaan Residence Apartment (fake stock image)
  - Pearl View Kisaasi (fake stock image)
  - Prince Charles Luxury Apartments (fake stock image)
- **Fixed Developer Assignments**:
  - The Futur: Moved from VAAL to General (not a VAAL property)
  - Saif Real Estate properties: Added proper building names with developer
- **Authentic Image Sources**:
  - Skyrise Apartments: Now uses authentic RF Developers building image from official website
  - Pearl View properties: Use only authentic Saif Real Estate building photos
  - Cadenza properties: Authentic VAAL interior photos from May 2025
- **System Status**: 17 remaining properties (down from 25) with only authentic building images
- **Zero tolerance for fake images**: All properties now show real building photos or no images

The application is designed to be deployment-ready on Replit with proper environment variable configuration for the database connection.