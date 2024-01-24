"use client";
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"; 

// TypeScript interfaces
interface Activity {
  name: string;
  time: string;
  location: string;
  cost: number;
}

interface MealOption {
  name: string; // Adjusted to match your JSON structure
  cuisine: string;
  location: string;
  time: string;
  cost: number;
}

interface DayItinerary {
  date: string;
  activities: Activity[];
  meals: MealOption[];
}

interface ItineraryData {
  trip_dates: { start_date: string; end_date: string };
  budget: { minimum_amount: string; maximum_amount: string };
  travelers: number;
  accommodation: { type: string; amenities: string[] };
  preferences: { activities: string[]; cuisine: string[]; meals: string[] };
  itinerary: { [key: string]: DayItinerary };
}

const ItineraryPage: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);

  useEffect(() => {
    // Retrieve the itinerary data from local storage
    const data = localStorage.getItem('itineraryData');
    if (data) {
      console.log("Retrieved data:", data);
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);
        if (parsedData && parsedData.itinerary) {
          setItineraryData(parsedData);
        } else {
          console.error("Itinerary data is missing from the retrieved data");
          // Handle missing data, maybe set an error or redirect
        }
      } catch (error) {
        console.error("Error parsing itinerary data:", error);
        // Handle parsing error
      }
    } else {
      console.error("No itinerary data found in local storage");
      // Handle no data, maybe set an error or redirect
    }
  }, []);

  if (!itineraryData || !itineraryData.itinerary) {
    return <div>Error: Itinerary data is missing or incorrect.</div>;
  }

  // Extract the itinerary days into an array
  const itineraryDays = Object.entries(itineraryData.itinerary).map(([key, value]) => ({
    date: value.date,
    activities: value.activities,
    meals: value.meals
  }));

  return (
    <div className=" flex flex-col flex-grow min-h-screen container mx-auto p-4">
      {itineraryDays.map((day: DayItinerary, index: number) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={`day-${index}`}>
            <AccordionTrigger><div className="flex justify-between w-full">
                <span>{`Day ${index + 1}`}</span>
                <span>{day.date}</span>
              </div></AccordionTrigger>
            <AccordionContent>
              {/* Activities Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  {day.activities.map((activity: Activity, idx: number) => (
                    <div key={idx} className="mb-4">
                      <p className="font-bold">{activity.name}</p>
                      <p>{activity.time} - {activity.location}</p>
                      <Badge variant="outline">${activity.cost}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Meals Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  {day.meals.map((meal: MealOption, idx: number) => (
                    <div key={idx} className="mb-4">
                      <p className="font-bold">{meal.name} - {meal.cuisine}</p>
                      <p>{meal.time} - {meal.location}</p>
                      <Badge variant="outline">${meal.cost}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default ItineraryPage;
