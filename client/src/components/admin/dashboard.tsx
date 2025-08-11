import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectForm from "@/components/admin/project-form";
import TeamForm from "@/components/admin/team-form";
import BlogForm from "@/components/admin/blog-form";
import { 
  Eye, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  Mail,
  RefreshCw,
  Briefcase
} from "lucide-react";
import { INQUIRY_STATUSES, BOOKING_STATUSES } from "@/lib/constants";
import type { ContactInquiry, DemoBooking, Project, TeamMember, BlogPost, NewsletterSubscriber, ServiceBooking } from "@shared/schema";
import { ServiceBookingsTable } from "@/components/admin/service-bookings-table";
import PropertiesTable from "@/components/admin/properties-table";

interface AdminDashboardProps {
  activeSection: string;
}

const AdminDashboard = ({ activeSection }: AdminDashboardProps) => {
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: teamMembers = [] } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: inquiries = [] } = useQuery<ContactInquiry[]>({
    queryKey: ["/api/admin/inquiries"],
  });

  const { data: bookings = [] } = useQuery<DemoBooking[]>({
    queryKey: ["/api/admin/bookings"],
  });

  const { data: serviceBookings = [] } = useQuery<ServiceBooking[]>({
    queryKey: ["/api/service-bookings"],
  });

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status: string, type: 'inquiry' | 'booking') => {
    if (type === 'inquiry') {
      const statusConfig = INQUIRY_STATUSES.find(s => s.value === status);
      return statusConfig ? `bg-${statusConfig.color}-100 text-${statusConfig.color}-800` : 'bg-gray-100 text-gray-800';
    } else {
      const statusConfig = BOOKING_STATUSES.find(s => s.value === status);
      return statusConfig ? `bg-${statusConfig.color}-100 text-${statusConfig.color}-800` : 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bright-white">Dashboard</h1>
          <p className="text-bright-white/70">Welcome to the Bright admin panel</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-bright-white border-bright-yellow/20">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            title: "Total Projects",
            value: projects.length,
            change: "+12.5%",
            trend: "up",
            icon: <FolderOpen className="h-5 w-5" />,
          },
          {
            title: "Team Members",
            value: teamMembers.length,
            change: "+8.2%", 
            trend: "up",
            icon: <Users className="h-5 w-5" />,
          },
          {
            title: "Inquiries",
            value: inquiries.length,
            change: "+15.3%",
            trend: "up",
            icon: <MessageSquare className="h-5 w-5" />,
          },
          {
            title: "Demo Bookings",
            value: bookings.length,
            change: "+9.1%",
            trend: "up",
            icon: <Calendar className="h-5 w-5" />,
          },
          {
            title: "Service Bookings",
            value: serviceBookings.length,
            change: "+25.6%",
            trend: "up",
            icon: <Briefcase className="h-5 w-5" />,
          },
        ].map((stat, index) => (
          <Card key={index} className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-bright-yellow/10 p-2 rounded-md">
                  <div className="text-bright-yellow">{stat.icon}</div>
                </div>
                <div className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                  {stat.trend === "up" ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-bright-white/70 text-sm font-medium">{stat.title}</h3>
                <p className="text-bright-white text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-bright-white">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-3 rounded-md bg-bright-black/30">
                  <div>
                    <p className="font-medium text-bright-white">{inquiry.firstName} {inquiry.lastName}</p>
                    <div className="flex items-center text-sm text-bright-white/70">
                      <span>{inquiry.email}</span>
                      <span className="mx-2">•</span>
                      <span>{inquiry.service || 'General'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-bright-white/50 mr-3">{formatDate(inquiry.createdAt)}</span>
                    <Badge className={getStatusColor(inquiry.status, 'inquiry')}>
                      {inquiry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="border-bright-yellow/10 bg-bright-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-bright-white">Recent Demo Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-md bg-bright-black/30">
                  <div>
                    <p className="font-medium text-bright-white">{booking.name}</p>
                    <div className="flex items-center text-sm text-bright-white/70">
                      <span>{booking.email}</span>
                      {booking.company && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{booking.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-bright-white/50 mr-3">{formatDate(booking.createdAt)}</span>
                    <Badge className={getStatusColor(booking.status, 'booking')}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-bright-white">Projects</h1>
        <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400">
          Add New Project
        </Button>
      </div>
      <ProjectForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-bright-yellow/10 bg-bright-black/50">
            <CardContent className="p-6">
              <h3 className="text-bright-white font-semibold mb-2">{project.title}</h3>
              <p className="text-bright-white/70 text-sm mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <Badge>{project.category}</Badge>
                {project.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-bright-white">Team Members</h1>
        <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400">
          Add Team Member
        </Button>
      </div>
      <TeamForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="border-bright-yellow/10 bg-bright-black/50">
            <CardContent className="p-6 text-center">
              <img
                src={member.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                alt={member.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-bright-white font-semibold">{member.name}</h3>
              <p className="text-bright-white/70 text-sm">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-bright-white">Blog Posts</h1>
        <Button className="bg-bright-yellow text-bright-black hover:bg-yellow-400">
          Add New Post
        </Button>
      </div>
      <BlogForm />
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="border-bright-yellow/10 bg-bright-black/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-bright-white font-semibold mb-2">{post.title}</h3>
                  <p className="text-bright-white/70 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center space-x-4">
                    <Badge>{post.category}</Badge>
                    <span className="text-bright-white/50 text-xs">{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bright-white">Contact Inquiries</h1>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="border-bright-yellow/10 bg-bright-black/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-bright-white font-semibold mb-2">
                    {inquiry.firstName} {inquiry.lastName}
                  </h3>
                  <p className="text-bright-white/70 text-sm mb-2">{inquiry.email}</p>
                  {inquiry.company && <p className="text-bright-white/70 text-sm mb-2">{inquiry.company}</p>}
                  <p className="text-bright-white/70 text-sm mb-4">{inquiry.message}</p>
                  <span className="text-bright-white/50 text-xs">{formatDate(inquiry.createdAt)}</span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(inquiry.status, 'inquiry')}>
                    {inquiry.status}
                  </Badge>
                  {inquiry.service && <Badge variant="outline">{inquiry.service}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bright-white">Demo Bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="border-bright-yellow/10 bg-bright-black/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-bright-white font-semibold mb-2">{booking.name}</h3>
                  <p className="text-bright-white/70 text-sm mb-2">{booking.email}</p>
                  {booking.company && <p className="text-bright-white/70 text-sm mb-2">{booking.company}</p>}
                  {booking.phone && <p className="text-bright-white/70 text-sm mb-2">{booking.phone}</p>}
                  {booking.message && <p className="text-bright-white/70 text-sm mb-4">{booking.message}</p>}
                  <div className="flex items-center space-x-4 text-xs text-bright-white/50">
                    <span>Requested: {formatDate(booking.createdAt)}</span>
                    {booking.preferredDate && <span>Preferred: {formatDate(booking.preferredDate)}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(booking.status, 'booking')}>
                    {booking.status}
                  </Badge>
                  {booking.service && <Badge variant="outline">{booking.service}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderServiceBookings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bright-white">Service Bookings</h1>
      <div className="bg-bright-black/50 rounded-lg p-6">
        <ServiceBookingsTable />
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "projects":
        return renderProjects();
      case "team":
        return renderTeam();
      case "blog":
        return renderBlog();
      case "inquiries":
        return renderInquiries();
      case "bookings":
        return renderBookings();
      case "service-bookings":
        return renderServiceBookings();
      case "properties":
        return (
          <div className="space-y-6">
            <PropertiesTable />
          </div>
        );
      case "newsletter":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-bright-white">Newsletter Subscribers</h1>
            <Card className="border-bright-yellow/10 bg-bright-black/50">
              <CardContent className="p-6">
                <p className="text-bright-white/70">Newsletter management functionality would be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-bright-white">Settings</h1>
            <Card className="border-bright-yellow/10 bg-bright-black/50">
              <CardContent className="p-6">
                <p className="text-bright-white/70">System settings and configuration options would be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="p-6">
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;
