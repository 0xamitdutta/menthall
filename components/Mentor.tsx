'use client'
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Heart, Star, GraduationCap, MessageSquareText } from 'lucide-react';
import { type Mentor as MentorType } from '@/types/Mentor.types';

// The component expects the properties of a Mentor, but also some that are not yet in the type definition.
// We'll define them as optional here.
interface MentorComponentProps extends MentorType {
    specialization?: string;
    year_of_study?: string;
    num_of_sessions?: number;
    num_of_reviews?: number;
    average_rating?: number;
}

const MentorComponent = ({
    users,
    college_name,
    specialization,
    year_of_study,
    num_of_sessions,
    num_of_reviews,
    average_rating,
}: MentorComponentProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Use a default image if profile picture is not available
    const imageUrl = users.profile_picture_url || "/profiles/profile1.jpg";

    return (
        <Card className="p-4 relative border border-border shadow-lg rounded-2xl transition-all hover:shadow-xl hover:border-foreground">

            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-4">
                <Image src={imageUrl} alt={users.full_name} fill className="object-cover rounded-xl" />
            </div>

            <CardContent className="px-0">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-xl">{users.full_name}</span>
                    <div className="flex flex-col gap-0.5 text-muted-foreground">
                        <div className="flex items-center text-sm gap-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>{college_name}</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            {year_of_study && <span className="text-sm">{year_of_study}</span>}
                            {year_of_study && specialization && <span>•</span>}
                            {specialization && <span className="text-sm">{specialization}</span>}
                        </div>
                    </div>
                </div>
                <div className="my-3 border-t border-border" />
                <div className="flex items-center justify-between">
                    {average_rating ? (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="star fill-rating stroke-rating" />
                            <span className="text-sm">{average_rating} / 5</span>
                        </div>
                    ): <div/>}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        {num_of_sessions ? (
                            <>
                                <MessageSquareText className="w-4 h-4" />
                                <span>{num_of_sessions} sessions</span>
                            </>
                        ): null}
                        {num_of_reviews ? <span>({num_of_reviews} reviews)</span>: null}
                    </div>
                </div>
                <span
                    className="absolute top-6 right-6 rounded-full p-2 bg-background shadow-md cursor-pointer transition hover:bg-muted text-muted-foreground"
                    onClick={() => setIsFavorite((prev) => !prev)}
                >
                    <Heart className={`heart ${isFavorite ? 'fill-destructive stroke-destructive' : 'fill-none stroke-muted-foreground'}`} />
                </span>
            </CardContent>
        </Card>
    );
};

export default MentorComponent;
