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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, or } from "drizzle-orm";

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
}

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
    let query = db.select().from(projects);
    
    const conditions = [];
    if (category) conditions.push(eq(projects.category, category));
    if (featured !== undefined) conditions.push(eq(projects.featured, featured));
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return query.orderBy(desc(projects.createdAt));
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
    let query = db.select().from(blogPosts);
    
    if (published !== undefined) {
      query = query.where(eq(blogPosts.published, published));
    }
    
    return query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
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
    return await db.select().from(serviceBookings).orderBy(desc(serviceBookings.createdAt));
  }

  async getServiceBooking(id: string): Promise<ServiceBooking | undefined> {
    const [booking] = await db.select().from(serviceBookings).where(eq(serviceBookings.id, id));
    return booking;
  }

  async createServiceBooking(insertBooking: InsertServiceBooking): Promise<ServiceBooking> {
    const [booking] = await db.insert(serviceBookings).values(insertBooking).returning();
    return booking;
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
    
    let query = db.select().from(properties);
    if (featured !== undefined) {
      console.log(`[DEBUG] Adding featured filter: ${featured}`);
      query = query.where(eq(properties.featured, featured));
    }
    
    const result = await query.orderBy(desc(properties.createdAt));
    console.log(`[DEBUG] getProperties returned ${result.length} properties`);
    console.log(`[DEBUG] Avenue Muyenga count: ${result.filter(p => p.title.includes('Avenue Muyenga')).length}`);
    
    return result;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
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
    return db
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
}

export const storage = new DatabaseStorage();
