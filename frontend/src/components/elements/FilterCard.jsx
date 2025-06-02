import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchQuery } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const filterData = [
  {
    filterType: "Location",
    options: [
      "Hyderabad",
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Pune",
    ],
  },
  {
    filterType: "Industry",
    options: [
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
    ],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandle = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="sticky top-24 ">
      <div className="p-4 bg-white border rounded-md shadow-sm">
        <h1 className="mb-4 text-xl font-semibold">Filter Options</h1>
        <hr className="mb-4" />
        <Button
          variant="destructive"
          onClick={() => {
            setSelectedValue("");
            dispatch(setSearchQuery(""));
          }}
          className="mt-1 mb-2 w-50"
        >
          Clear Filters
        </Button>
        {filterData.map((filter, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-lg font-medium">{filter.filterType}</h2>

            <RadioGroup value={selectedValue} onValueChange={changeHandle}>
              {filter.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center mb-2 space-x-2"
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;
