import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3 } from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { BusinessMetric, AnalyticsEvent } from "@shared/schema";
import { format, subDays } from "date-fns";

interface RevenueAnalyticsProps {
  metrics: BusinessMetric[];
  events: AnalyticsEvent[];
}

const RevenueAnalytics = ({ metrics, events }: RevenueAnalyticsProps) => {
  // Generate sample revenue data
  const generateRevenueData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        timestamp: date.toISOString(),
        properties: Math.floor(Math.random() * 5000) + 2000,
      });
    }
    return data;
  };

  const revenueData = generateRevenueData();
  
  // Service-wise revenue breakdown
  const serviceRevenue = [
    { service: "Real Estate VR Tours", revenue: 45000, percentage: 35, change: "+12%" },
    { service: "Architecture Visualization", revenue: 32000, percentage: 25, change: "+8%" },
    { service: "Interior Design AR", revenue: 28000, percentage: 22, change: "+15%" },
    { service: "Media Production", revenue: 15000, percentage: 12, change: "+5%" },
    { service: "VR Training Programs", revenue: 8000, percentage: 6, change: "-2%" },
  ];

  // Monthly revenue comparison
  const monthlyRevenue = [
    { month: "Jan", revenue: 85000, target: 80000 },
    { month: "Feb", revenue: 92000, target: 85000 },
    { month: "Mar", revenue: 78000, target: 90000 },
    { month: "Apr", revenue: 95000, target: 92000 },
    { month: "May", revenue: 105000, target: 95000 },
    { month: "Jun", revenue: 118000, target: 100000 },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Total Revenue (30d)</p>
                <p className="text-2xl font-bold text-bright-black">$128,450</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Average Deal Size</p>
                <p className="text-2xl font-bold text-bright-black">$3,245</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+8.2%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Monthly Recurring</p>
                <p className="text-2xl font-bold text-bright-black">$42,800</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+15.3%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Revenue Growth</p>
                <p className="text-2xl font-bold text-bright-black">+18.7%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-red-600">-2.1%</span>
              <span className="text-bright-gray ml-1">vs last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Daily Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart
              data={revenueData}
              dataKey="timestamp"
              valueKey="properties"
              title="Daily Revenue"
              type="area"
              color="#10B981"
              height={300}
            />
          </CardContent>
        </Card>

        {/* Monthly Revenue vs Target */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Monthly Revenue vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.map((item, index) => {
                const achievement = (item.revenue / item.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-bright-black">{item.month}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">${(item.revenue / 1000).toFixed(0)}k / ${(item.target / 1000).toFixed(0)}k</div>
                        <Badge className={achievement >= 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {achievement.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${achievement >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.min(achievement, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            Revenue by Service Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceRevenue.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-bright-black">{item.service}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-bright-gray">${(item.revenue / 1000).toFixed(0)}k</span>
                      <Badge className={item.change.startsWith('+') ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-bright-yellow to-yellow-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-bright-gray mt-1">{item.percentage}% of total revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalytics;