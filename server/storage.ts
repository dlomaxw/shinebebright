import {
  users,
  projects,
  teamMembers,
  blogPosts,
  contactInquiries,
  newsletterSubscribers,
  demoBookings,
  serviceBookings,
  properties,
  clientProjects,
  projectMessages,
  virtualTours,
  tourSessions,
  analyticsEvents,
  businessMetrics,
  type User,
  type InsertUser,
  type Project,
  type InsertProject,
  type TeamMember,
  type InsertTeamMember,
  type BlogPost,
  type InsertBlogPost,
  type ContactInquiry,
  type InsertContactInquiry,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type DemoBooking,
  type InsertDemoBooking,
  type ServiceBooking,
  type InsertServiceBooking,
  type Property,
  type InsertProperty,
  type ClientProject,
  type InsertClientProject,
  type ProjectMessage,
  type InsertProjectMessage,
  type VirtualTour,
  type InsertVirtualTour,
  type TourSession,
  type InsertTourSession,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type BusinessMetric,
  type InsertBusinessMetric,
  type Page,
  type InsertPage,
  pages,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, or } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import fs from "fs";
import path from "path";

const PostgresStore = connectPg(session);

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
const BOOKINGS_FILE = path.join(DATA_DIR, "service_bookings.json");

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  getProjects(category?: string, featured?: boolean): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  searchProjects(query: string): Promise<Project[]>;

  // Team member operations
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;

  // Blog post operations
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Contact inquiry operations
  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiry(id: string): Promise<ContactInquiry | undefined>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateContactInquiry(id: string, inquiry: Partial<InsertContactInquiry>): Promise<ContactInquiry>;
  deleteContactInquiry(id: string): Promise<void>;

  // Newsletter operations
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  unsubscribeNewsletter(email: string): Promise<void>;

  // Service booking operations
  getServiceBookings(): Promise<ServiceBooking[]>;
  getServiceBooking(id: string): Promise<ServiceBooking | undefined>;
  createServiceBooking(booking: InsertServiceBooking): Promise<ServiceBooking>;
  updateServiceBooking(id: string, booking: Partial<InsertServiceBooking>): Promise<ServiceBooking>;
  deleteServiceBooking(id: string): Promise<void>;

  // Demo booking operations (legacy)
  getDemoBookings(): Promise<DemoBooking[]>;
  getDemoBooking(id: string): Promise<DemoBooking | undefined>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  updateDemoBooking(id: string, booking: Partial<InsertDemoBooking>): Promise<DemoBooking>;

  // Property operations
  getProperties(featured?: boolean): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property>;
  deleteProperty(id: string): Promise<void>;
  searchProperties(query: string): Promise<Property[]>;

  // Client Project operations
  getClientProjects(clientId?: string): Promise<ClientProject[]>;
  getClientProject(id: string): Promise<ClientProject | undefined>;
  createClientProject(project: InsertClientProject): Promise<ClientProject>;
  updateClientProject(id: string, project: Partial<InsertClientProject>): Promise<ClientProject>;
  deleteClientProject(id: string): Promise<void>;

  // Project Message operations
  getProjectMessages(projectId: string): Promise<ProjectMessage[]>;
  createProjectMessage(message: InsertProjectMessage): Promise<ProjectMessage>;

  // Virtual Tour operations
  getVirtualTours(status?: string): Promise<VirtualTour[]>;
  getVirtualTour(id: string): Promise<VirtualTour | undefined>;
  createVirtualTour(tour: InsertVirtualTour): Promise<VirtualTour>;
  updateVirtualTour(id: string, tour: Partial<InsertVirtualTour>): Promise<VirtualTour>;
  deleteVirtualTour(id: string): Promise<void>;

  // Tour Session operations
  getTourSessions(tourId: string): Promise<TourSession[]>;
  createTourSession(session: InsertTourSession): Promise<TourSession>;
  updateTourSession(id: string, session: Partial<InsertTourSession>): Promise<TourSession>;

  // Analytics operations
  getAnalyticsEvents(timeRange?: string): Promise<AnalyticsEvent[]>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getBusinessMetrics(timeRange?: string): Promise<BusinessMetric[]>;
  createBusinessMetric(metric: InsertBusinessMetric): Promise<BusinessMetric>;

  // Page operations
  getPages(published?: boolean): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: number): Promise<void>;
}

