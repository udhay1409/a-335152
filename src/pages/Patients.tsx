
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, Phone, Mail, Calendar, Shield } from "lucide-react";
import ABHAModal from "@/components/patients/ABHAModal";
import ABHAStatus from "@/components/patients/ABHAStatus";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Active",
      abhaId: "12-3456-7890-1234",
      abhaVerified: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@email.com",
      lastVisit: "2024-01-20",
      condition: "Diabetes",
      status: "Active",
      abhaId: "98-7654-3210-9876",
      abhaVerified: false
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "m.brown@email.com",
      lastVisit: "2024-01-18",
      condition: "Arthritis",
      status: "Recovery"
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 321-0987",
      email: "emily.davis@email.com",
      lastVisit: "2024-01-22",
      condition: "Asthma",
      status: "Active",
      abhaId: "11-2233-4455-6677",
      abhaVerified: true
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.abhaId && patient.abhaId.includes(searchTerm))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Recovery": return "bg-blue-100 text-blue-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-medical-500" />
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
        </div>
        <Button className="bg-medical-500 hover:bg-medical-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients by name, condition, or ABHA ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{patient.name}</CardTitle>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{patient.age} years old • {patient.gender}</p>
              
              {/* ABHA Status */}
              <div className="flex items-center justify-between mt-2">
                <ABHAStatus 
                  abhaId={patient.abhaId} 
                  verified={patient.abhaVerified}
                />
                {!patient.abhaId && (
                  <ABHAModal
                    trigger={
                      <Button variant="outline" size="sm" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Add ABHA
                      </Button>
                    }
                    patientId={patient.id}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-700">Primary Condition</p>
                <p className="text-sm text-medical-600">{patient.condition}</p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-medical-500 hover:bg-medical-600">
                  Schedule
                </Button>
              </div>

              {/* ABHA Actions */}
              {patient.abhaId && (
                <div className="flex gap-2 pt-1">
                  <ABHAModal
                    trigger={
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Manage ABHA
                      </Button>
                    }
                    patientId={patient.id}
                    existingABHA={patient.abhaId}
                  />
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    View Records
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or add a new patient.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Patients;
