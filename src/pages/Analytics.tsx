import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart } from "@/components/ui/charts";

const Analytics = () => {
  const revenueTrendData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
    { month: "May", revenue: 55000, expenses: 36000 },
    { month: "Jun", revenue: 67000, expenses: 42000 },
  ];

  const departmentPerformanceData = [
    { department: "Cardiology", patients: 245, revenue: 125000, satisfaction: 4.8 },
    { department: "Orthopedics", patients: 189, revenue: 98000, satisfaction: 4.6 },
    { department: "Neurology", patients: 156, revenue: 87000, satisfaction: 4.7 },
    { department: "Pediatrics", patients: 201, revenue: 76000, satisfaction: 4.9 },
    { department: "Emergency", patients: 298, revenue: 112000, satisfaction: 4.5 },
  ];

  const appointmentStatusData = [
    { name: "Completed", count: 156, color: "#10B981" },
    { name: "Scheduled", count: 89, color: "#3B82F6" },
    { name: "Cancelled", count: 23, color: "#EF4444" },
    { name: "No Show", count: 12, color: "#F59E0B" },
  ];

  const wardOccupancyData = [
    { ward: "ICU", total: 20, occupied: 18 },
    { ward: "General Ward A", total: 40, occupied: 32 },
    { ward: "General Ward B", total: 40, occupied: 28 },
    { ward: "Pediatric Ward", total: 25, occupied: 15 },
    { ward: "Maternity Ward", total: 30, occupied: 22 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Insights into hospital performance and operations</p>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={revenueTrendData}
            xAxisKey="month"
            yAxisKey="revenue"
            tooltipFormatter={(value) => `$${value}`}
          />
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              Total Revenue: ${revenueTrendData.reduce((sum, item) => sum + item.revenue, 0)}
            </div>
            <div className="text-sm text-gray-600">
              Total Expenses: ${revenueTrendData.reduce((sum, item) => sum + item.expenses, 0)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={departmentPerformanceData}
            xAxisKey="department"
            yAxisKey="revenue"
            tooltipFormatter={(value) => `$${value}`}
          />
          <div className="mt-4">
            {departmentPerformanceData.map((item) => (
              <div key={item.department} className="flex justify-between items-center text-sm text-gray-600">
                <span>{item.department}</span>
                <span>Revenue: ${item.revenue}, Satisfaction: {item.satisfaction}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <PieChart data={appointmentStatusData} dataKey="count" nameKey="name" colors={appointmentStatusData.map(item => item.color)} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {appointmentStatusData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-right">
                        <div className="font-semibold">{item.count}</div>
                        <div className="text-sm text-gray-600">
                          {((Number(item.count) / appointmentStatusData.reduce((sum, i) => sum + Number(i.count), 0)) * 100).toFixed(1)}%
                        </div>
                      </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ward Occupancy */}
      <Card>
        <CardHeader>
          <CardTitle>Ward Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wardOccupancyData.map((ward) => (
              <div key={ward.ward}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{ward.ward}</span>
                  <span className="text-sm text-gray-600">
                    {ward.occupied}/{ward.total} ({Math.round((Number(ward.occupied) / Number(ward.total)) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-medical-500 h-2 rounded-full" 
                    style={{ width: `${(Number(ward.occupied) / Number(ward.total)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
