"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  CardBody,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItineraryMap from "@/components/ItineraryMap";

export default function ItineraryPage() {
  // Need support for more currencies (probably should use some json with all currencies)
  const items = [
    {
      key: "usd",
      label: "$ USD",
    },
    {
      key: "copy",
      label: "₹ INR",
    },
  ];
  

  return (
    <main className="flex flex-col lg:flex-row h-screen">
      {/* {itineraryData && itineraryData.map(day => (
            // Render each day's activities, meals, etc.
        ))} */}
      {/* Left side content */}
      <div className="flex-grow lg:w-1/2 p-4 lg:p-6 overflow-auto">
        {/* Currency dropdown and city name */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">TOKYO</h1>
          <Dropdown>
            <DropdownTrigger>
              <Button className="border-gray-300 text-gray-700 hover:border-gray-400">
                Currency
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Currency Options" items={items}>
              {(item) => (
                <DropdownItem key={item.key}>{item.label}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* General information */}
        <div className="text-sm mb-4">
          <p>Temperature: 23 C</p>
          <p>Weather: Sunny, slight rain</p>
          <p>Political: Stable</p>
        </div>
        <Divider className="border-black" />

        {/* Description and Tabs */}
        <p>
          Tokyo, Japan’s busy capital, mixes the ultramodern and the
          traditional, from neon-lit skyscrapers to historic temples. The
          opulent Meiji Shinto Shrine is known for its towering gate and
          surrounding woods.
        </p>
        <Divider className="border-black" />

        <Tabs className="w-full">
          <TabsList>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="mytrip">My Trip</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="pt-4">
            <div className="relative mt-6">
              {/* Timeline container with the custom class */}
              <div className="timeline">
                {/* Timeline item 1 */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full h-4 w-4 bg-[#71C9CE]"></div>
                  <div className="flex flex-row justify-between flex-1">
                    <p className="text-lg">Fly to Tokyo using Indigo</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#A6E3E9] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#8bd0d9] transition-colors"
                      >
                        Book Now
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#EBFF9A] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#d7eb8f] transition-colors"
                      >
                        Alternatives
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline item 2 */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full h-4 w-4 bg-[#71C9CE]"></div>
                  <div className="flex flex-row justify-between flex-1">
                    <p className="text-lg">Book cab at the airport</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#A6E3E9] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#8bd0d9] transition-colors"
                      >
                        Book Now
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#EBFF9A] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#d7eb8f] transition-colors"
                      >
                        Alternatives
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline item 3 */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full h-4 w-4 bg-[#71C9CE]"></div>
                  <div className="flex flex-row justify-between flex-1">
                    <p className="text-lg">Reach Hotel Ginza</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#A6E3E9] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#8bd0d9] transition-colors"
                      >
                        Book Now
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#EBFF9A] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#d7eb8f] transition-colors"
                      >
                        Alternatives
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Day 1</h2>
              <div className="border p-4 rounded-lg shadow-sm flex flex-col lg:flex-row justify-between items-center bg-white">
                <div className="flex-grow">
                  <div className="flex lg:space-x-4 items-center mb-2">
                    <h3 className="font-bold text-md mr-2 lg:mr-0">
                      Tokyo SkyTree
                    </h3>
                    <div className="flex-grow lg:flex-grow-0 bg-[#C7D0FF] rounded-full px-2 py-1 text-xs font-light text-gray-700">
                      Observation Deck
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">Show on map</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>9:00am - 10:00am</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 my-1">
                    <span>$38</span>
                  </div>
                  <p className="text-sm">
                    Tokyo Skytree is a broadcasting and observation tower in
                    Sumida, Tokyo.
                  </p>
                </div>
                <div className="flex space-x-2 mt-4 lg:mt-0">
                  <Button
                    size="sm"
                    className="bg-[#A6E3E9] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#8bd0d9] transition-colors"
                  >
                    Book Now
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#EBFF9A] text-black px-2 py-1 rounded-sm font-medium hover:bg-[#d7eb8f] transition-colors"
                  >
                    Alternatives
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="mytrip" className="pt-4">
            Change your My Trip here.
          </TabsContent>
        </Tabs>
        <div></div>
      </div>
      {/* Right side - Map view */}
      <div className="hidden lg:block lg:w-1/2 h-64 lg:h-screen bg-gray-200 p-4">
        {/* Map implementation goes here */}
        <ItineraryMap></ItineraryMap>
      </div>
    </main>
  );
}
