
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

interface ScheduleDialogProps {
  patient: any;
  trigger?: React.ReactNode;
}

const ScheduleDialog = ({ patient, trigger }: ScheduleDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "",
    doctor: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Appointment Scheduled",
        description: `Appointment for ${patient.name} has been scheduled for ${formData.date} at ${formData.time}.`,
      });
      setIsLoading(false);
      setIsOpen(false);
      setFormData({ date: "", time: "", type: "", doctor: "", notes: "" });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-medical-500 hover:bg-medical-600">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-medical-500" />
            Schedule Appointment
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium">{patient.name}</p>
          <p className="text-sm text-gray-600">{patient.age} years old • {patient.gender}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="checkup">Regular Checkup</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Preferred Doctor</Label>
            <Select value={formData.doctor} onValueChange={(value) => setFormData(prev => ({ ...prev, doctor: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Smith (Cardiology)</SelectItem>
                <SelectItem value="dr-johnson">Dr. Johnson (General Medicine)</SelectItem>
                <SelectItem value="dr-brown">Dr. Brown (Orthopedics)</SelectItem>
                <SelectItem value="dr-davis">Dr. Davis (Neurology)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes for the appointment..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.date || !formData.time || !formData.type}
              className="bg-medical-500 hover:bg-medical-600"
            >
              {isLoading ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
