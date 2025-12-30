# Bright Properties/Platform Design Guidelines

## Design Approach
**Reference-Based: Airbnb + Linear Hybrid** - Real estate showcase meets productivity dashboard. Public site draws from Airbnb's immersive property displays and trust-building; admin dashboard follows Linear's clean efficiency and data clarity.

## Typography System

**Primary Font:** Inter (Google Fonts)
- Display/Hero: 3xl to 6xl, font-bold (700)
- Section Headers: 2xl to 4xl, font-semibold (600)
- Body Large: lg, font-medium (500)
- Body Regular: base, font-normal (400)
- Captions/Meta: sm, font-normal (400)

**Hierarchy Rule:** Black text on white/light backgrounds; white text on yellow/black sections for contrast.

## Layout & Spacing

**Container System:**
- Max widths: max-w-7xl for sections, max-w-6xl for content, max-w-prose for text
- Consistent padding: px-4 md:px-8 lg:px-12

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component gaps: gap-4 to gap-8
- Section vertical: py-16 md:py-24 lg:py-32
- Element margins: mt-6, mb-8, mx-4

## Public Website Structure

### Hero Section (Full viewport height)
- Full-width background image showcasing Ugandan property/cityscape
- Centered overlay content with semi-transparent black backdrop (bg-black/40)
- Large headline + subheadline + dual CTA buttons
- Buttons: Yellow primary with blur backdrop, black secondary
- Include trust indicator below CTAs: "200+ Properties | 50+ Projects Completed"

### Featured Properties Section
- 3-column grid (lg:grid-cols-3 md:grid-cols-2)
- Property cards: Large image, overlay gradient, property name, location, price, key specs
- Hover lift effect on cards
- "View All Properties" CTA button

### About/Technology Section
- 2-column layout: Left text content, right image/graphic
- Highlight immersive technology capabilities
- Stats row: 4-column grid showing metrics (properties, clients, projects, team members)

### Projects Showcase
- Masonry/staggered grid layout
- Project cards with before/after sliders or gallery previews
- Category filters as pill buttons

### Team Section
- 4-column grid of team member cards
- Circular photos, name, role, brief bio
- Yellow accent on hover

### Blog/Insights Section
- 3-column grid of latest articles
- Featured image, category tag (yellow), title, excerpt, read time
- "Read More" link with arrow

### Contact Section
- 2-column split: Form left, map/info right
- Form fields: Name, Email, Phone, Property Interest, Message
- Contact details: Office address (Uganda), phone, email, social links
- Embedded Google Maps

### Footer
- 4-column layout: Brand/tagline, Quick Links, Properties, Connect
- Newsletter signup with inline form
- Social media icons
- Copyright and legal links

## Admin Dashboard

### Dashboard Layout
- Fixed left sidebar (w-64): Logo, navigation menu, user profile at bottom
- Top bar: Breadcrumbs, search, notifications, user dropdown
- Main content area: Full-height scrollable

### Navigation Structure
- Dashboard (overview)
- Properties (CRUD)
- Blog Posts (CRUD)
- Projects (CRUD)
- Team Members (CRUD)
- Inquiries (view/respond)
- Settings

### Dashboard Overview
- Welcome card with quick stats
- 4-stat grid: Total Properties, Active Listings, Pending Inquiries, Published Posts
- Recent activity table
- Quick actions panel

### CRUD Layouts (Properties, Blog, Projects, Team)
**List View:**
- Search bar + filter dropdowns + "Add New" button (yellow)
- Data table: Sortable columns, row actions (edit/delete icons)
- Pagination at bottom
- Bulk actions checkbox

**Create/Edit Forms:**
- Two-column form layout on desktop
- Grouped sections: Basic Info, Details, Media, SEO
- Image upload with drag-drop zones + preview thumbnails
- Rich text editor for descriptions
- Save/Cancel buttons at bottom

### Inquiries Interface
- Inbox-style list: Contact name, subject, date, status badge
- Detail panel on right: Full message, quick reply form, mark as resolved
- Filter by status: New, In Progress, Resolved

### Component Specifications

**Buttons:**
- Primary: Yellow bg, black text, px-6 py-3, rounded-lg
- Secondary: Black bg, white text, px-6 py-3, rounded-lg
- Ghost: Transparent, black border, hover:bg-black/5
- All buttons: Smooth transitions, scale on hover

**Form Inputs:**
- Full-width, border-2 border-gray-300, rounded-lg, px-4 py-3
- Focus state: border-yellow-400, ring-2 ring-yellow-100
- Labels: font-medium, mb-2
- Helper text: text-sm text-gray-500

**Tables:**
- Striped rows (alternate light gray)
- Hover row highlight
- Fixed header on scroll
- Icon buttons for actions (edit/delete)

**Cards:**
- White background, border border-gray-200, rounded-xl, p-6
- Drop shadow: shadow-sm, hover:shadow-md

**Navigation Sidebar:**
- Black background
- Menu items: White text, yellow accent on active
- Icons left-aligned with text
- Expand/collapse functionality

## Images Required

1. **Hero Image:** High-quality Ugandan cityscape or modern property exterior (1920x1080 minimum)
2. **Property Images:** 15-20 diverse property photos for showcase
3. **Team Photos:** Professional headshots (circular crop)
4. **Project Images:** Before/after pairs or progress shots
5. **About Section:** Technology/VR equipment or team collaboration photo
6. **Blog Thumbnails:** Relevant stock images for articles

**Image Treatment:** All images sharp, well-lit, consistent color grading. Property images should show interiors/exteriors in best light. No filters except subtle vignettes on hero.