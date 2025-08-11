import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Target } from "lucide-react";
import AnalyticsChart from "./analytics-chart";
import type { BusinessMetric, AnalyticsEvent } from "@shared/schema";
import { format, subDays } from "date-fns";

interface MetricsOverviewProps {
  metrics: BusinessMetric[];
  events: AnalyticsEvent[];
}

const MetricsOverview = ({ metrics, events }: MetricsOverviewProps) => {
  // Generate sample chart data for the last 30 days
  const generateChartData = (eventType: string) => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        timestamp: date.toISOString(),
        properties: Math.floor(Math.random() * 100) + 50, // Sample data
      });
    }
    return data;
  };

  const revenueData = generateChartData("revenue");
  const trafficData = generateChartData("page_view");
  const leadsData = generateChartData("lead_generated");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Revenue Trend
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
            height={250}
          />
        </CardContent>
      </Card>

      {/* Website Traffic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Website Traffic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart
            data={trafficData}
            dataKey="timestamp"
            valueKey="properties"
            title="Daily Visitors"
            type="line"
            color="#3B82F6"
            height={250}
          />
        </CardContent>
      </Card>

      {/* Lead Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Lead Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart
            data={leadsData}
            dataKey="timestamp"
            valueKey="properties"
            title="Daily Leads"
            type="bar"
            color="#8B5CF6"
            height={250}
          />
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-yellow-600" />
            Key Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                label: "Monthly Revenue Growth",
                value: "12.5%",
                trend: "up",
                target: "15%",
                current: 12.5,
                targetValue: 15
              },
              {
                label: "Lead Conversion Rate",
                value: "8.2%",
                trend: "up",
                target: "10%",
                current: 8.2,
                targetValue: 10
              },
              {
                label: "Customer Satisfaction",
                value: "4.7/5",
                trend: "up",
                target: "4.8/5",
                current: 4.7,
                targetValue: 4.8
              },
              {
                label: "Service Booking Rate",
                value: "15.3%",
                trend: "down",
                target: "18%",
                current: 15.3,
                targetValue: 18
              }
            ].map((kpi, index) => {
              const progress = (kpi.current / kpi.targetValue) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-bright-black">{kpi.label}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={kpi.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {kpi.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {kpi.value}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-bright-gray">
                    <span>Target: {kpi.target}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : progress >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;