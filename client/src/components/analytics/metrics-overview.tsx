import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Target,
  Calendar
} from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { BusinessMetric, AnalyticsEvent } from "@shared/schema";

interface MetricsOverviewProps {
  metrics: BusinessMetric[];
  events: AnalyticsEvent[];
}

const MetricsOverview = ({ metrics, events }: MetricsOverviewProps) => {
  // Mock overview data
  const overviewStats = [
    {
      title: "Website Traffic",
      value: "24,567",
      change: "+12.5%",
      trend: "up",
      icon: <Eye className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Service Inquiries", 
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: <MousePointer className="h-5 w-5" />,
      color: "green"
    },
    {
      title: "Virtual Tours",
      value: "89",
      change: "+25.6%",
      trend: "up", 
      icon: <Calendar className="h-5 w-5" />,
      color: "purple"
    },
    {
      title: "Avg. Session Time",
      value: "4m 32s",
      change: "-2.1%",
      trend: "down",
      icon: <Clock className="h-5 w-5" />,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-100 text-blue-600";
      case "green": return "bg-green-100 text-green-600";
      case "purple": return "bg-purple-100 text-purple-600";
      case "orange": return "bg-orange-100 text-orange-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">{stat.title}</p>
                  <p className="text-2xl font-bold text-bright-black">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={getTrendColor(stat.trend)}>{stat.change}</span>
                <span className="text-bright-gray ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={[]}
              dataKey="date"
              valueKey="visitors"
              title=""
              type="area"
              color="#3B82F6"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={[]}
              dataKey="date"
              valueKey="bookings"
              title=""
              type="bar"
              color="#FFD700"
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: "Website Visitors", count: 24567, percentage: 100 },
                { stage: "Service Page Views", count: 8945, percentage: 36.4 },
                { stage: "Contact Form Views", count: 2134, percentage: 8.7 },
                { stage: "Form Submissions", count: 456, percentage: 1.9 },
                { stage: "Service Bookings", count: 123, percentage: 0.5 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-bright-black">{item.stage}</span>
                      <span className="text-sm text-bright-gray">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-bright-yellow h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-bright-gray mt-1">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-bright-black mb-2">Age Groups</h4>
                {[
                  { group: "25-34", percentage: 35 },
                  { group: "35-44", percentage: 28 },
                  { group: "45-54", percentage: 20 },
                  { group: "18-24", percentage: 12 },
                  { group: "55+", percentage: 5 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-bright-gray">{item.group}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-bright-yellow h-2 rounded-full" 
                          style={{ width: `${(item.percentage / 35) * 100}%` }}
                        />
                      </div>
                      <span className="text-bright-black font-medium">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-bright-black mb-2">Device Types</h4>
                {[
                  { type: "Desktop", percentage: 58 },
                  { type: "Mobile", percentage: 35 },
                  { type: "Tablet", percentage: 7 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-bright-gray">{item.type}</span>
                    <span className="text-bright-black font-medium">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Modern Villa Tour", views: 1245, engagement: "92%" },
                { title: "Office Design Gallery", views: 987, engagement: "87%" },
                { title: "VR Training Demo", views: 856, engagement: "94%" },
                { title: "3D Architecture Preview", views: 743, engagement: "89%" },
                { title: "Interior Design Showcase", views: 632, engagement: "85%" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-bright-black text-sm">{item.title}</div>
                    <div className="text-xs text-bright-gray">{item.views} views</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {item.engagement}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsOverview;