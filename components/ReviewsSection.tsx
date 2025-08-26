import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

export const ReviewsSection = ({ data }: { data: Review[] }) => (
  // 1. Main card is now borderless with a soft shadow.
  <Card className="shadow-none rounded-xl border-none">
    {/* 2. Carousel provider wraps the header and content. */}
    <Carousel opts={{ align: "start" }} className="w-full">
      {/* 3. Header uses flexbox to position the title and new controls. */}
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-lg font-semibold">Reviews</CardTitle>
        <div className="flex items-center gap-2">
          {/* 4. Controls are moved here with styles reset. */}
          <CarouselPrevious className="relative top-auto left-auto right-auto translate-y-0" />
          <CarouselNext className="relative top-auto left-auto right-auto translate-y-0" />
        </div>
      </CardHeader>

      <CardContent className="pl-6">
        <CarouselContent className="-ml-4">
          {data.map((review) => (
            <CarouselItem
              key={review.name}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              {/* 5. Styled the inner card for each review to match the image. */}
              <Card className="h-full flex flex-col border border-gray-200 rounded-xl shadow-none ">
                <CardContent className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 mb-4">
                      {/* 6. Improved star logic to show both filled and unfilled stars. */}
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      &quot;{review.text}&quot;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-auto pt-4 border-t border-gray-100">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatarUrl} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.school}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </CardContent>
    </Carousel>
  </Card>
);
