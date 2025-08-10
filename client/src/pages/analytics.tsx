import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye,
  DollarSign,
  Calendar,
  Target,
  Activity,
  Award,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from "lucide-react";
import { format, subDays } from "date-fns";
import AnalyticsChart from "@/components/analytics/analytics-chart";
import MetricsOverview from "@/components/analytics/metrics-overview";
import RevenueAnalytics from "@/components/analytics/revenue-analytics";
import UserEngagement from "@/components/analytics/user-engagement";
import type { BusinessMetric, AnalyticsEvent } from "@shared/schema";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const { data: metrics = [], isLoading: metricsLoading, refetch: refetchMetrics } = useQuery<BusinessMetric[]>({
    queryKey: ["/api/analytics/metrics", timeRange],
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<AnalyticsEvent[]>({
    queryKey: ["/api/analytics/events", timeRange],
  });

  const { data: realtimeData = {}, isLoading: realtimeLoading } = useQuery({
    queryKey: ["/api/analytics/realtime"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const isLoading = metricsLoading || eventsLoading || realtimeLoading;

  // Calculate key metrics
  const totalRevenue = metrics.filter(m => m.metricType === "revenue").reduce((sum, m) => sum + m.value, 0);
  const totalLeads = metrics.filter(m => m.metricType === "leads").reduce((sum, m) => sum + m.value, 0);
  const conversionRate = metrics.find(m => m.metricType === "conversions")?.value || 0;
  const customerSatisfaction = metrics.find(m => m.metricType === "satisfaction")?.value || 0;

  const timeRangeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];

  const getMetricTrend = (currentValue: number, previousValue: number) => {
    if (!previousValue) return { trend: "neutral", percentage: 0 };
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return {
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
      percentage: Math.abs(change)
    };
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-bright-light flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-bright-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-bright-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-bright-black mb-2">Analytics Dashboard</h1>
            <p className="text-bright-gray">Business insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => refetchMetrics()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Real-time Stats */}
        <Card className="mb-8 border-2 border-bright-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-bright-yellow" />
              Real-time Activity
              <Badge className="bg-green-100 text-green-800 animate-pulse">LIVE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-bright-black mb-1">
                  {(realtimeData as any)?.activeUsers || 0}
                </div>
                <div className="text-sm text-bright-gray">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bright-black mb-1">
                  {(realtimeData as any)?.pageViews || 0}
                </div>
                <div className="text-sm text-bright-gray">Page Views (24h)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bright-black mb-1">
                  {(realtimeData as any)?.liveTours || 0}
                </div>
                <div className="text-sm text-bright-gray">Live Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bright-black mb-1">
                  {(realtimeData as any)?.newInquiries || 0}
                </div>
                <div className="text-sm text-bright-gray">New Inquiries</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">Total Revenue</p>
                  <p className="text-2xl font-bold text-bright-black">
                    ${(totalRevenue / 100).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-bright-gray ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">Total Leads</p>
                  <p className="text-2xl font-bold text-bright-black">{totalLeads}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+8.2%</span>
                <span className="text-bright-gray ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">Conversion Rate</p>
                  <p className="text-2xl font-bold text-bright-black">{conversionRate}%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-red-600">-2.1%</span>
                <span className="text-bright-gray ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bright-gray">Satisfaction</p>
                  <p className="text-2xl font-bold text-bright-black">{customerSatisfaction}/5</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+0.3</span>
                <span className="text-bright-gray ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <MetricsOverview metrics={metrics} events={events} />
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-6 mt-6">
            <RevenueAnalytics metrics={metrics} events={events} />
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6 mt-6">
            <UserEngagement events={events} />
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Page Views Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart 
                    data={events.filter(e => e.eventType === "page_view")}
                    dataKey="timestamp"
                    valueKey="properties"
                    title="Daily Page Views"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Top Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: "/", views: 2456, change: "+12%" },
                      { page: "/properties", views: 1890, change: "+8%" },
                      { page: "/services", views: 1234, change: "+15%" },
                      { page: "/about", views: 987, change: "-2%" },
                      { page: "/contact", views: 756, change: "+5%" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-bright-black">{item.page}</div>
                          <div className="text-sm text-bright-gray">{item.views.toLocaleString()} views</div>
                        </div>
                        <Badge className={item.change.startsWith('+') ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {item.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Service Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: "Real Estate", bookings: 45, satisfaction: 4.8 },
                      { service: "Architecture", bookings: 32, satisfaction: 4.9 },
                      { service: "Interior Design", bookings: 28, satisfaction: 4.7 },
                      { service: "Media Production", bookings: 19, satisfaction: 4.6 },
                      { service: "VR Training", bookings: 15, satisfaction: 4.5 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-bright-black">{item.service}</div>
                          <div className="text-sm text-bright-gray">{item.bookings} bookings</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-bright-black">{item.satisfaction}/5</div>
                          <div className="text-sm text-bright-gray">satisfaction</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Goal Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { goal: "Monthly Revenue", current: 85000, target: 100000 },
                      { goal: "New Leads", current: 150, target: 200 },
                      { goal: "Conversion Rate", current: 12.5, target: 15 },
                      { goal: "Customer Satisfaction", current: 4.7, target: 4.8 },
                    ].map((item, index) => {
                      const progress = (item.current / item.target) * 100;
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-bright-black">{item.goal}</span>
                            <span className="text-bright-gray">
                              {item.current.toLocaleString()} / {item.target.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-bright-yellow h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <div className="text-xs text-bright-gray mt-1">
                            {progress.toFixed(1)}% complete
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Avg. Session Duration</span>
                      <span className="font-medium text-bright-black">4m 32s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Bounce Rate</span>
                      <span className="font-medium text-bright-black">32.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Return Visitors</span>
                      <span className="font-medium text-bright-black">68.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Mobile Traffic</span>
                      <span className="font-medium text-bright-black">42.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bright-gray">Email Conversion</span>
                      <span className="font-medium text-bright-black">8.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;