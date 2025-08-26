import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import type { Education } from "@/lib/types"; // Import the type

// The component now accepts data as a prop
export const EducationSection = ({ data }: { data: Education[] }) => (
  <Card className="shadow-xl rounded-4xl border-0">
    <CardHeader>
      <CardTitle>Education</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {data.map((edu) => (
        <div key={edu.institution} className="flex items-start space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.year}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);