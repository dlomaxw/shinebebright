"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, BarChart3, PieChart } from "lucide-react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function FinancialReports() {
  const [timeRange, setTimeRange] = useState("year")
  const [reportFormat, setReportFormat] = useState("pdf")

  const incomeStatementData = [
    { category: "Revenue", amount: 771000 },
    { category: "Cost of Services", amount: 487000 },
    { category: "Gross Profit", amount: 284000, isBold: true },
    { category: "Operating Expenses", amount: 0, isHeader: true },
    { category: "Salaries & Benefits", amount: 145000 },
    { category: "Rent & Utilities", amount: 36000 },
    { category: "Marketing & Advertising", amount: 28000 },
    { category: "Software & Subscriptions", amount: 18000 },
    { category: "Professional Services", amount: 12000 },
    { category: "Other Expenses", amount: 15000 },
    { category: "Total Operating Expenses", amount: 254000, isBold: true },
    { category: "Operating Income", amount: 30000, isBold: true },
    { category: "Other Income/(Expenses)", amount: 0, isHeader: true },
    { category: "Interest Income", amount: 2000 },
    { category: "Interest Expense", amount: -5000 },
    { category: "Total Other Income/(Expenses)", amount: -3000, isBold: true },
    { category: "Net Income", amount: 27000, isBold: true, isTotal: true },
  ]

  const balanceSheetData = {
    assets: [
      { category: "Current Assets", amount: 0, isHeader: true },
      { category: "Cash & Cash Equivalents", amount: 125000 },
      { category: "Accounts Receivable", amount: 85000 },
      { category: "Prepaid Expenses", amount: 12000 },
      { category: "Total Current Assets", amount: 222000, isBold: true },
      { category: "Non-Current Assets", amount: 0, isHeader: true },
      { category: "Property & Equipment", amount: 65000 },
      { category: "Less: Accumulated Depreciation", amount: -25000 },
      { category: "Intangible Assets", amount: 15000 },
      { category: "Total Non-Current Assets", amount: 55000, isBold: true },
      { category: "Total Assets", amount: 277000, isBold: true, isTotal: true },
    ],
    liabilities: [
      { category: "Current Liabilities", amount: 0, isHeader: true },
      { category: "Accounts Payable", amount: 35000 },
      { category: "Accrued Expenses", amount: 18000 },
      { category: "Deferred Revenue", amount: 22000 },
      { category: "Total Current Liabilities", amount: 75000, isBold: true },
      { category: "Non-Current Liabilities", amount: 0, isHeader: true },
      { category: "Long-term Debt", amount: 45000 },
      { category: "Total Non-Current Liabilities", amount: 45000, isBold: true },
      { category: "Total Liabilities", amount: 120000, isBold: true },
      { category: "Equity", amount: 0, isHeader: true },
      { category: "Owner's Capital", amount: 130000 },
      { category: "Retained Earnings", amount: 27000 },
      { category: "Total Equity", amount: 157000, isBold: true },
      { category: "Total Liabilities & Equity", amount: 277000, isBold: true, isTotal: true },
    ],
  }

  const cashFlowData = [
    { category: "Cash Flow from Operating Activities", amount: 0, isHeader: true },
    { category: "Net Income", amount: 27000 },
    { category: "Adjustments for non-cash items:", amount: 0, isSubHeader: true },
    { category: "Depreciation & Amortization", amount: 12000 },
    { category: "Changes in Working Capital:", amount: 0, isSubHeader: true },
    { category: "Decrease/(Increase) in Accounts Receivable", amount: -15000 },
    { category: "Decrease/(Increase) in Prepaid Expenses", amount: -2000 },
    { category: "Increase/(Decrease) in Accounts Payable", amount: 8000 },
    { category: "Increase/(Decrease) in Accrued Expenses", amount: 5000 },
    { category: "Increase/(Decrease) in Deferred Revenue", amount: 10000 },
    { category: "Net Cash from Operating Activities", amount: 45000, isBold: true },
    { category: "Cash Flow from Investing Activities", amount: 0, isHeader: true },
    { category: "Purchase of Property & Equipment", amount: -18000 },
    { category: "Purchase of Intangible Assets", amount: -5000 },
    { category: "Net Cash from Investing Activities", amount: -23000, isBold: true },
    { category: "Cash Flow from Financing Activities", amount: 0, isHeader: true },
    { category: "Proceeds from Long-term Debt", amount: 20000 },
    { category: "Repayment of Long-term Debt", amount: -10000 },
    { category: "Owner's Withdrawals", amount: -15000 },
    { category: "Net Cash from Financing Activities", amount: -5000, isBold: true },
    { category: "Net Increase/(Decrease) in Cash", amount: 17000, isBold: true },
    { category: "Cash at Beginning of Period", amount: 108000 },
    { category: "Cash at End of Period", amount: 125000, isBold: true, isTotal: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Financial Reports</h3>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reportFormat} onValueChange={setReportFormat}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Income Statement
            </CardTitle>
            <CardDescription>Profit and loss report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <Calendar className="mr-1 inline-block h-4 w-4" />
                Year to Date
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Balance Sheet
            </CardTitle>
            <CardDescription>Assets, liabilities, and equity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <Calendar className="mr-1 inline-block h-4 w-4" />
                As of June 30, 2023
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Cash Flow Statement
            </CardTitle>
            <CardDescription>Cash inflows and outflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <Calendar className="mr-1 inline-block h-4 w-4" />
                Year to Date
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList>
          <TabsTrigger value="income">Income Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
              <CardDescription>For the year ended December 31, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeStatementData.map((item, index) => (
                    <TableRow key={index} className={item.isHeader ? "bg-muted/50" : ""}>
                      <TableCell
                        className={`${item.isBold ? "font-bold" : ""} ${item.isHeader ? "font-semibold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                      >
                        {item.category}
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.isBold ? "font-bold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                      >
                        {item.isHeader ? "" : `$${item.amount.toLocaleString()}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of December 31, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-lg font-medium">Assets</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceSheetData.assets.map((item, index) => (
                        <TableRow key={index} className={item.isHeader ? "bg-muted/50" : ""}>
                          <TableCell
                            className={`${item.isBold ? "font-bold" : ""} ${item.isHeader ? "font-semibold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                          >
                            {item.category}
                          </TableCell>
                          <TableCell
                            className={`text-right ${item.isBold ? "font-bold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                          >
                            {item.isHeader ? "" : `$${item.amount.toLocaleString()}`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h4 className="mb-4 text-lg font-medium">Liabilities & Equity</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceSheetData.liabilities.map((item, index) => (
                        <TableRow key={index} className={item.isHeader ? "bg-muted/50" : ""}>
                          <TableCell
                            className={`${item.isBold ? "font-bold" : ""} ${item.isHeader ? "font-semibold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                          >
                            {item.category}
                          </TableCell>
                          <TableCell
                            className={`text-right ${item.isBold ? "font-bold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                          >
                            {item.isHeader ? "" : `$${item.amount.toLocaleString()}`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>For the year ended December 31, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashFlowData.map((item, index) => (
                    <TableRow key={index} className={item.isHeader ? "bg-muted/50" : ""}>
                      <TableCell
                        className={`${item.isBold ? "font-bold" : ""} ${item.isHeader ? "font-semibold" : ""} ${item.isSubHeader ? "pl-6 italic text-muted-foreground" : ""} ${item.isTotal ? "text-lg" : ""}`}
                      >
                        {item.category}
                      </TableCell>
                      <TableCell
                        className={`text-right ${item.isBold ? "font-bold" : ""} ${item.isTotal ? "text-lg" : ""}`}
                      >
                        {item.isHeader || item.isSubHeader ? "" : `$${item.amount.toLocaleString()}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
