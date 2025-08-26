"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { specializations } from "@/lib/constants";

const SpecializationFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [specialization, setSpecialization] = useState(searchParams?.get("specialization") || "All");

  const handleChange = (value: string) => {
    setSpecialization(value);
    const params = new URLSearchParams(searchParams?.toString());
    if (value === "All") {
      params.delete("specialization");
    } else {
      params.set("specialization", value);
    }
    router.push(`/search-mentors?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleChange} value={specialization}>
      <SelectTrigger className="w-[180px] rounded-lg font-medium shadow-sm">
        <SelectValue placeholder="Specialization" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Specializations</SelectItem>
        {specializations.map((spec) => (
          <SelectItem key={spec.value} value={spec.value}>
            {spec.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SpecializationFilter;
