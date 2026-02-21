"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    revenue: 4000,
    expenses: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    expenses: 1398,
  },
  {
    name: "Mar",
    revenue: 9800,
    expenses: 2000,
  },
  {
    name: "Apr",
    revenue: 3908,
    expenses: 2780,
  },
  {
    name: "May",
    revenue: 4800,
    expenses: 1890,
  },
  {
    name: "Jun",
    revenue: 3800,
    expenses: 2390,
  },
  {
    name: "Jul",
    revenue: 4300,
    expenses: 3490,
  },
]

export function Overview() {
  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        expenses: {
          label: "Expenses",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
