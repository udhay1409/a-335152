
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Plus, Filter } from "lucide-react";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "Confirmed",
      notes: "Regular checkup"
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      time: "10:30 AM",
      duration: "45 min",
      type: "Follow-up",
      status: "Confirmed",
      notes: "Diabetes management"
    },
    {
      id: 3,
      patientName: "Michael Brown",
      time: "02:00 PM",
      duration: "30 min",
      type: "Consultation",
      status: "Pending",
      notes: "Joint pain assessment"
    },
    {
      id: 4,
      patientName: "Emily Davis",
      time: "03:30 PM",
      duration: "30 min",
      type: "Emergency",
      status: "Urgent",
      notes: "Breathing difficulties"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Urgent": return "bg-red-100 text-red-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency": return "bg-red-500";
      case "Follow-up": return "bg-blue-500";
      case "Consultation": return "bg-medical-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-medical-500" />
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-medical-500 hover:bg-medical-600">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Date Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
            />
            <div className="ml-auto text-sm text-gray-600">
              {appointments.length} appointments scheduled
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-16 rounded-full ${getTypeColor(appointment.type)}`}></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{appointment.patientName}</span>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                      <span>•</span>
                      <span className="font-medium">{appointment.type}</span>
                    </div>
                    <p className="text-sm text-gray-500">{appointment.notes}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button 
                    size="sm" 
                    className={`${
                      appointment.status === 'Confirmed' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-medical-500 hover:bg-medical-600'
                    }`}
                  >
                    {appointment.status === 'Confirmed' ? 'Start Session' : 'Confirm'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              "08:00 AM", "08:30 AM", "11:00 AM", "11:30 AM", 
              "12:00 PM", "01:00 PM", "04:00 PM", "04:30 PM",
              "05:00 PM", "05:30 PM"
            ].map((time) => (
              <Button 
                key={time} 
                variant="outline" 
                size="sm" 
                className="text-center hover:bg-medical-50"
              >
                {time}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
