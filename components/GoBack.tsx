
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GoBack() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-4 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200"
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
}
