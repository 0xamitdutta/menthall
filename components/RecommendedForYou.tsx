import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RecommendedMentor } from "@/lib/types";

export const RecommendedForYou = ({ data }: { data: RecommendedMentor[] }) => (
  <Card className="shadow-xl rounded-4xl border-0">
    <CardHeader>
      <CardTitle>Recommended for you</CardTitle>
    </CardHeader>
    <CardContent className="space-y-5">
      {data.map((mentor) => (
        <div key={mentor.name} className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.avatarUrl} alt={mentor.name} />
            <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{mentor.name}</h4>
            <p className="text-sm text-gray-500">{`${mentor.year}, ${mentor.university}`}</p>
            <p className="text-xs text-gray-400">{`${mentor.sessions}+ sessions · ${mentor.reviews}+ reviews`}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);