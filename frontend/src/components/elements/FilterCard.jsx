// import React from 'react'
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    options: ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune"],
  },
  {
    filterType: "Industry",
    options: [
      "Frontend Developer", "Backend Developer", "Full Stack Developer",
      "Data Scientist", "Graphic Designer", "UI/UX Designer",
      "Project Manager", "Mobile Developer", "DevOps Engineer", "Cybersecurity",
    ],
  },
  {
    filterType: "Salary",
    options: ["0-10k", "10-60k", "1-5 Lakh"],
  },
];

function FilterCard() {
  return (
    <div className="p-4 bg-white border rounded-md shadow-sm ">
      <h1 className="mb-4 text-xl font-semibold">Filter Options</h1>
      <hr className="mb-4"/>

      {filterData.map((filter, index) => (
        <div key={index} className="mb-6">
          <h2 className="mb-2 text-lg font-medium">{filter.filterType}</h2>
          <RadioGroup>
            {filter.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2 space-x-2">
                <RadioGroupItem value={option} id={option} /> 
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
