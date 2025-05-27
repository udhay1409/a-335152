
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Blood Test Results",
      patient: "John Smith",
      date: "2024-01-20",
      type: "Lab Report",
      status: "Completed",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "X-Ray Chest",
      patient: "Sarah Johnson",
      date: "2024-01-19",
      type: "Imaging",
      status: "Reviewed",
      size: "5.1 MB"
    },
    {
      id: 3,
      title: "ECG Report",
      patient: "Michael Brown",
      date: "2024-01-18",
      type: "Cardiac",
      status: "Pending Review",
      size: "1.2 MB"
    },
    {
      id: 4,
      title: "MRI Brain Scan",
      patient: "Emily Davis",
      date: "2024-01-17",
      type: "Imaging",
      status: "Completed",
      size: "12.8 MB"
    },
    {
      id: 5,
      title: "Diabetes Panel",
      patient: "Robert Wilson",
      date: "2024-01-16",
      type: "Lab Report",
      status: "Abnormal",
      size: "1.8 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Reviewed": return "bg-blue-100 text-blue-800";
      case "Pending Review": return "bg-yellow-100 text-yellow-800";
      case "Abnormal": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Lab Report": return "🧪";
      case "Imaging": return "📱";
      case "Cardiac": return "❤️";
      default: return "📄";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-medical-500" />
          <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
        </div>
        <Button className="bg-medical-500 hover:bg-medical-600">
          Generate Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">134</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">15</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">7</div>
            <div className="text-sm text-gray-600">Abnormal</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getTypeIcon(report.type)}</div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{report.patient}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{report.date}</span>
                      </div>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
