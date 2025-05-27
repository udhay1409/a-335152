
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, User } from "lucide-react";

interface PatientFormDialogProps {
  trigger?: React.ReactNode;
  patient?: any;
  onSuccess?: () => void;
}

const PatientFormDialog = ({ trigger, patient, onSuccess }: PatientFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    condition: patient?.condition || "",
    allergies: patient?.allergies?.join(", ") || "",
    emergencyContact: patient?.emergencyContact || "",
    emergencyPhone: patient?.emergencyPhone || "",
    address: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: patient ? "Patient Updated" : "Patient Added",
        description: `${formData.name} has been ${patient ? "updated" : "added"} successfully.`,
      });
      setIsLoading(false);
      setIsOpen(false);
      onSuccess?.();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-medical-500 hover:bg-medical-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-medical-500" />
            {patient ? "Edit Patient" : "Add New Patient"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Primary Condition</Label>
            <Input
              id="condition"
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
              placeholder="Enter primary condition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              value={formData.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
              placeholder="Enter allergies (comma separated)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                placeholder="Emergency contact name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                placeholder="Emergency phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter full address"
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
              disabled={isLoading || !formData.name || !formData.age || !formData.phone}
              className="bg-medical-500 hover:bg-medical-600"
            >
              {isLoading ? "Saving..." : patient ? "Update Patient" : "Add Patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientFormDialog;
