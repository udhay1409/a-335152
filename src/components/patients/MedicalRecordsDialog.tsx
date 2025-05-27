
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Calendar, 
  User, 
  Pill, 
  TestTube, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Printer,
  Share,
  Archive,
  Eye
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface MedicalRecordsDialogProps {
  patient: any;
  trigger?: React.ReactNode;
}

const MedicalRecordsDialog = ({ patient, trigger }: MedicalRecordsDialogProps) => {
  const [editingVisit, setEditingVisit] = useState<number | null>(null);
  const [editingPrescription, setEditingPrescription] = useState<number | null>(null);
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  // Mock medical records data
  const [medicalRecords, setMedicalRecords] = useState({
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
  });

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

  const handleDeleteVisit = (visitId: number) => {
    setMedicalRecords(prev => ({
      ...prev,
      visits: prev.visits.filter(visit => visit.id !== visitId)
    }));
  };

  const handleDeletePrescription = (prescriptionId: number) => {
    setMedicalRecords(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter(prescription => prescription.id !== prescriptionId)
    }));
  };

  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report for ${patient.name}`);
    // Implementation for downloading reports
  };

  const handlePrintReport = (type: string) => {
    console.log(`Printing ${type} report for ${patient.name}`);
    // Implementation for printing reports
  };

  const handleShareReport = (type: string) => {
    console.log(`Sharing ${type} report for ${patient.name}`);
    // Implementation for sharing reports
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
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-medical-500" />
              Medical Records - {patient.name}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handlePrintReport('all')}>
                <Printer className="h-4 w-4 mr-2" />
                Print All
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownloadReport('all')}>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShareReport('all')}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Medical Visits History
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => setShowAddVisit(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Visit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport('visits')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddVisit && (
                  <Card className="mb-4 border-dashed border-2 border-medical-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Visit</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Doctor</label>
                          <Input placeholder="Dr. Name" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Diagnosis</label>
                        <Input placeholder="Enter diagnosis" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Treatment</label>
                        <Input placeholder="Enter treatment" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea placeholder="Enter additional notes" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save Visit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowAddVisit(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditingVisit(visit.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Visit Record</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this visit record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteVisit(visit.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Prescription History
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => setShowAddPrescription(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Prescription
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport('prescriptions')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddPrescription && (
                  <Card className="mb-4 border-dashed border-2 border-medical-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Prescription</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Doctor</label>
                          <Input placeholder="Dr. Name" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Medication</label>
                          <Input placeholder="Medication name" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Dosage</label>
                          <Input placeholder="e.g., 10mg" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Frequency</label>
                          <Input placeholder="e.g., Twice daily" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save Prescription
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowAddPrescription(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditingPrescription(prescription.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Archive className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this prescription record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeletePrescription(prescription.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
                  <div className="flex items-center gap-2">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lab Result
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport('labs')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePrintReport('labs')}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
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
                      <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
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
