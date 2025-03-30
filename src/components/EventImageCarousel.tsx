
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface EventImageCarouselProps {
  mainImage: string;
  additionalImages?: string[];
  title: string;
}

const EventImageCarousel: React.FC<EventImageCarouselProps> = ({ 
  mainImage, 
  additionalImages = [], 
  title 
}) => {
  const allImages = [mainImage, ...additionalImages].filter(Boolean);
  
  // If there's only one image, just show it without carousel controls
  if (allImages.length <= 1) {
    return (
      <div className="rounded-xl overflow-hidden mb-8">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default EventImageCarousel;
