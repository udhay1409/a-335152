
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { stethoscope } from "lucide-react";

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Implement actual symptom analysis
    toast({
      title: "Processing",
      description: "Analyzing your symptoms...",
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-medical-50 to-medical-100">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Symptom Analysis</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Describe your symptoms</label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms in detail..."
                className="min-h-[200px] resize-none"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600 text-white">
              <stethoscope className="mr-2 h-5 w-5" />
              Analyze Symptoms
            </Button>
          </form>
        </Card>

        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical History</h2>
          <p className="text-gray-500">No previous medical records found.</p>
        </Card>
      </div>
    </div>
  );
}
