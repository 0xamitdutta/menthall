import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, Clock, Video } from "lucide-react";

interface Session {
    name: string;
    year: string;
    institution: string;
    department: string;
    date: string;
    time: string;
    isUpcoming: boolean;
}

const BookingCard = ({ name, year, institution, department, date, time, isUpcoming }: Session) => (
    <Card className="mb-4">
        <CardContent className="p-4 px-6">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
                        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold mb-2">{name}</h3>
                        <p className="text-sm text-gray-500 mb-1">{year}, {institution}</p>
                        <p className="text-sm text-gray-500">{department}</p>

                    </div>
                </div>
                <Button variant="outline">View profile</Button>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date}
                </div>
                <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                </div>
                <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Video Call</span>
                </div>
            </div>
            <div className="mt-4 flex space-x-2">
                {isUpcoming ? (
                    <div className="flex space-x-6">
                        <Button variant="default" className="w-[120px] cursor-pointer">Reschedule</Button>
                        <Button variant="destructive" className="w-[120px] cursor-pointer">Cancel</Button>
                    </div>
                ) : (
                    <>
                        <Button variant="default" className="flex-1 cursor-pointer">Book again</Button>
                    </>
                )}
            </div>
        </CardContent>
    </Card>
);

export default BookingCard