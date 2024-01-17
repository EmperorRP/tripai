"use client";
import { Autocomplete, Divider, AutocompleteItem, Button, Slider } from '@nextui-org/react';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

type City = {
  city: string;
};

const FilterPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedActivityPerDay, setSelectedActivityPerDay] = useState('1-2');

  const toggleActivitySelection = (activity: string) => {
    setSelectedActivities((prevSelectedActivities) =>
      prevSelectedActivities.includes(activity)
        ? prevSelectedActivities.filter((a) => a !== activity)
        : [...prevSelectedActivities, activity]
    );
  };
  
  const activities = ["Outdoor", "Indoor", "Kid Friendly", "Relaxation", "Romantic", "Cultural", "Shopping"];
  const activitiesPerDayOptions = ['1-2', '3-4', '4+'];
  const cuisines = ["Local", "Continental", "American", "Arabic", "Mexican", "Indian"];
  const foodTypes = ["Vegetarian", "Vegan", "Non-vegetarian", "Halal"];
  const mealsIncluded = ["Breakfast", "Lunch", "Snacks", "Dinner"];
  const accomodationTypes = ["Hostel", "Hotel", "Apartment", "Resorts"];
  const specificAmenities = ["Free Breakfast", "WiFi", "Gyms", "Spa", "Swimming Pool"];



  const fetchCities = async (query: string) => {
    if (query.length < 3) {
      setCityOptions([]);
      return;
    }
    try {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');
      const matchingCities = response.data.data.filter((item: any) =>
        item.city.toLowerCase().startsWith(query.toLowerCase())
      );
      setCityOptions(matchingCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (value: string) => {
    fetchCities(value);
  };

  const handleSelectionChange = (value: string | number) => {
    if (typeof value === 'string') {
      setSelectedCity(value);
    }
  };

  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const increment = () => {
    setNumberOfPersons((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setNumberOfPersons((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };


  return (
    <main className='flex flex-col flex-grow items-center pt-8 min-h-screen'>
      <div className='flex flex-col items-center w-full max-w-lg px-4'>
        <div className="w-full text-lg text-left mb-4"> 
          Destination
        </div>
        <div className="w-full mb-6"> 
          <Autocomplete
            className='w-full border-2 shadow bg-white' 
            placeholder="Type a city"
            onSelectionChange={handleSelectionChange}
            onInputChange={handleInputChange}
            value={selectedCity}
          >
            {cityOptions.map((city, index) => (
              <AutocompleteItem key={index} value={city.city} className="bg-white">
                {city.city}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        
        <div className='w-full flex justify-between'> 
          <div className='flex flex-col w-1/2 pr-2'>
            <label htmlFor='start-date' className='text-lg'>Start Date</label>
            <DatePicker 
              id='start-date'
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className='form-input border-2 shadow w-full rounded-lg p-2'
            />
          </div>
          <div className='flex flex-col w-1/2 pl-2'>
            <label htmlFor='end-date' className='text-lg'>End Date</label>
            <DatePicker 
              id='end-date'
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className='form-input border-2 shadow w-full rounded-lg p-2'
            />
          </div>
        </div>
        <div className="w-full text-lg text-left mb-3 mt-4">
          Budget
        </div>
        <div className="w-full mb-6">
          <Slider 
            label="Price Range"
            step={50} 
            minValue={200} 
            maxValue={5000} 
            defaultValue={[100, 500]} 
            formatOptions={{style: "currency", currency: "USD"}}
            className="custom-blue max-w-md"
          />
        </div>

        <div className="w-full text-lg text-left mb-3 mt-4">Persons traveling</div>
        <div className="w-full flex gap-2 mb-6">
          <Button
            onClick={decrement}
            className="border-2 border-gray-400 text-gray-600 rounded-md px-3 py-1"
            disabled={numberOfPersons <= 1}
          >
            -
          </Button>
          <div className="border-2 border-gray-400 text-center rounded-md px-4 py-1">
            {numberOfPersons}
          </div>
          <Button
            onClick={increment}
            className="border-2 border-gray-400 text-gray-600 rounded-md px-3 py-1"
          >
            +
          </Button>
        </div>


        <div className="w-full text-lg text-left mb-3 mt-4">Activities</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {activities.map((activity) => (
            <Button
              key={activity}
              className={`${
                selectedActivities.includes(activity)
                  ? "bg-custom-blue text-white"
                  : "bg-transparent text-current"
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(activity)}
            >
              {activity}
            </Button>          
          ))}
        </div>

        

        <div className="w-full text-lg text-left mb-3 mt-4">Activities per day</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {activitiesPerDayOptions.map((option) => (
            <button
              key={option}
              className={`${
                selectedActivityPerDay === option
                  ? "bg-custom-blue text-white" 
                  : "bg-transparent text-gray-600"
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1 transition duration-300 ease-in-out`}
              onClick={() => setSelectedActivityPerDay(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="w-full font-bold text-lg text-left mb-3 mt-4">Food</div>
        <div className="w-full text-lg text-left">Cuisine</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine}
              className={`${
                selectedActivities.includes(cuisine)
                  ? "bg-custom-blue text-white" 
                  : "bg-transparent text-current" 
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(cuisine)}
            >
              {cuisine}
            </Button>          
          ))}
        </div>

        <div className="w-full text-lg text-left">Food Types</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {foodTypes.map((foodType) => (
            <Button
              key={foodType}
              className={`${
                selectedActivities.includes(foodType)
                  ? "bg-custom-blue text-white" 
                  : "bg-transparent text-current"
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(foodType)}
            >
              {foodType}
            </Button>          
          ))}
        </div>

        <div className="w-full text-lg text-left">Meals Included</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {mealsIncluded.map((meal) => (
            <Button
              key={meal}
              className={`${
                selectedActivities.includes(meal)
                  ? "bg-custom-blue text-white"
                  : "bg-transparent text-current"
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(meal)}
            >
              {meal}
            </Button>          
          ))}
        </div>


        <div className="w-full font-bold text-lg text-left mb-3 mt-4">Accomodation</div>
        <div className="w-full text-lg text-left">Type</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {accomodationTypes.map((accomodationType) => (
            <Button
              key={accomodationType}
              className={`${
                selectedActivities.includes(accomodationType)
                  ? "bg-custom-blue text-white" 
                  : "bg-transparent text-current" 
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(accomodationType)}
            >
              {accomodationType}
            </Button>          
          ))}
        </div>
        
        <div className="w-full text-lg text-left">Specific Amenities</div>
        <div className="w-full flex flex-wrap gap-2 mb-6">
          {specificAmenities.map((specificAmenity) => (
            <Button
              key={specificAmenity}
              className={`${
                selectedActivities.includes(specificAmenity)
                  ? "bg-custom-blue text-white" 
                  : "bg-transparent text-current" 
              } rounded-lg border-2 hover:bg-custom-blue hover:text-white p-3 m-1`}
              onClick={() => toggleActivitySelection(specificAmenity)}
            >
              {specificAmenity}
            </Button>          
          ))}
        </div>
        <div className='flex justify-end'>
            <Button className='rounded-lg p-3 m-1 mb-4 border-2 border-custom-blue'>
                Search
            </Button> 
        </div>
      </div>
    </main>
  );
};

export default FilterPage;
