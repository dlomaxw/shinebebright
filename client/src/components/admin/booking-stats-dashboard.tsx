import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  Calendar,
  DollarSign,
  Building,
  Home,
  Palette,
  Camera,
  GraduationCap
} from "lucide-react";
import { format } from "date-fns";

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  byServiceType: {
    realEstate: number;
    architecture: number;
    interiorDesign: number;
    media: number;
    training: number;
  };
  recentBookings: Array<{
    id: string;
    firstName: string;
    lastName: string;
    serviceType: string;
    status: string;
    createdAt: string;
  }>;
}

const serviceTypeIcons = {
  "real-estate": Home,
  "architecture": Building,
  "interior-design": Palette,
  "media": Camera,
  "training": GraduationCap,
};

const serviceTypeLabels = {
  "real-estate": "Real Estate",
  "architecture": "Architecture",
  "interior-design": "Interior Design",
  "media": "Media",
  "training": "Training",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function BookingStatsDashboard() {
  const { data: stats, isLoading } = useQuery<BookingStats>({
    queryKey: ["/api/service-bookings/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BookOpen className="h-4 w-4 text-bright-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bright-black">{stats.total}</div>
            <p className="text-xs text-bright-gray">All time bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-bright-gray">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.inProgress}</div>
            <p className="text-xs text-bright-gray">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-bright-gray">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Type Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-bright-black">Bookings by Service Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(stats.byServiceType).map(([key, count]) => {
              const Icon = serviceTypeIcons[key as keyof typeof serviceTypeIcons];
              const label = serviceTypeLabels[key as keyof typeof serviceTypeLabels];
              const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-bright-yellow" />
                    <span className="text-sm font-medium text-bright-black">{label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-bright-gray">{percentage}%</div>
                    <Badge variant="outline" className="text-bright-black">
                      {count}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-bright-black">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentBookings.length === 0 ? (
              <p className="text-bright-gray text-center py-4">No recent bookings</p>
            ) : (
              <div className="space-y-3">
                {stats.recentBookings.map((booking) => {
                  const Icon = serviceTypeIcons[booking.serviceType as keyof typeof serviceTypeIcons];
                  const serviceLabel = serviceTypeLabels[booking.serviceType as keyof typeof serviceTypeLabels];
                  
                  return (
                    <div key={booking.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4 text-bright-yellow" />
                        <div>
                          <p className="text-sm font-medium text-bright-black">
                            {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-xs text-bright-gray">{serviceLabel}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                          {booking.status}
                        </Badge>
                        <p className="text-xs text-bright-gray mt-1">
                          {format(new Date(booking.createdAt), "MMM dd")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-bright-black">Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-xs text-bright-gray">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.confirmed}</div>
              <div className="text-xs text-bright-gray">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{stats.inProgress}</div>
              <div className="text-xs text-bright-gray">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-bright-gray">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-xs text-bright-gray">Cancelled</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}