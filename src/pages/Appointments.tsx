
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppointmentDialog from "@/components/appointments/AppointmentDialog";
import FilterDialog from "@/components/appointments/FilterDialog";

const Appointments = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filters, setFilters] = useState({ status: [], type: [], timeRange: "all" });
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      patientPhone: "+1-555-0123",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "Confirmed",
      notes: "Regular checkup",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      patientPhone: "+1-555-0124",
      time: "10:30 AM",
      duration: "45 min",
      type: "Follow-up",
      status: "Confirmed",
      notes: "Diabetes management",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      patientName: "Michael Brown",
      patientPhone: "+1-555-0125",
      time: "02:00 PM",
      duration: "30 min",
      type: "Consultation",
      status: "Pending",
      notes: "Joint pain assessment",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      patientName: "Emily Davis",
      patientPhone: "+1-555-0126",
      time: "03:30 PM",
      duration: "30 min",
      type: "Emergency",
      status: "Urgent",
      notes: "Breathing difficulties",
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Urgent": return "bg-red-100 text-red-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-gray-100 text-gray-800";
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

  const handleSaveAppointment = (appointmentData: any) => {
    if (appointmentData.id && appointments.find(a => a.id === appointmentData.id)) {
      setAppointments(prev => prev.map(a => a.id === appointmentData.id ? appointmentData : a));
      toast({
        title: "Appointment Updated",
        description: "The appointment has been successfully updated."
      });
    } else {
      setAppointments(prev => [...prev, appointmentData]);
      toast({
        title: "Appointment Scheduled",
        description: "New appointment has been successfully scheduled."
      });
    }
  };

  const handleConfirmAppointment = (appointmentId: number) => {
    setAppointments(prev => prev.map(a => 
      a.id === appointmentId ? { ...a, status: "Confirmed" } : a
    ));
    toast({
      title: "Appointment Confirmed",
      description: "The appointment has been confirmed."
    });
  };

  const handleStartSession = (appointmentId: number) => {
    setAppointments(prev => prev.map(a => 
      a.id === appointmentId ? { ...a, status: "In Progress" } : a
    ));
    toast({
      title: "Session Started",
      description: "The appointment session has begun."
    });
  };

  const handleReschedule = (appointmentId: number) => {
    toast({
      title: "Reschedule Appointment",
      description: "Opening reschedule dialog...",
    });
  };

  const handleTimeSlotClick = (time: string) => {
    toast({
      title: "Time Slot Selected",
      description: `Selected time: ${time}. Click 'New Appointment' to schedule.`
    });
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    toast({
      title: "Filters Applied",
      description: "Appointment list has been filtered."
    });
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (appointment.date !== selectedDate) return false;
    
    if (filters.status.length > 0 && !filters.status.includes(appointment.status)) return false;
    if (filters.type.length > 0 && !filters.type.includes(appointment.type)) return false;
    
    if (filters.timeRange !== "all") {
      const hour = parseInt(appointment.time.split(':')[0]);
      const isPM = appointment.time.includes('PM');
      const hour24 = isPM && hour !== 12 ? hour + 12 : hour;
      
      switch (filters.timeRange) {
        case "morning":
          if (hour24 < 8 || hour24 >= 12) return false;
          break;
        case "afternoon":
          if (hour24 < 12 || hour24 >= 17) return false;
          break;
        case "evening":
          if (hour24 < 17 || hour24 >= 20) return false;
          break;
      }
    }
    
    return true;
  });

  const availableTimeSlots = [
    "08:00 AM", "08:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "01:00 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-medical-500" />
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        </div>
        <div className="flex gap-2">
          <FilterDialog onApplyFilters={handleApplyFilters} currentFilters={filters} />
          <AppointmentDialog mode="create" onSave={handleSaveAppointment} />
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
              {filteredAppointments.length} appointments scheduled
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReschedule(appointment.id)}
                  >
                    Reschedule
                  </Button>
                  {appointment.status === 'Pending' && (
                    <Button 
                      size="sm" 
                      className="bg-medical-500 hover:bg-medical-600"
                      onClick={() => handleConfirmAppointment(appointment.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                  )}
                  {appointment.status === 'Confirmed' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStartSession(appointment.id)}
                    >
                      Start Session
                    </Button>
                  )}
                  {appointment.status === 'Urgent' && (
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleStartSession(appointment.id)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Handle Urgent
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500 mb-4">No appointments match your current filters for this date.</p>
              <AppointmentDialog mode="create" onSave={handleSaveAppointment} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {availableTimeSlots.map((time) => (
              <Button 
                key={time} 
                variant="outline" 
                size="sm" 
                className="text-center hover:bg-medical-50"
                onClick={() => handleTimeSlotClick(time)}
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
