import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// This component accepts an array of image URLs as a prop
export const CollegeHighlights = ({ imageUrls }: { imageUrls: string[] }) => (
  // 1. I've updated the Card's styling to give it a softer shadow and removed the explicit padding and border to better match the design.
  <Card className="shadow-none rounded-xl border-none">
    {/* 2. The <Carousel> component now wraps the header and content. This is crucial for the controls in the header to work correctly. */}
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      {/* 3. The CardHeader is now a flex container to place the title on the left and the new arrow controls on the right. */}
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-lg font-semibold">
          College highlights
        </CardTitle>

        {/* 4. This div holds the navigation arrows. */}
        <div className="flex items-center gap-2">
          {/* 5. The arrow components are moved here. I've added classes to override their default 'absolute' positioning
               so they fit neatly within the header.
          */}
          <CarouselPrevious className="relative top-auto left-auto right-auto translate-y-0" />
          <CarouselNext className="relative top-auto left-auto right-auto translate-y-0" />
        </div>
      </CardHeader>

      {/* 6. Adjusted padding here to align the carousel images with the header above. */}
      <CardContent className="pl-6">
        <CarouselContent className="-ml-4">
          {imageUrls.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Image
                src={src}
                alt={`College Highlight ${index + 1}`}
                width={300}
                height={200}
                className="rounded-xl object-cover aspect-video" // Increased rounding to match image
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </CardContent>
    </Carousel>
  </Card>
);