const FALLBACK_PROPERTIES: Property[] = [
  {
    id: "101",
    title: "Cadenza Residences",
    price: "From $89,200",
    location: "Nakasero, Kampala",
    description: "An iconic 24-storey tower in the upscale Nakasero neighborhood. Cadenza Residences stands as one of the tallest residential buildings in Uganda, offering studio, 1, and 2-bedroom luxury homes with world-class amenities including a heated pool, gym, and business center.",
    bedrooms: "Studio, 1 & 2",
    bathrooms: "1 & 2",
    features: ["Heated Swimming Pool", "Fully Equipped Gym", "Business Center", "CCTV Surveillance", "Backup Generator", "Steam & Sauna", "Games Room"],
    status: "For Sale",
    images: [
      "/images/properties/cadenza-residences/cadenza_facade_1.jpg",
      "/images/properties/cadenza-residences/cadenza_facade_2.jpg",
      "/images/properties/cadenza-residences/cadenza_interior_real_1.jpg"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2027,
    area: "Nakasero",
    city: "Kampala",
    country: "Uganda",
    propertySize: "Varies",
    garage: 1,
    address: "Plot 1 Katonga Road",
    originalUrl: "https://vaal.co.ug/cadenza",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "102",
    title: "The Bridge Kololo",
    price: "Contact for Price",
    location: "Kololo, Kampala",
    description: "A residential resort consisting of twin 12-storey towers in the prime area of Kololo. Features over 25 world-class amenities including an infinity pool, rooftop gardens, indoor/outdoor cinemas, and a minigolf lounge.",
    bedrooms: "1, 2 & 3",
    bathrooms: "2 & 3",
    features: ["Infinity Pool", "Rooftop Gardens", "Indoor/Outdoor Cinemas", "Co-working Spaces", "Minigolf Lounge", "Yoga Room"],
    status: "For Sale",
    images: [
      "/images/properties/the-bridge-kololo/bridge_kololo_aerial.webp",
      "/images/properties/the-bridge-kololo/bridge_kololo_night.webp"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2026,
    area: "Kololo",
    city: "Kampala",
    country: "Uganda",
    propertySize: "Varies",
    garage: 2,
    address: "Kololo",
    originalUrl: "https://vaal.co.ug/the-bridge",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "103",
    title: "Aquamarine Heights",
    price: "Contact for Price",
    location: "Munyonyo, Kampala",
    description: "An eleven-story development in Munyonyo offering 3-bedroom apartments with breathtaking panoramic views of Lake Victoria. Designed for luxury with a lake-facing gym, kids' creche, and indoor games room.",
    bedrooms: "3",
    bathrooms: "3",
    features: ["Lake Views", "Lake-facing Gym", "Kids' Creche", "Indoor Games Room", "Swimming Pool", "Dedicated Parking"],
    status: "For Sale",
    images: [
      "/images/properties/aquamarine-heights/aquamarine-elev-01.jpg",
      "/images/properties/aquamarine-heights/aquamarine-elev-02.jpg"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2026,
    area: "Munyonyo",
    city: "Kampala",
    country: "Uganda",
    propertySize: "Spacious",
    garage: 2,
    address: "Munyonyo",
    originalUrl: "https://hk-properties.com/aquamarine",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "104",
    title: "Emerald Residency",
    price: "Contact for Price",
    location: "Mutungo, Kampala",
    description: "Luxurious living in Mutungo with 56 apartments. Features a stunning rooftop gym, swimming pool, sauna, steam room, and a gazebo area perfect for relaxation.",
    bedrooms: "2 & 3",
    bathrooms: "2 & 3",
    features: ["Rooftop Gym", "Swimming Pool", "Sauna & Steam Room", "Gazebo Area", "Secure Parking"],
    status: "For Sale",
    images: [
      "/images/properties/emerald-residency/emerald-bg.jpg",
      "/images/properties/emerald-residency/3bhk-render.jpg",
      "/images/properties/emerald-residency/3d-render.jpg"
    ],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2025,
    area: "Mutungo",
    city: "Kampala",
    country: "Uganda",
    propertySize: "Varies",
    garage: 1,
    address: "Mutungo",
    originalUrl: "https://hk-properties.com/emerald",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "105",
    title: "Marjan Residency",
    price: "Contact for Price",
    location: "Mbuya, Kampala",
    description: "Upcoming premium residency in Mbuya. Features a mix of 1, 2, and 3-bedroom units with a lake-facing rooftop gym and 24-hour security.",
    bedrooms: "1, 2 & 3",
    bathrooms: "1, 2 & 3",
    features: ["Lake-facing Rooftop Gym", "24-hour Security", "Modern Design", "Ample Parking"],
    status: "Upcoming",
    images: [
      "/images/properties/marjan-residency/marjan-1bhk-side.jpg",
      "/images/properties/marjan-residency/marjan-resi-bg.jpg"
    ],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2026,
    area: "Mbuya",
    city: "Kampala",
    country: "Uganda",
    propertySize: "Varies",
    garage: 1,
    address: "Mbuya",
    originalUrl: "https://hk-properties.com/marjan",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "1",
    title: "Skyrise Apartments",
    price: "$135,000",
    location: "Kololo, Kampala",
    description: "Skyrise Apartments presents an exclusive collection of meticulously designed luxury residences in the prestigious neighborhood of Kololo, Kampala. This architectural masterpiece redefines urban living with its blend of contemporary design and functional elegance. Residents enjoy unparalleled views of the city skyline while benefiting from the proximity to Kampala's finest restaurants, shopping centers, and international schools.",
    bedrooms: "2 & 3",
    bathrooms: "2 & 3",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Swimming Pool", "Gym", "24/7 Security", "Backup Generator"],
    status: "For Sale",
    images: [
      "/images/properties/skyrise-apartments/8e23e89b643a7bc40f10848394d382149723cdc4-2250x2250.jpg",
      "/images/properties/skyrise-apartments/images.jpg"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Kololo",
    city: "Kampala",
    country: "Uganda",
    propertySize: "150 Sqm",
    garage: 1,
    address: "Kololo Hill Drive",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Garnet Residency",
    price: "Contact for Price",
    location: "Kirode Road, Muyenga Hills",
    description: "Garnet Residency is contemporary design elevation coming up at a prestigious address that offers you panoramic views of Lake Victoria. These luxury apartments are designed to provide a serene sanctuary amidst the bustle of the city. The development features high-end finishes, spacious layouts, and a host of modern amenities.",
    bedrooms: "3",
    bathrooms: "3",
    features: ["Breathtaking views", "Modern finishes", "Rooftop Terrace", "Ample Parking", "Elevator"],
    status: "For Sale",
    images: [
      "/images/properties/garnet-residency/garnet-resi-bg.jpg",
      "/images/properties/garnet-residency/3bhk-side.jpg"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Muyenga",
    city: "Kampala",
    country: "Uganda",
    propertySize: "180 Sqm",
    garage: 2,
    address: "Kirode Road",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Diamond Court Apartments",
    price: "UGX 140M-338M",
    location: "Kila-Mulawa, Wakiso District",
    description: "Diamond Court Apartments by Knightsbridge Avenues offers a unique opportunity to own a luxurious home with flexible payment options. Designed for modern family living, these apartments combine style, comfort, and affordability in a rapidly developing area.",
    bedrooms: "1, 2 & 3",
    bathrooms: "1, 2 & 3",
    features: ["Flexible payment", "Fully fitted", "Gated Community", "Children's Play Area"],
    status: "For Sale",
    images: ["/images/properties/diamond-court-apartments/unnamed.webp"],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Wakiso",
    city: "Wakiso",
    country: "Uganda",
    propertySize: "120 Sqm",
    garage: 1,
    address: "Kila-Mulawa",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    title: "Amber Residency",
    price: "257M UGX",
    location: "Bukasa, Muyenga",
    description: "Located in Bukasa, Muyenga, the Amber Residency comprises of three bedroomed apartments with a total area of 130 square meters each. The development focuses on providing spacious living areas and high-quality construction at a competitive price point.",
    bedrooms: "3",
    bathrooms: "3",
    features: ["Guaranteed returns", "Beautiful view", "Quiet Neighborhood", "Paved Access"],
    status: "For Sale",
    images: [
      "/images/properties/amber-residency/2bhk-render.jpg",
      "/images/properties/amber-residency/emerald-bg.jpg"
    ],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Bukasa",
    city: "Kampala",
    country: "Uganda",
    propertySize: "130 Sqm",
    garage: 1,
    address: "Bukasa Road",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: "10",
    title: "Embassy Towers Residency",
    price: "PRICES INSIDE",
    location: "Muyenga",
    description: "Experience upscale living in the serene hills of Muyenga at Embassy Residency with elegantly designed apartments. These residences offer a perfect balance of luxury and comfort in a diplomatic zone.",
    bedrooms: "1, 2 & 3",
    bathrooms: "3, 2 & 1",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Garage", "Diplomatic Zone Security"],
    status: "For Sale",
    images: [
      "/images/properties/embassy-towers/embassy_towers.webp",
      "/images/properties/embassy-towers/unnamed.webp"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Muyenga",
    city: "Kampala",
    country: "Uganda",
    propertySize: "165 Sqm",
    garage: 2,
    address: "Muyenga",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: "12",
    title: "KENDAL VILLAS",
    price: "PRICES ON CALL",
    location: "Kikaaya near Bahai temple",
    description: "MODERN 3 BEDROOM DUPLEX VILLAS with 18-month interest-free payment plan and exceptional arrangements with the bank. A rare find near the historic Bahai Temple.",
    bedrooms: "3",
    bathrooms: "4",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Garage", "Private Garden", "Duplex Design"],
    status: "For Sale",
    images: ["/images/properties/kendal-villas/INTER-SEC-B2_1-Photo-scaled.jpg"],
    featured: false,
    propertyType: "Villa",
    yearBuilt: 2024,
    area: "Kikaaya",
    city: "Kampala",
    country: "Uganda",
    propertySize: "200 Sqm",
    garage: 2,
    address: "Kikaaya",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: "14",
    title: "Divyabav Vertica",
    price: "PRICES ON CALL",
    location: "Kampala",
    description: "Modern high-rise development featuring luxury apartments with stunning views and premium amenities. Redefining vertical living in Kampala.",
    bedrooms: "1, 2, 3, 4, 5, 6 & Penthouse",
    bathrooms: "3, 2 & 1",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Garage", "Sky Lounge", "Concierge"],
    status: "For Sale",
    images: ["/images/properties/divyabav-vertica/divybav-vertical (1).png"],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Kampala",
    city: "Kampala",
    country: "Uganda",
    propertySize: "250 Sqm",
    garage: 2,
    address: "Kampala",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "15",
    title: "Canaan Residence Apartment",
    price: "PRICES ON CALL",
    location: "Kampala",
    description: "Experience luxury living at Canaan Residence with modern amenities and elegant design in a prime area. Spacious interiors and high-quality materials characterize this development.",
    bedrooms: "3",
    bathrooms: "4",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Garage", "Swimming Pool"],
    status: "For Sale",
    images: [
      "/images/properties/canaan-residence/1-1-1240x720.jpg",
      "/images/properties/canaan-residence/3-1240x720.jpg"
    ],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Kampala",
    city: "Kampala",
    country: "Uganda",
    propertySize: "170 Sqm",
    garage: 2,
    address: "Kampala",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "16",
    title: "Baskerville Canaan Apartment",
    price: "PRICES INSIDE",
    location: "Kampala",
    description: "Modern luxury apartment in the heart of Canaan with spacious layouts and premium finishes throughout. Perfect for families seeking security and style.",
    bedrooms: "3",
    bathrooms: "3",
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Garage", "Clubhouse"],
    status: "For Sale",
    images: [
      "/images/properties/baskerville-canaan/BASKERVILLE-MAIL_page-0006-scaled-1-1170x785.jpg",
      "/images/properties/baskerville-canaan/BASKERVILLE-MAIL_page-0007-scaled-1.jpg"
    ],
    featured: false,
    propertyType: "Apartment",
    yearBuilt: 2024,
    area: "Kampala",
    city: "Kampala",
    country: "Uganda",
    propertySize: "160 Sqm",
    garage: 1,
    address: "Kampala",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "17",
    title: "The Avenue",
    price: "$60,000 - $137,500",
    location: "Off Tank Hill Road, Muyenga",
    description: "Located off Tank Hill Road in the popular residential area of Muyenga. 'The Avenue' offers a range of 1, 2, and 3-bedroom residences designed for modern living. With amenities like a gym, indoor games area, and kids' play area, it provides a balanced lifestyle of comfort and convenience.",
    bedrooms: "1, 2 & 3",
    bathrooms: "1, 2 & 3",
    features: ["Gym", "Indoor Games Area", "Kids' Play Area", "Landscaped Spaces", "Ample Parking", "CCTV Surveillance", "24/7 Security", "High-speed Elevators", "Standby Generator"],
    status: "For Sale",
    images: [
      "/images/properties/modern-developers/front-view_1757923575207.webp",
      "/images/properties/modern-developers/night-view_1757923575207.webp",
      "/images/properties/modern-developers/1bhk-3d_1757923575202.webp",
      "/images/properties/modern-developers/2bhk-plan_1757923575205.webp",
      "/images/properties/modern-developers/3bhk-plan_1757923575206.webp",
      "/images/properties/modern-developers/front-view (1)_1757923575206.webp",
      "/images/properties/modern-developers/night-viewr_1757923575208.webp",
      "/images/properties/modern-developers/side-view-02_1757923575208.webp"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2025,
    area: "Muyenga",
    city: "Kampala",
    country: "Uganda",
    propertySize: "60 - 150 Sqm",
    garage: 1,
    address: "Off Tank Hill Road",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "18",
    title: "Nouche Residency",
    price: "Contact for Pricing",
    location: "Aki Bua Road, Nakasero",
    description: "Nouche Residency is a 23-story luxury apartment complex located on Aki Bua Road in the prestigious Nakasero area. Developed by Jukas Construction, it offers a blend of tranquil living and accessibility. Features spacious interiors, soundproof design, and world-class amenities including two pools, two gyms, and a fine dining restaurant.",
    bedrooms: "1, 2, 3, 4, 5 & Penthouse",
    bathrooms: "Varies",
    features: ["Two Swimming Pools", "Two Gyms", "Fine Dining Restaurant", "Supermarket", "Coffee Shop", "Salon", "Co-working Spaces", "24/7 Security", "CCTV Surveillance"],
    status: "For Sale",
    images: [
      "/images/properties/nouche-residency/Nouche-residency-front-image.jpeg",
      "/images/properties/nouche-residency/05-Nouche-Residency-1-Bedroom-full-min.png",
      "/images/properties/nouche-residency/4-Bedroom-type-B-295sqm-min.png",
      "/images/properties/nouche-residency/Villa-unit-B-465sqm-min.png",
      "/images/properties/nouche-residency/27-3BEDA-3D-Drawing_page-0002-min.jpg",
      "/images/properties/nouche-residency/6br-apartment-living-room-large-windows-kampala-uganda.avif"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2026,
    area: "Nakasero",
    city: "Kampala",
    country: "Uganda",
    propertySize: "100 - 600 Sqm",
    garage: 2,
    address: "Aki Bua Road",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "19",
    title: "Ava Residency",
    price: "UGX 295M - 395M",
    location: "110a Kyebando Ring Road, Kampala",
    description: "Ava Residency offers modern 2- and 3-bedroom condominiums featuring open-concept layouts, modern ceiling designs with recessed lighting, and chandeliers. Includes wheelchair accessible parking. A 30% down payment secures a unit.",
    bedrooms: "2 & 3",
    bathrooms: "2 & 3",
    features: ["Open-concept Layouts", "Modern Ceiling Designs", "Recessed Lighting", "Decorative Chandeliers", "Wheelchair Accessible Parking"],
    status: "For Sale",
    images: [
      "/images/properties/ava-residency/AVA 2 BHK ISO FINAL.jpg",
      "/images/properties/ava-residency/ISO-2BHK.png",
      "/images/properties/ava-residency/ISO-3BHK.png",
      "/images/properties/ava-residency/V1.png",
      "/images/properties/ava-residency/V2.png",
      "/images/properties/ava-residency/V3.png",
      "/images/properties/ava-residency/2BHK.png"
    ],
    featured: true,
    propertyType: "Apartment",
    yearBuilt: 2026,
    area: "Kyebando",
    city: "Kampala",
    country: "Uganda",
    propertySize: "110 - 150 Sqm",
    garage: 1,
    address: "110a Kyebando Ring Road",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "20",
    title: "Pearl Marina Estates",
    price: "$34,000 - $330,000",
    location: "Garuga, Entebbe",
    description: "Pearl Marina Estates is a 389-acre premium lakeside city development located on the Garuga Peninsula in Uganda, along the shores of Lake Victoria. As of 2026, it offers a range of residential units, serviced plots, and recreational facilities. The master plan includes over 3km of lake frontage and integrates residential, commercial, and retail zones. Residents have access to a sandy beach, a lakeside boardwalk, a beach club, swimming pools, landscaped gardens, and a marina.",
    bedrooms: "Studio, 1, 2, 3 & 4",
    bathrooms: "1, 2, 3 & 4",
    features: ["Sandy Beach", "Lakeside Boardwalk", "Beach Club", "Swimming Pools", "Marina", "Landscaped Gardens", "Serviced Plots", "Commercial Zones"],
    status: "For Sale",
    images: [
      "/images/properties/pearl-marina/pearl-marina (1).webp",
      "/images/properties/pearl-marina/pearl-marina (2).webp",
      "/images/properties/pearl-marina/pearl-marina (3).webp",
      "/images/properties/pearl-marina/pearl-marina (4).webp",
      "/images/properties/pearl-marina/pearl-marina (5).webp",
      "/images/properties/pearl-marina/pearl-marina (6).webp",
      "/images/properties/pearl-marina/pearl-marina (7).webp",
      "/images/properties/pearl-marina/pearl-marina (8).webp"
    ],
    featured: true,
    propertyType: "Mixed Use",
    yearBuilt: 2026,
    area: "Garuga",
    city: "Entebbe",
    country: "Uganda",
    propertySize: "389 Acres",
    garage: 2,
    address: "Garuga Peninsula",
    originalUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "new-1",
    title: "Acorns International School",
    category: "Website Design and Development",
    description: "Education Website",
    imageUrl: "/images/portfolio/acorns_project.png",
    url: "https://acornslubowa.com/",
    featured: true,
    client: "Acorns International School",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Website", "Education"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "new-2",
    title: "Kings Sports Bet",
    category: "Website Design and Development",
    description: "Sports Betting Platform",
    imageUrl: "/images/portfolio/kings_sports_bet_project.jpg",
    url: "https://kingssportsbet.com/",
    featured: true,
    client: "Kings Sports Bet",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Website", "Sports Betting"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "new-3",
    title: "Frozen Basket",
    category: "Website Design and Development",
    description: "E-commerce Platform",
    imageUrl: "/images/portfolio/frozen_basket_project.jpg",
    url: "https://frozenbasketug.com/",
    featured: true,
    client: "Frozen Basket",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Website", "E-commerce"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "1",
    title: "Veeram Healthcare",
    category: "Digital Marketing",
    description: "Healthcare Marketing",
    imageUrl: "/images/portfolio/veeram_healthcare_project.jpg",
    url: "#",
    featured: true,
    client: "Veeram Healthcare",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Digital Marketing", "Healthcare"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "TMT Supermarket",
    category: "Digital Marketing",
    description: "Retail Marketing",
    imageUrl: "/images/portfolio/tmt_supermarket_project.jpg",
    url: "#",
    featured: true,
    client: "TMT Supermarket",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Digital Marketing", "Retail"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Herman Padel Center",
    category: "Digital Marketing",
    description: "Sports Marketing",
    imageUrl: "/images/portfolio/herman_padel_project.jpg",
    url: "#",
    featured: true,
    client: "Herman Padel Center",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Digital Marketing", "Sports"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    title: "A & M Executive Cleaning Services",
    category: "Digital Marketing",
    description: "Service Marketing",
    image: "/images/portfolio/am_cleaning.png",
    url: "#",
    featured: true,
    client: "A & M Executive Cleaning Services",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Digital Marketing", "Service"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    title: "Kakira Distillery",
    category: "Digital Marketing",
    description: "Beverage Marketing",
    image: "/images/portfolio/kakira.png",
    url: "#",
    featured: true,
    client: "Kakira Distillery",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Digital Marketing", "Beverage"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    title: "Opportunity Bank",
    category: "Videography and Photography",
    description: "30th Anniversary Documentary Video",
    image: "/images/portfolio/opportunity_bank.png",
    url: "#",
    featured: true,
    client: "Opportunity Bank",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Videography", "Documentary", "Finance"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    title: "Hima Cement",
    category: "Videography and Photography",
    description: "High Commercial Ads",
    image: "/images/portfolio/hima_cement.png",
    url: "#",
    featured: true,
    client: "Hima Cement",
    completionDate: new Date(),
    testimonial: "",
    tags: ["Videography", "Commercial", "Industrial"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class DatabaseStorage implements IStorage {
  constructor() {
    console.log("🚀 [STORAGE] Using DatabaseStorage with production database");
    console.log(`🚀 [STORAGE] Database URL configured: ${process.env.DATABASE_URL ? "✅ YES" : "❌ NO"}`);
    console.log(`🚀 [STORAGE] Environment: ${process.env.NODE_ENV || "unknown"}`);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Project operations
  async getProjects(category?: string, featured?: boolean): Promise<Project[]> {
    try {
      let query = db.select().from(projects);

      const conditions = [];
      if (category) conditions.push(eq(projects.category, category));
      if (featured !== undefined) conditions.push(eq(projects.featured, featured));
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      const result = await query.orderBy(desc(projects.createdAt));
      return result;
    } catch (error) {
      console.warn("⚠️ [STORAGE] Database failed, returning FALLBACK_PROJECTS");
      // Filter fallback projects based on params
      return FALLBACK_PROJECTS.filter(p => {
        if (category && p.category !== category) return false;
        if (featured !== undefined && p.featured !== featured) return false;
        return true;
      });
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: string, updateProject: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...updateProject, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async searchProjects(query: string): Promise<Project[]> {
    return db
      .select()
      .from(projects)
      .where(
        or(
          ilike(projects.title, `%${query}%`),
          ilike(projects.description, `%${query}%`),
          ilike(projects.location, `%${query}%`)
        )
      )
      .orderBy(desc(projects.createdAt));
  }

  // Team member operations
  async getTeamMembers(): Promise<TeamMember[]> {
    return db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.active, true))
      .orderBy(teamMembers.order);
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db.insert(teamMembers).values(insertMember).returning();
    return member;
  }

  async updateTeamMember(id: string, updateMember: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [member] = await db
      .update(teamMembers)
      .set(updateMember)
      .where(eq(teamMembers.id, id))
      .returning();
    return member;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Blog post operations
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    try {
      let query = db.select().from(blogPosts);

      if (published !== undefined) {
        query = query.where(eq(blogPosts.published, published));
      }

      return await query.orderBy(desc(blogPosts.createdAt));
    } catch (error) {
      console.warn("⚠️ [STORAGE] Database failed, using fallback for getBlogPosts");
      let posts = FALLBACK_BLOG_POSTS;
      if (published !== undefined) {
        posts = posts.filter(p => p.published === published);
      }
      return posts;
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    try {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
      return post;
    } catch (error) {
      return FALLBACK_BLOG_POSTS.find(p => p.id === id);
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
      return post;
    } catch (error) {
      return FALLBACK_BLOG_POSTS.find(p => p.slug === slug);
    }
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updatePost: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updatePost, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Contact inquiry operations
  async getContactInquiries(): Promise<ContactInquiry[]> {
    return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db.insert(contactInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async updateContactInquiry(id: string, updateInquiry: Partial<InsertContactInquiry>): Promise<ContactInquiry> {
    const [inquiry] = await db
      .update(contactInquiries)
      .set(updateInquiry)
      .where(eq(contactInquiries.id, id))
      .returning();
    return inquiry;
  }

  async deleteContactInquiry(id: string): Promise<void> {
    await db.delete(contactInquiries).where(eq(contactInquiries.id, id));
  }

  // Newsletter operations
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.active, true))
      .orderBy(desc(newsletterSubscribers.createdAt));
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db.insert(newsletterSubscribers).values(insertSubscriber).returning();
    return subscriber;
  }

  async unsubscribeNewsletter(email: string): Promise<void> {
    await db
      .update(newsletterSubscribers)
      .set({ active: false })
      .where(eq(newsletterSubscribers.email, email));
  }

  // Service booking operations
  async getServiceBookings(): Promise<ServiceBooking[]> {
    try {
      return await db.select().from(serviceBookings).orderBy(desc(serviceBookings.createdAt));
    } catch (error) {
      console.warn("⚠️ [STORAGE] Database failed, using local file for getServiceBookings");
      if (fs.existsSync(BOOKINGS_FILE)) {
        return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
      }
      return [];
    }
  }

  async getServiceBooking(id: string): Promise<ServiceBooking | undefined> {
    try {
      const [booking] = await db.select().from(serviceBookings).where(eq(serviceBookings.id, id));
      return booking;
    } catch (error) {
      if (fs.existsSync(BOOKINGS_FILE)) {
        const bookings: ServiceBooking[] = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
        return bookings.find(b => b.id === id);
      }
      return undefined;
    }
  }

  async createServiceBooking(insertBooking: InsertServiceBooking): Promise<ServiceBooking> {
    try {
      const [booking] = await db.insert(serviceBookings).values(insertBooking).returning();
      return booking;
    } catch (error) {
      console.warn("⚠️ [STORAGE] Database failed, saving Service Booking to local file");

      const newBooking: ServiceBooking = {
        ...insertBooking,
        id: "local-" + Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: insertBooking.status || "pending",
        company: insertBooking.company || null,
        servicePackage: insertBooking.servicePackage || null,
        projectTitle: insertBooking.projectTitle || null,
        projectDescription: insertBooking.projectDescription || null,
        budget: insertBooking.budget || null,
        timeline: insertBooking.timeline || null,
        preferredDate: insertBooking.preferredDate || null,
        alternateDate: insertBooking.alternateDate || null,
        requirements: insertBooking.requirements || null,
        attachments: insertBooking.attachments || null,
        assignedTo: insertBooking.assignedTo || null,
        notes: insertBooking.notes || null,
        estimatedCost: insertBooking.estimatedCost || null,
        actualCost: insertBooking.actualCost || null
      };

      let bookings: ServiceBooking[] = [];
      if (fs.existsSync(BOOKINGS_FILE)) {
        bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
      }
      bookings.unshift(newBooking);
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

      return newBooking;
    }
  }

  async updateServiceBooking(id: string, updateData: Partial<InsertServiceBooking>): Promise<ServiceBooking> {
    const [booking] = await db
      .update(serviceBookings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(serviceBookings.id, id))
      .returning();
    return booking;
  }

  async deleteServiceBooking(id: string): Promise<void> {
    await db.delete(serviceBookings).where(eq(serviceBookings.id, id));
  }

  // Demo booking operations (legacy)
  async getDemoBookings(): Promise<DemoBooking[]> {
    return db.select().from(demoBookings).orderBy(desc(demoBookings.createdAt));
  }

  async getDemoBooking(id: string): Promise<DemoBooking | undefined> {
    const [booking] = await db.select().from(demoBookings).where(eq(demoBookings.id, id));
    return booking;
  }

  async createDemoBooking(insertBooking: InsertDemoBooking): Promise<DemoBooking> {
    const [booking] = await db.insert(demoBookings).values(insertBooking).returning();
    return booking;
  }

  async updateDemoBooking(id: string, updateBooking: Partial<InsertDemoBooking>): Promise<DemoBooking> {
    const [booking] = await db
      .update(demoBookings)
      .set(updateBooking)
      .where(eq(demoBookings.id, id))
      .returning();
    return booking;
  }

  // Property operations
  async getProperties(featured?: boolean): Promise<Property[]> {
    console.log(`[DEBUG] getProperties called with featured: ${featured}`);

    try {
      let query = db.select().from(properties);
      if (featured !== undefined) {
        console.log(`[DEBUG] Adding featured filter: ${featured}`);
        query = query.where(eq(properties.featured, featured));
      }

      const result = await query.orderBy(desc(properties.createdAt));
      console.log(`[DEBUG] getProperties returned ${result.length} properties`);

      // If DB returns empty but we expected data (and we're in dev/local environment where DB might be empty/broken)
      // use fallback
      if (result.length === 0) {
        throw new Error("No properties found, checking fallback");
      }

      return result;
    } catch (e) {
      console.warn("Database error or empty result in getProperties, using fallback data:", e);
      if (featured !== undefined) {
        return FALLBACK_PROPERTIES.filter(p => p.featured === featured);
      }
      return FALLBACK_PROPERTIES;
    }
  }

  async getProperty(id: string): Promise<Property | undefined> {
    try {
      const [property] = await db.select().from(properties).where(eq(properties.id, id));
      if (!property) throw new Error("Property not found");
      return property;
    } catch (e) {
      console.warn("Database error in getProperty, using fallback data");
      return FALLBACK_PROPERTIES.find(p => p.id === id);
    }
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    return property;
  }

  async updateProperty(id: string, updateProperty: Partial<InsertProperty>): Promise<Property> {
    const [property] = await db
      .update(properties)
      .set({ ...updateProperty, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return property;
  }

  async deleteProperty(id: string): Promise<void> {
    await db.delete(properties).where(eq(properties.id, id));
  }

  async searchProperties(query: string): Promise<Property[]> {
    try {
      return await db
        .select()
        .from(properties)
        .where(
          or(
            ilike(properties.title, `%${query}%`),
            ilike(properties.description, `%${query}%`),
            ilike(properties.location, `%${query}%`),
            ilike(properties.city, `%${query}%`)
          )
        )
        .orderBy(desc(properties.createdAt));
    } catch (e) {
      const lowerQuery = query.toLowerCase();
      return FALLBACK_PROPERTIES.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.location.toLowerCase().includes(lowerQuery)
      );
    }
  }

  // Client Project operations
  async getClientProjects(clientId?: string): Promise<ClientProject[]> {
    let query = db.select().from(clientProjects);
    if (clientId) {
      query = query.where(eq(clientProjects.clientId, clientId));
    }
    return query.orderBy(desc(clientProjects.createdAt));
  }

  async getClientProject(id: string): Promise<ClientProject | undefined> {
    const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, id));
    return project;
  }

  async createClientProject(insertProject: InsertClientProject): Promise<ClientProject> {
    const [project] = await db.insert(clientProjects).values(insertProject).returning();
    return project;
  }

  async updateClientProject(id: string, updateProject: Partial<InsertClientProject>): Promise<ClientProject> {
    const [project] = await db
      .update(clientProjects)
      .set({ ...updateProject, updatedAt: new Date() })
      .where(eq(clientProjects.id, id))
      .returning();
    return project;
  }

  async deleteClientProject(id: string): Promise<void> {
    await db.delete(clientProjects).where(eq(clientProjects.id, id));
  }

  // Project Message operations
  async getProjectMessages(projectId: string): Promise<ProjectMessage[]> {
    return db
      .select()
      .from(projectMessages)
      .where(eq(projectMessages.projectId, projectId))
      .orderBy(desc(projectMessages.createdAt));
  }

  async createProjectMessage(insertMessage: InsertProjectMessage): Promise<ProjectMessage> {
    const [message] = await db.insert(projectMessages).values(insertMessage).returning();
    return message;
  }

  // Virtual Tour operations
  async getVirtualTours(status?: string): Promise<VirtualTour[]> {
    let query = db.select().from(virtualTours);
    if (status) {
      query = query.where(eq(virtualTours.status, status));
    }
    return query.orderBy(desc(virtualTours.createdAt));
  }

  async getVirtualTour(id: string): Promise<VirtualTour | undefined> {
    const [tour] = await db.select().from(virtualTours).where(eq(virtualTours.id, id));
    return tour;
  }

  async createVirtualTour(insertTour: InsertVirtualTour): Promise<VirtualTour> {
    const [tour] = await db.insert(virtualTours).values(insertTour).returning();
    return tour;
  }

  async updateVirtualTour(id: string, updateTour: Partial<InsertVirtualTour>): Promise<VirtualTour> {
    const [tour] = await db
      .update(virtualTours)
      .set({ ...updateTour, updatedAt: new Date() })
      .where(eq(virtualTours.id, id))
      .returning();
    return tour;
  }

  async deleteVirtualTour(id: string): Promise<void> {
    await db.delete(virtualTours).where(eq(virtualTours.id, id));
  }

  // Tour Session operations
  async getTourSessions(tourId: string): Promise<TourSession[]> {
    return db
      .select()
      .from(tourSessions)
      .where(eq(tourSessions.tourId, tourId))
      .orderBy(desc(tourSessions.createdAt));
  }

  async createTourSession(insertSession: InsertTourSession): Promise<TourSession> {
    const [session] = await db.insert(tourSessions).values(insertSession).returning();
    return session;
  }

  async updateTourSession(id: string, updateSession: Partial<InsertTourSession>): Promise<TourSession> {
    const [session] = await db
      .update(tourSessions)
      .set({ ...updateSession, updatedAt: new Date() })
      .where(eq(tourSessions.id, id))
      .returning();
    return session;
  }

  // Analytics operations
  async getBusinessMetrics(timeRange: string = "30d"): Promise<BusinessMetric[]> {
    // For now, return sample data - in production, this would query actual analytics
    const metrics: BusinessMetric[] = [
      {
        id: "1",
        metricType: "revenue",
        period: "daily",
        periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        periodEnd: new Date(),
        value: 128450,
        previousValue: 114200,
        target: 150000,
        metadata: { currency: "USD" },
        createdAt: new Date(),
      },
      {
        id: "2",
        metricType: "leads",
        period: "daily",
        periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        periodEnd: new Date(),
        value: 245,
        previousValue: 226,
        target: 300,
        metadata: { source: "all_channels" },
        createdAt: new Date(),
      },
      {
        id: "3",
        metricType: "conversions",
        period: "daily",
        periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        periodEnd: new Date(),
        value: 12,
        previousValue: 15,
        target: 18,
        metadata: { conversion_type: "service_booking" },
        createdAt: new Date(),
      },
      {
        id: "4",
        metricType: "satisfaction",
        period: "monthly",
        periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        periodEnd: new Date(),
        value: 47,
        previousValue: 44,
        target: 48,
        metadata: { scale: "1-50", average_rating: "4.7" },
        createdAt: new Date(),
      }
    ];
    return metrics;
  }

  async getAnalyticsEvents(timeRange: string = "30d"): Promise<AnalyticsEvent[]> {
    // Sample analytics events - in production, this would be real tracking data
    const events: AnalyticsEvent[] = [];
    const now = new Date();

    // Generate sample events for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);

      // Page view events
      events.push({
        id: `pv-${i}`,
        eventType: "page_view",
        eventCategory: "engagement",
        userId: `user-${Math.floor(Math.random() * 100)}`,
        sessionId: `session-${Math.floor(Math.random() * 50)}`,
        properties: {
          page: "/",
          views: Math.floor(Math.random() * 100) + 50
        },
        timestamp: date,
        ipAddress: "127.0.0.1",
        userAgent: "Browser",
      });

      // Service inquiry events
      events.push({
        id: `si-${i}`,
        eventType: "service_inquiry",
        eventCategory: "sales",
        userId: `user-${Math.floor(Math.random() * 100)}`,
        sessionId: `session-${Math.floor(Math.random() * 50)}`,
        properties: {
          service_type: "real_estate",
          inquiry_count: Math.floor(Math.random() * 10) + 1
        },
        timestamp: date,
        ipAddress: "127.0.0.1",
        userAgent: "Browser",
      });
    }

    return events.slice(0, 100); // Return latest 100 events
  }

  async getRealTimeAnalytics() {
    // Sample real-time data - in production, this would come from live analytics
    return {
      activeUsers: Math.floor(Math.random() * 50) + 10,
      pageViews: Math.floor(Math.random() * 1000) + 500,
      liveTours: Math.floor(Math.random() * 10) + 2,
      newInquiries: Math.floor(Math.random() * 5) + 1,
    };
  }

  async createAnalyticsEvent(eventData: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values(eventData).returning();
    return event;
  }

  async createBusinessMetric(metricData: InsertBusinessMetric): Promise<BusinessMetric> {
    const [metric] = await db.insert(businessMetrics).values(metricData).returning();
    return metric;
  }

  // Page operations
  async getPages(published?: boolean): Promise<Page[]> {
    let query = db.select().from(pages);
    if (published !== undefined) {
      query = query.where(eq(pages.published, published));
    }
    return query.orderBy(desc(pages.createdAt));
  }

  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const [page] = await db.insert(pages).values(insertPage).returning();
    return page;
  }

  async updatePage(id: number, updatePage: Partial<InsertPage>): Promise<Page> {
    const [page] = await db
      .update(pages)
      .set({ ...updatePage, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return page;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }
}


const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "UBOS Report: Residential Property Prices Surge Near Double Digits",
    slug: "ubos-property-prices-surge",
    content: "Residential property prices in Uganda are rising at nearly double the rate seen only months ago, according to a report released by the Uganda Bureau of Statistics. \n\nThe Residential Property Price Index shows prices for houses and residential property surged 9.2 percent in the year ending with the second quarter of the 2025-2026 financial year. This marks a sharp acceleration from the 4.7 percent increase recorded in the previous quarter.\n\nUBOS officials noted that the rapid growth is driven by high demand in and around the capital, particularly in the Greater Kampala area. Wakiso District recorded the most significant jump in costs. Prices there rose 16.9 percent as buyers seek land outside the increasingly congested Kampala city center.",
    excerpt: "Residential property prices in Uganda surged 9.2% year-on-year, with Wakiso District seeing a massive 16.9% rise, according to the latest UBOS report.",
    imageUrl: "https://pmldaily.com/wp-content/uploads/2024/06/Universal-Multipurpose-.jpg",
    category: "company-news",
    published: true,
    publishedAt: new Date("2026-01-02"),
    createdAt: new Date("2026-01-02"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: "2",
    title: "11 Hottest Real Estate Areas in Uganda in 2025",
    slug: "hottest-real-estate-areas-2025",
    content: "## 1) Kira Town\nKira Town is buzzing with a real estate boom. One big reason for this surge is the expected rise in property prices by 5% to 10% in 2025. This jump is fueled by the town's rapid urbanization and a growing middle class.\n\n## 2) Mukono Town\nMukono Town is catching eyes due to its prime spot along the Kampala-Jinja highway. The Kampala-Jinja Expressway project is a major driver, making it a magnet for investment.\n\n## 3) Entebbe\nGaining interest for its scenic views and booming tourism, driving property appreciation.\n\n## 4) Jinja City\nIndustrial growth and infrastructure development are key drivers here.",
    excerpt: "From Kira Town's urbanization to Mukono's strategic highway location, discover the 11 hottest real estate investment areas in Uganda for 2025.",
    imageUrl: "https://theafricanvestor.com/cdn/shop/articles/Uganda_Real_Estate.png?v=1708444444",
    category: "case-study",
    published: true,
    publishedAt: new Date("2025-02-18"),
    createdAt: new Date("2025-02-18"),
    updatedAt: new Date("2025-02-18")
  },
  {
    id: "3",
    title: "Uganda Real Estate Trends 2025: Emerging Opportunities",
    slug: "uganda-real-estate-trends-2025",
    content: "Uganda’s real estate sector is one of the fastest-growing in East Africa. Key trends shaping the market include:\n\n1. **Sustainable Development**: Developers are adopting eco-friendly practices like solar panels and rainwater harvesting.\n2. **Mixed-Use Developments**: Combining residential, commercial, and recreational spaces. A prime example is the Pearl Marina in Entebbe.\n3. **Affordable Housing**: Focus on 2-3 bedroom units under $50,000 to meet middle-class demand.\n4. **Technology Integration**: Smart homes with automated lighting and security systems are becoming a reality.",
    excerpt: "Sustainable development, mixed-use projects like Pearl Marina, and affordable housing are the top trends defining Uganda's real estate market in 2025.",
    imageUrl: "https://www.rehanisoko.com/assets/img/blog/trends-2025.jpg",
    category: "technology",
    published: true,
    publishedAt: new Date("2025-01-01"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01")
  }
];

export const storage = new DatabaseStorage();

