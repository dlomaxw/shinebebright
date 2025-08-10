import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MousePointer, 
  Clock, 
  Eye,
  Heart,
  MessageSquare,
  Share,
  Download,
  Play,
  Star
} from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { AnalyticsEvent } from "@shared/schema";

interface UserEngagementProps {
  events: AnalyticsEvent[];
}

const UserEngagement = ({ events }: UserEngagementProps) => {
  const engagementMetrics = [
    {
      title: "Page Views",
      value: "45,678",
      change: "+12.3%",
      icon: <Eye className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Session Duration",
      value: "4m 32s",
      change: "+8.7%", 
      icon: <Clock className="h-5 w-5" />,
      color: "green"
    },
    {
      title: "Bounce Rate",
      value: "32.1%",
      change: "-5.2%",
      icon: <MousePointer className="h-5 w-5" />,
      color: "red"
    },
    {
      title: "Return Visitors",
      value: "68.4%",
      change: "+3.9%",
      icon: <Users className="h-5 w-5" />,
      color: "purple"
    }
  ];

  const contentEngagement = [
    { 
      title: "VR Property Tour - Modern Villa", 
      views: 2456, 
      duration: "6m 45s", 
      engagement: 94,
      shares: 45,
      likes: 123
    },
    { 
      title: "3D Architecture Showcase", 
      views: 1890, 
      duration: "5m 12s", 
      engagement: 87,
      shares: 32,
      likes: 89
    },
    { 
      title: "Interior Design Gallery", 
      views: 1567, 
      duration: "4m 38s", 
      engagement: 82,
      shares: 28,
      likes: 76
    },
    { 
      title: "VR Training Demo", 
      views: 1234, 
      duration: "7m 23s", 
      engagement: 91,
      shares: 38,
      likes: 98
    }
  ];

  const userBehavior = [
    { action: "Page Views", count: 45678 },
    { action: "Video Plays", count: 8934 },
    { action: "Form Submissions", count: 1234 },
    { action: "Downloads", count: 567 },
    { action: "Social Shares", count: 234 },
    { action: "Comments", count: 89 }
  ];

  const deviceEngagement = [
    { device: "Desktop", sessions: 12456, avgDuration: "5m 45s", bounceRate: 28.3 },
    { device: "Mobile", sessions: 8734, avgDuration: "3m 12s", bounceRate: 38.7 },
    { device: "Tablet", sessions: 2345, avgDuration: "4m 23s", bounceRate: 31.2 }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-100 text-blue-600";
      case "green": return "bg-green-100 text-green-600";
      case "red": return "bg-red-100 text-red-600";
      case "purple": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">{metric.title}</p>
                  <p className="text-2xl font-bold text-bright-black">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-3 text-sm">
                <Badge className={metric.change.startsWith('+') && metric.color !== 'red' || metric.change.startsWith('-') && metric.color === 'red' 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
                }>
                  {metric.change} vs last month
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={[]}
              dataKey="date"
              valueKey="engagement"
              title=""
              type="line"
              color="#8B5CF6"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Duration by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={[]}
              dataKey="hour"
              valueKey="duration"
              title=""
              type="bar"
              color="#10B981"
            />
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Performing Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentEngagement.map((content, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-bright-black">{content.title}</h3>
                  <Badge className="bg-bright-yellow text-bright-black">
                    {content.engagement}% engagement
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">Views:</span>
                    <span className="font-medium text-bright-black">{content.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">Duration:</span>
                    <span className="font-medium text-bright-black">{content.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">Shares:</span>
                    <span className="font-medium text-bright-black">{content.shares}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">Likes:</span>
                    <span className="font-medium text-bright-black">{content.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-bright-gray" />
                    <span className="text-bright-gray">Completion:</span>
                    <span className="font-medium text-bright-black">{content.engagement}%</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress value={content.engagement} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Behavior & Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5" />
              User Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userBehavior.map((behavior, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-bright-gray">{behavior.action}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-bright-yellow h-2 rounded-full" 
                        style={{ width: `${(behavior.count / Math.max(...userBehavior.map(b => b.count))) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium text-bright-black w-16 text-right">
                      {behavior.count.toLocaleString()}
                    </span>
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
              Device Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceEngagement.map((device, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-bright-black">{device.device}</h4>
                    <Badge variant="outline">{device.sessions.toLocaleString()} sessions</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-bright-gray">Avg. Duration:</span>
                      <div className="font-medium text-bright-black">{device.avgDuration}</div>
                    </div>
                    <div>
                      <span className="text-bright-gray">Bounce Rate:</span>
                      <div className="font-medium text-bright-black">{device.bounceRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time User Activity
            <Badge className="bg-green-100 text-green-800 animate-pulse">LIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-1">47</div>
              <div className="text-sm text-bright-gray">Active Users</div>
              <div className="text-xs text-green-600 mt-1">+3 in last 5 min</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-1">12</div>
              <div className="text-sm text-bright-gray">Live Sessions</div>
              <div className="text-xs text-blue-600 mt-1">Avg. 4m 23s</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright-black mb-1">3</div>
              <div className="text-sm text-bright-gray">Virtual Tours</div>
              <div className="text-xs text-purple-600 mt-1">2 scheduled</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEngagement;