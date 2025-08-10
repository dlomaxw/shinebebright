import {
  users,
  projects,
  teamMembers,
  blogPosts,
  contactInquiries,
  newsletterSubscribers,
  demoBookings,
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
  
  // Newsletter operations
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  unsubscribeNewsletter(email: string): Promise<void>;
  
  // Demo booking operations
  getDemoBookings(): Promise<DemoBooking[]>;
  getDemoBooking(id: string): Promise<DemoBooking | undefined>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  updateDemoBooking(id: string, booking: Partial<InsertDemoBooking>): Promise<DemoBooking>;
}

export class DatabaseStorage implements IStorage {
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

  // Demo booking operations
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
}

export const storage = new DatabaseStorage();
