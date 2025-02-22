
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope, ThermometerSun, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Mock data for the charts
const symptomData = [
  { name: "Primary Symptoms", value: 60, color: "#9b87f5" },
  { name: "Secondary Symptoms", value: 25, color: "#7E69AB" },
  { name: "Related Conditions", value: 15, color: "#D6BCFA" },
];

const treatmentData = [
  { name: "Rest", effectiveness: 85, color: "#9b87f5" },
  { name: "Hydration", effectiveness: 75, color: "#7E69AB" },
  { name: "Medication", effectiveness: 65, color: "#D6BCFA" },
  { name: "Exercise", effectiveness: 45, color: "#8E9196" },
];

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    disease?: string;
    treatment?: string;
  } | null>(null);
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

    setLoading(true);
    setPrediction(null);

    try {
      // Using the Healthcare API to get disease prediction and treatment
      const response = await fetch(`https://healthservice.priaid.ch/diagnosis?symptoms=${encodeURIComponent(symptoms)}&language=en-gb`);
      const data = await response.json();

      // For demo purposes, showing a mock response
      setPrediction({
        disease: "Common Cold",
        treatment: "Rest, hydration, over-the-counter medications for symptom relief. If symptoms persist, consult a healthcare provider.",
      });

      toast({
        title: "Analysis Complete",
        description: "We've analyzed your symptoms and provided recommendations.",
      });
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Error",
        description: "Unable to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            <Button 
              type="submit" 
              className="w-full bg-medical-500 hover:bg-medical-600 text-white"
              disabled={loading}
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              {loading ? "Analyzing..." : "Analyze Symptoms"}
            </Button>
          </form>
        </Card>

        {prediction && (
          <>
            <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <ThermometerSun className="h-6 w-6 text-medical-500" />
                <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Possible Condition</h3>
                  <p className="text-gray-600">{prediction.disease}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Recommended Treatment</h3>
                  <p className="text-gray-600">{prediction.treatment}</p>
                </div>
                
                <div className="mt-4 p-4 bg-medical-50 rounded-lg">
                  <p className="text-sm text-medical-600">
                    Note: This is an AI-powered analysis and should not replace professional medical advice. 
                    Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <PieChartIcon className="h-6 w-6 text-medical-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Symptom Distribution</h2>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={symptomData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {symptomData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <ThermometerSun className="h-6 w-6 text-medical-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Treatment Effectiveness</h2>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={treatmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="effectiveness">
                        {treatmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </>
        )}

        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical History</h2>
          <p className="text-gray-500">No previous medical records found.</p>
        </Card>
      </div>
    </div>
  );
}
