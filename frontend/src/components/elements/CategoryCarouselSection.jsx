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
    "AI Engineer",
    "AI Research",
    "Backend Developer",
    "Business Analyst",
    "Cloud Architecture",
    "Cloud Engineer",
    "Cloud Security Analyst",
    "Cybersecurity",
    "Data Engineer",
    "Data Scientist",
    "DevOps Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "Java Developer",
    "Mobile Developer",
    "Monitor Graphics",
    "Project Manager",
    "Python Developer",
    "QA Automation",
    "React Developer",
    "Robotic Engineer",
    "Software QA Engineer",
    "System Analyst",
    "UI/UX Designer",
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
            <CarouselItem key={index} className="flex-none w-1/3 text-center">
              <Button
                onClick={() => handleSearch(cat)}
                variant="outline"
                className="w-full rounded-full"
              >
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
