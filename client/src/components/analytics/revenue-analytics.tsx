import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  CreditCard,
  Repeat,
  Award
} from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { BusinessMetric, AnalyticsEvent } from "@shared/schema";

interface RevenueAnalyticsProps {
  metrics: BusinessMetric[];
  events: AnalyticsEvent[];
}

const RevenueAnalytics = ({ metrics, events }: RevenueAnalyticsProps) => {
  // Mock revenue data
  const revenueData = {
    totalRevenue: 125000,
    monthlyTarget: 150000,
    growth: 12.5,
    averageOrderValue: 2850,
    recurringRevenue: 45000
  };

  const serviceRevenue = [
    { service: "Real Estate VR", revenue: 45000, percentage: 36, growth: "+15%" },
    { service: "Architecture 3D", revenue: 32000, percentage: 26, growth: "+8%" },
    { service: "Interior Design", revenue: 25000, percentage: 20, growth: "+22%" },
    { service: "Media Production", revenue: 15000, percentage: 12, growth: "+5%" },
    { service: "VR Training", revenue: 8000, percentage: 6, growth: "+35%" }
  ];

  const monthlyTargets = [
    { month: "Jan", target: 120000, actual: 115000 },
    { month: "Feb", target: 125000, actual: 128000 },
    { month: "Mar", target: 130000, actual: 132000 },
    { month: "Apr", target: 135000, actual: 140000 },
    { month: "May", target: 140000, actual: 138000 },
    { month: "Jun", target: 145000, actual: 142000 },
    { month: "Jul", target: 150000, actual: 125000 }
  ];

  const progress = (revenueData.totalRevenue / revenueData.monthlyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Total Revenue</p>
                <p className="text-2xl font-bold text-bright-black">
                  ${revenueData.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+{revenueData.growth}%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Monthly Target</p>
                <p className="text-2xl font-bold text-bright-black">
                  ${revenueData.monthlyTarget.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-bright-gray">Progress</span>
                <span className="text-bright-black">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Avg. Order Value</p>
                <p className="text-2xl font-bold text-bright-black">
                  ${revenueData.averageOrderValue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+8.3%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bright-gray">Recurring Revenue</p>
                <p className="text-2xl font-bold text-bright-black">
                  ${revenueData.recurringRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Repeat className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+18.7%</span>
              <span className="text-bright-gray ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={[]}
              dataKey="date"
              valueKey="revenue"
              title=""
              type="area"
              color="#10B981"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyTargets.slice(-6).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bright-black">{item.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-bright-gray">
                      Target: ${(item.target / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm font-medium text-bright-black">
                      Actual: ${(item.actual / 1000).toFixed(0)}k
                    </div>
                    <Badge className={item.actual >= item.target ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {((item.actual / item.target - 1) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Revenue by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceRevenue.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-bright-black">{service.service}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-bright-gray">
                        ${(service.revenue / 1000).toFixed(0)}k
                      </span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {service.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-bright-yellow h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-bright-gray">
                    {service.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payment Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-bright-gray">Invoices Sent</span>
                <span className="text-lg font-bold text-bright-black">$89,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-bright-gray">Payments Received</span>
                <span className="text-lg font-bold text-green-600">$67,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-bright-gray">Outstanding</span>
                <span className="text-lg font-bold text-yellow-600">$22,300</span>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-bright-black mb-3">Upcoming Payments</h4>
                <div className="space-y-2">
                  {[
                    { client: "Acme Real Estate", amount: 12500, due: "Jul 15" },
                    { client: "Modern Architects", amount: 8900, due: "Jul 20" },
                    { client: "Design Studio Pro", amount: 6700, due: "Jul 25" }
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium text-bright-black">{payment.client}</div>
                        <div className="text-bright-gray">Due {payment.due}</div>
                      </div>
                      <div className="font-medium text-bright-black">
                        ${payment.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalytics;