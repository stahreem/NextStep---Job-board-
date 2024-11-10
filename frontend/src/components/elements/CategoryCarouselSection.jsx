// import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "../ui/carousel";
  import { Button } from "../ui/button";
  
  function CategoryCarouselSection() {
    const category = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "Graphic Designer",
      "UI/UX Designer",
      "Project Manager",
      "Mobile Developer",
      "DevOps Engineer",
      "Cybersecurity",
    ];
  
    return (
      <div>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent className="flex">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex-none w-1/3 text-center"
              >
                <Button variant="outline" className="w-full rounded-full">
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
  
  export default CategoryCarouselSection;