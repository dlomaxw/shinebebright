import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactInquirySchema,
  insertNewsletterSubscriberSchema,
  insertDemoBookingSchema,
  insertServiceBookingSchema,
  insertProjectSchema,
  insertBlogPostSchema,
  insertTeamMemberSchema,
  insertPropertySchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add comprehensive no-cache headers for all API routes to prevent CDN/browser caching
  app.use("/api/*", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0, proxy-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("X-App-Version", process.env.GIT_SHA || process.env.REPL_ID || "dev");
    next();
  });

  // Version endpoint to verify deployments
  app.get("/__version", (req, res) => {
    const version = {
      version: process.env.GIT_SHA || process.env.REPL_ID || "unknown",
      buildTime: new Date().toISOString(),
      storage: "database",
      nodeVersion: process.version,
      timestamp: Date.now()
    };
    res.json(version);
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const projects = await storage.getProjects(
        category as string,
        featured === "true" ? true : featured === "false" ? false : undefined
      );
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const projects = await storage.searchProjects(q);
      res.json(projects);
    } catch (error) {
      console.error("Error searching projects:", error);
      res.status(500).json({ message: "Failed to search projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Team members routes
  app.get("/api/team", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post("/api/team", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating team member:", error);
      res.status(500).json({ message: "Failed to create team member" });
    }
  });

  // Blog posts routes
  app.get("/api/blog", async (req, res) => {
    try {
      const { published } = req.query;
      const posts = await storage.getBlogPosts(
        published === "true" ? true : published === "false" ? false : undefined
      );
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Contact inquiry routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating contact inquiry:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get("/api/admin/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Demo booking routes
  app.post("/api/demo", async (req, res) => {
    try {
      const validatedData = insertDemoBookingSchema.parse(req.body);
      const booking = await storage.createDemoBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating demo booking:", error);
      res.status(500).json({ message: "Failed to book demo" });
    }
  });

  app.get("/api/admin/bookings", async (req, res) => {
    try {
      const bookings = await storage.getDemoBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { featured } = req.query;
      const properties = await storage.getProperties(
        featured === "true" ? true : featured === "false" ? false : undefined
      );
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const properties = await storage.searchProperties(q);
      res.json(properties);
    } catch (error) {
      console.error("Error searching properties:", error);
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.put("/api/properties/:id", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const property = await storage.updateProperty(req.params.id, validatedData);
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", async (req, res) => {
    try {
      await storage.deleteProperty(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Service booking routes
  app.get("/api/service-bookings", async (req, res) => {
    try {
      const bookings = await storage.getServiceBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching service bookings:", error);
      res.status(500).json({ message: "Failed to fetch service bookings" });
    }
  });

  app.get("/api/service-bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getServiceBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Service booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching service booking:", error);
      res.status(500).json({ message: "Failed to fetch service booking" });
    }
  });

  app.post("/api/service-bookings", async (req, res) => {
    try {
      const validatedData = insertServiceBookingSchema.parse(req.body);
      const booking = await storage.createServiceBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating service booking:", error);
      res.status(500).json({ message: "Failed to create service booking" });
    }
  });

  app.put("/api/service-bookings/:id", async (req, res) => {
    try {
      const validatedData = insertServiceBookingSchema.partial().parse(req.body);
      const booking = await storage.updateServiceBooking(req.params.id, validatedData);
      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating service booking:", error);
      res.status(500).json({ message: "Failed to update service booking" });
    }
  });

  app.delete("/api/service-bookings/:id", async (req, res) => {
    try {
      await storage.deleteServiceBooking(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service booking:", error);
      res.status(500).json({ message: "Failed to delete service booking" });
    }
  });

  // Client Projects routes
  app.get("/api/client-projects", async (req, res) => {
    try {
      const { clientId } = req.query;
      const projects = await storage.getClientProjects(clientId ? String(clientId) : undefined);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching client projects:", error);
      res.status(500).json({ message: "Failed to fetch client projects" });
    }
  });

  app.get("/api/client-projects/:id", async (req, res) => {
    try {
      const project = await storage.getClientProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Client project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching client project:", error);
      res.status(500).json({ message: "Failed to fetch client project" });
    }
  });

  app.get("/api/client-projects/:id/messages", async (req, res) => {
    try {
      const messages = await storage.getProjectMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching project messages:", error);
      res.status(500).json({ message: "Failed to fetch project messages" });
    }
  });

  // Virtual Tours routes
  app.get("/api/virtual-tours", async (req, res) => {
    try {
      const { status } = req.query;
      const tours = await storage.getVirtualTours(status ? String(status) : undefined);
      res.json(tours);
    } catch (error) {
      console.error("Error fetching virtual tours:", error);
      res.status(500).json({ message: "Failed to fetch virtual tours" });
    }
  });

  app.get("/api/virtual-tours/:id", async (req, res) => {
    try {
      const tour = await storage.getVirtualTour(req.params.id);
      if (!tour) {
        return res.status(404).json({ message: "Virtual tour not found" });
      }
      res.json(tour);
    } catch (error) {
      console.error("Error fetching virtual tour:", error);
      res.status(500).json({ message: "Failed to fetch virtual tour" });
    }
  });

  app.get("/api/virtual-tours/:id/sessions", async (req, res) => {
    try {
      const sessions = await storage.getTourSessions(req.params.id);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching tour sessions:", error);
      res.status(500).json({ message: "Failed to fetch tour sessions" });
    }
  });



  // Admin routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const [projects, inquiries, subscribers, bookings, serviceBookings] = await Promise.all([
        storage.getProjects(),
        storage.getContactInquiries(),
        storage.getNewsletterSubscribers(),
        storage.getDemoBookings(),
        storage.getServiceBookings(),
      ]);

      const stats = {
        totalProjects: projects.length,
        totalInquiries: inquiries.length,
        totalSubscribers: subscribers.length,
        totalBookings: bookings.length,
        totalServiceBookings: serviceBookings.length,
        recentInquiries: inquiries.slice(0, 5),
        recentBookings: bookings.slice(0, 5),
        recentServiceBookings: serviceBookings.slice(0, 5),
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/metrics", async (req, res) => {
    try {
      const timeRange = req.query.timeRange as string || "30d";
      const metrics = await storage.getBusinessMetrics(timeRange);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching business metrics:", error);
      res.status(500).json({ message: "Failed to fetch business metrics" });
    }
  });

  app.get("/api/analytics/events", async (req, res) => {
    try {
      const timeRange = req.query.timeRange as string || "30d";
      const events = await storage.getAnalyticsEvents(timeRange);
      res.json(events);
    } catch (error) {
      console.error("Error fetching analytics events:", error);
      res.status(500).json({ message: "Failed to fetch analytics events" });
    }
  });

  app.get("/api/analytics/realtime", async (req, res) => {
    try {
      const realtimeData = await storage.getRealTimeAnalytics();
      res.json(realtimeData);
    } catch (error) {
      console.error("Error fetching real-time analytics:", error);
      res.status(500).json({ message: "Failed to fetch real-time analytics" });
    }
  });

  app.post("/api/analytics/events", async (req, res) => {
    try {
      const eventData = req.body;
      const event = await storage.createAnalyticsEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating analytics event:", error);
      res.status(500).json({ message: "Failed to create analytics event" });
    }
  });

  // Placeholder image endpoint
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
        ${width} × ${height}
      </text>
    </svg>`;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}
