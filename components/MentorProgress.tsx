import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Clock } from "lucide-react";

export const MentorProgress = () => (
  <Card className="shadow-xl rounded-4xl border-0">
    <CardHeader>
      <CardTitle>Mentor&apos;s Progress</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-full"><Briefcase className="h-6 w-6 text-blue-600" /></div>
        <div>
          <p className="text-xl font-bold">25</p>
          <p className="text-sm text-gray-500">Sessions completed</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-purple-50 p-3 rounded-full"><Clock className="h-6 w-6 text-purple-600" /></div>
        <div>
          <p className="text-xl font-bold">975 hrs</p>
          <p className="text-sm text-gray-500">Total mentoring time</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-50 p-3 rounded-full"><Award className="h-6 w-6 text-yellow-600" /></div>
        <div>
          <p className="text-xl font-bold">80</p>
          <p className="text-sm text-gray-500">Total Coins</p>
        </div>
      </div>
    </CardContent>
  </Card>
);