// import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
  } from "../ui/carousel";
  import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
  
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (query.trim() === "") return;
        dispatch(setSearchQuery(query));
        navigate("/browse");
        console.log("Search term submitted:", query);
      };
  
    return (
      <div>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent className="flex">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex-none w-1/3 text-center"
              >
                <Button onClick = {() => handleSearch(cat)}
                variant="outline" className="w-full rounded-full">
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