import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  role: varchar("role").notNull().default("user"), // user, admin
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // real-estate, architecture, interior-design, media, training
  imageUrl: varchar("image_url"),
  videoUrl: varchar("video_url"),
  status: varchar("status").notNull().default("active"), // active, archived
  featured: boolean("featured").default(false),
  price: integer("price"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: integer("area"),
  location: varchar("location"),
  amenities: jsonb("amenities"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  role: varchar("role").notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url"),
  linkedinUrl: varchar("linkedin_url"),
  twitterUrl: varchar("twitter_url"),
  order: integer("order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// News/Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: varchar("image_url"),
  category: varchar("category").notNull(), // technology, case-study, company-news
  slug: varchar("slug").notNull().unique(),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact inquiries table
export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  company: varchar("company"),
  service: varchar("service"),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("new"), // new, responded, closed
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service bookings table (enhanced demo bookings)
export const serviceBookings = pgTable("service_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  company: varchar("company"),
  phone: varchar("phone").notNull(),
  serviceType: varchar("service_type").notNull(), // real-estate, architecture, interior-design, media, training
  servicePackage: varchar("service_package"), // basic, standard, premium
  projectTitle: varchar("project_title"),
  projectDescription: text("project_description"),
  budget: varchar("budget"), // Under $10k, $10k-$50k, $50k-$100k, Over $100k
  timeline: varchar("timeline"), // 1-2 weeks, 1 month, 3 months, 6+ months
  preferredDate: timestamp("preferred_date"),
  alternateDate: timestamp("alternate_date"),
  requirements: jsonb("requirements"), // Specific requirements array
  attachments: jsonb("attachments"), // File attachments URLs
  status: varchar("status").notNull().default("pending"), // pending, confirmed, in-progress, completed, cancelled
  assignedTo: varchar("assigned_to"), // Team member ID
  notes: text("notes"), // Internal notes
  estimatedCost: integer("estimated_cost"), // In cents
  actualCost: integer("actual_cost"), // In cents
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Backward compatibility - keep the demo bookings table for existing data
export const demoBookings = pgTable("demo_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  company: varchar("company"),
  phone: varchar("phone"),
  preferredDate: timestamp("preferred_date"),
  service: varchar("service"),
  message: text("message"),
  status: varchar("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// Properties table for real estate listings
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  price: varchar("price").notNull(), // Keep as varchar for complex pricing like "PRICES INSIDE"
  bedrooms: varchar("bedrooms"), // Can be complex like "1,2&3" or "2&3"
  bathrooms: varchar("bathrooms"), // Can be complex like "3,2&1"
  propertySize: varchar("property_size"), // Like "154 Sqm", "115 Sqm"
  garage: integer("garage"),
  yearBuilt: integer("year_built"),
  propertyType: varchar("property_type"), // "Apartment, Residential", "Villa"
  status: varchar("status").default("For Sale"), // "For Sale", "Sold"
  location: varchar("location").notNull(),
  address: text("address"),
  city: varchar("city"),
  area: varchar("area"),
  country: varchar("country").default("Uganda"),
  images: jsonb("images"), // Array of image URLs
  features: jsonb("features"), // Array of features/amenities
  featured: boolean("featured").default(false),
  originalUrl: varchar("original_url"), // URL from shinebebright.com
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Client Portal tables
export const clientProjects = pgTable("client_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceBookingId: varchar("service_booking_id").references(() => serviceBookings.id),
  clientId: varchar("client_id").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  status: varchar("status").default("planning"), // planning, in-progress, review, completed, cancelled
  progress: integer("progress").default(0), // 0-100
  startDate: timestamp("start_date"),
  expectedEndDate: timestamp("expected_end_date"),
  actualEndDate: timestamp("actual_end_date"),
  budget: integer("budget"),
  spent: integer("spent").default(0),
  projectManager: varchar("project_manager"),
  team: jsonb("team").$type<string[]>(),
  milestones: jsonb("milestones").$type<{ id: string; title: string; dueDate: string; completed: boolean; description?: string }[]>(),
  files: jsonb("files").$type<{ id: string; name: string; url: string; type: string; uploadedAt: string; uploadedBy: string }[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectMessages = pgTable("project_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => clientProjects.id),
  senderId: varchar("sender_id").notNull(),
  senderName: varchar("sender_name").notNull(),
  senderRole: varchar("sender_role").notNull(), // client, admin, team_member
  message: text("message").notNull(),
  attachments: jsonb("attachments").$type<{ id: string; name: string; url: string; type: string }[]>(),
  readBy: jsonb("read_by").$type<{ userId: string; readAt: string }[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Virtual Tour Streaming tables
export const virtualTours = pgTable("virtual_tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => clientProjects.id),
  propertyId: varchar("property_id").references(() => properties.id),
  title: varchar("title").notNull(),
  description: text("description"),
  tourType: varchar("tour_type").notNull(), // live, recorded, 360, vr
  status: varchar("status").default("scheduled"), // scheduled, live, completed, cancelled
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  streamUrl: varchar("stream_url"),
  recordingUrl: varchar("recording_url"),
  meetingId: varchar("meeting_id"),
  participants: jsonb("participants").$type<{ id: string; name: string; email: string; role: string; joinedAt?: string; leftAt?: string }[]>(),
  settings: jsonb("settings").$type<{ allowRecording: boolean; requireAuth: boolean; maxParticipants: number; chatEnabled: boolean }>(),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tourSessions = pgTable("tour_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tourId: varchar("tour_id").references(() => virtualTours.id),
  participantId: varchar("participant_id").notNull(),
  participantName: varchar("participant_name").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
  leftAt: timestamp("left_at"),
  duration: integer("duration"), // in seconds
  interactions: jsonb("interactions").$type<{ type: string; timestamp: string; data: any }[]>(),
  feedback: text("feedback"),
  rating: integer("rating"), // 1-5
});

// Analytics tables
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: varchar("event_type").notNull(), // page_view, service_inquiry, booking_created, tour_joined, etc.
  eventCategory: varchar("event_category").notNull(), // marketing, sales, engagement, technical
  userId: varchar("user_id"),
  sessionId: varchar("session_id"),
  properties: jsonb("properties").$type<Record<string, any>>(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  timestamp: timestamp("timestamp").defaultNow(),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
});

export const businessMetrics = pgTable("business_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metricType: varchar("metric_type").notNull(), // revenue, leads, conversions, satisfaction
  period: varchar("period").notNull(), // daily, weekly, monthly, quarterly
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  value: integer("value").notNull(),
  previousValue: integer("previous_value"),
  target: integer("target"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
});

export const insertServiceBookingSchema = createInsertSchema(serviceBookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDemoBookingSchema = createInsertSchema(demoBookings).omit({
  id: true,
  createdAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientProjectSchema = createInsertSchema(clientProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectMessageSchema = createInsertSchema(projectMessages).omit({
  id: true,
  createdAt: true,
});

export const insertVirtualTourSchema = createInsertSchema(virtualTours).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTourSessionSchema = createInsertSchema(tourSessions).omit({
  id: true,
  joinedAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  timestamp: true,
});

export const insertBusinessMetricSchema = createInsertSchema(businessMetrics).omit({
  id: true,
  createdAt: true,
});



// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;

export type ServiceBooking = typeof serviceBookings.$inferSelect;
export type InsertServiceBooking = z.infer<typeof insertServiceBookingSchema>;

export type DemoBooking = typeof demoBookings.$inferSelect;
export type InsertDemoBooking = z.infer<typeof insertDemoBookingSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type ClientProject = typeof clientProjects.$inferSelect;
export type InsertClientProject = z.infer<typeof insertClientProjectSchema>;

export type ProjectMessage = typeof projectMessages.$inferSelect;
export type InsertProjectMessage = z.infer<typeof insertProjectMessageSchema>;

export type VirtualTour = typeof virtualTours.$inferSelect;
export type InsertVirtualTour = z.infer<typeof insertVirtualTourSchema>;

export type TourSession = typeof tourSessions.$inferSelect;
export type InsertTourSession = z.infer<typeof insertTourSessionSchema>;

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;

export type BusinessMetric = typeof businessMetrics.$inferSelect;
export type InsertBusinessMetric = z.infer<typeof insertBusinessMetricSchema>;
