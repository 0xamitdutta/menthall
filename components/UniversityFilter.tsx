"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { universities } from "@/lib/constants";

const UniversityFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [university, setUniversity] = useState(searchParams?.get("university") || "All");

    const handleChange = (value: string) => {
        setUniversity(value);
        const params = new URLSearchParams(searchParams?.toString());
        if (value === "All") {
            params.delete("university");
        } else {
            params.set("university", value);
        }
        router.push(`/search-mentors?${params.toString()}`);
    };

    return (
        <Select onValueChange={handleChange} value={university}>
            <SelectTrigger className="w-[180px] rounded-lg font-medium shadow-sm">
                <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All Universities</SelectItem>
                {universities.map((uni) => (
                    <SelectItem key={uni.value} value={uni.value}>
                        {uni.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default UniversityFilter;
