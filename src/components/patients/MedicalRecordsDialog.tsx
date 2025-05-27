
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, User, Pill, TestTube, Download } from "lucide-react";

interface MedicalRecordsDialogProps {
  patient: any;
  trigger?: React.ReactNode;
}

const MedicalRecordsDialog = ({ patient, trigger }: MedicalRecordsDialogProps) => {
  // Mock medical records data
  const medicalRecords = {
    visits: [
      {
        id: 1,
        date: "2024-01-15",
        doctor: "Dr. Smith",
        diagnosis: "Routine checkup",
        treatment: "Blood pressure monitoring",
        notes: "Patient showing improvement in BP control"
      },
      {
        id: 2,
        date: "2024-01-10",
        doctor: "Dr. Johnson",
        diagnosis: "Hypertension follow-up",
        treatment: "Medication adjustment",
        notes: "Increased dosage of Lisinopril"
      }
    ],
    prescriptions: [
      {
        id: 1,
        date: "2024-01-15",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        doctor: "Dr. Smith",
        status: "Active"
      },
      {
        id: 2,
        date: "2024-01-10",
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        doctor: "Dr. Johnson",
        status: "Completed"
      }
    ],
    labResults: [
      {
        id: 1,
        date: "2024-01-15",
        test: "Blood Pressure",
        result: "135/85 mmHg",
        range: "Normal: <120/80",
        status: "High"
      },
      {
        id: 2,
        date: "2024-01-15",
        test: "Blood Sugar",
        result: "95 mg/dL",
        range: "Normal: 70-100",
        status: "Normal"
      },
      {
        id: 3,
        date: "2024-01-10",
        test: "Cholesterol",
        result: "180 mg/dL",
        range: "Normal: <200",
        status: "Normal"
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "Active": "bg-green-100 text-green-800",
      "Completed": "bg-blue-100 text-blue-800",
      "High": "bg-red-100 text-red-800",
      "Normal": "bg-green-100 text-green-800",
      "Low": "bg-yellow-100 text-yellow-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Records
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-medical-500" />
            Medical Records - {patient.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="visits" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visits">Medical Visits</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
          </TabsList>

          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Medical Visits History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {visit.date}
                        </TableCell>
                        <TableCell>{visit.doctor}</TableCell>
                        <TableCell>{visit.diagnosis}</TableCell>
                        <TableCell>{visit.treatment}</TableCell>
                        <TableCell className="max-w-xs truncate">{visit.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Prescription History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.prescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {prescription.date}
                        </TableCell>
                        <TableCell>{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.frequency}</TableCell>
                        <TableCell>{prescription.doctor}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(prescription.status)}>
                            {prescription.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Laboratory Results
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Reference Range</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicalRecords.labResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {result.date}
                        </TableCell>
                        <TableCell>{result.test}</TableCell>
                        <TableCell className="font-medium">{result.result}</TableCell>
                        <TableCell className="text-sm text-gray-600">{result.range}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(result.status)}>
                            {result.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordsDialog;
