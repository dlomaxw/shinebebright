import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, Clock, MousePointer, TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { AnalyticsEvent } from "@shared/schema";
import { format, subDays } from "date-fns";

interface UserEngagementProps {
  events: AnalyticsEvent[];
}

const UserEngagement = ({ events }: UserEngagementProps) => {
  // Generate sample engagement data
  const generateEngagementData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        timestamp: date.toISOString(),
        properties: Math.floor(Math.random() * 200) + 100,
      });
    }
    return data;
  };

  const engagementData = generateEngagementData();
  
  // User behavior metrics
  const userBehavior = [
    { metric: "Average Session Duration", value: "4m 32s", change: "+15%", trend: "up" },
    { metric: "Pages Per Session", value: "3.8", change: "+8%", trend: "up" },
    { metric: "Bounce Rate", value: "28.5%", change: "-12%", trend: "up" },
    { metric: "Return Visitor Rate", value: "42.3%", change: "+5%", trend: "up" },
  ];

  // Top content engagement
  const topContent = [
    { page: "Virtual Tour Gallery", views: 2456, engagement: 89, duration: "5:23" },
    { page: "Service Booking", views: 1890, engagement: 76, duration: "3:45" },
    { page: "Property Listings", views: 1634, engagement: 82, duration: "4:12" },
    { page: "About Our Technology", views: 1234, engagement: 71, duration: "2:58" },
    { page: "Client Testimonials", views: 987, engagement: 68, duration: "2:34" },
  ];

  // User journey stages
  const userJourney = [
    { stage: "Awareness", users: 1250, conversion: 68 },
    { stage: "Interest", users: 850, conversion: 45 },
    { stage: "Consideration", users: 380, conversion: 32 },
    { stage: "Intent", users: 120, conversion: 28 },
    { stage: "Purchase", users: 34, conversion: 0 },
  ];

  // Device and source breakdown
  const trafficSources = [
    { source: "Organic Search", users: 2340, percentage: 45, change: "+12%" },
    { source: "Direct", users: 1560, percentage: 30, change: "+8%" },
    { source: "Social Media", users: 780, percentage: 15, change: "+25%" },
    { source: "Referrals", users: 520, percentage: 10, change: "+15%" },
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userBehavior.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">{item.metric}</p>
                  <p className="text-2xl font-bold text-bright-black">{item.value}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                {item.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {item.change}
                </span>
                <span className="text-bright-gray ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Daily Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart
              data={engagementData}
              dataKey="timestamp"
              valueKey="properties"
              title="Daily Active Users"
              type="line"
              color="#3B82F6"
              height={300}
            />
          </CardContent>
        </Card>

        {/* User Journey Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              User Journey Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userJourney.map((stage, index) => {
                const width = (stage.users / userJourney[0].users) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-bright-black">{stage.stage}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{stage.users.toLocaleString()} users</div>
                        {index < userJourney.length - 1 && (
                          <Badge className="bg-blue-100 text-blue-800">
                            {stage.conversion}% convert
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 flex items-center">
                      <div 
                        className="h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
                        style={{ width: `${width}%` }}
                      >
                        <span className="text-white text-xs font-medium px-2">
                          {Math.round(width)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance and Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Top Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContent.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-bright-black">{item.page}</div>
                    <div className="text-sm text-bright-gray flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-bright-black">{item.engagement}%</div>
                    <div className="text-xs text-bright-gray">engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-orange-600" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-bright-black">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-bright-gray">{source.users.toLocaleString()}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {source.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-bright-gray">{source.percentage}% of total traffic</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Engagement Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-bright-yellow" />
            Real-time User Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">23</div>
              <div className="text-sm text-bright-gray">Users online now</div>
              <Badge className="bg-green-100 text-green-800 animate-pulse mt-2">LIVE</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">7</div>
              <div className="text-sm text-bright-gray">Active virtual tours</div>
              <Button variant="outline" size="sm" className="mt-2">
                View Live Tours
              </Button>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-2">3</div>
              <div className="text-sm text-bright-gray">Forms being filled</div>
              <Button variant="outline" size="sm" className="mt-2">
                Monitor Activity
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEngagement;