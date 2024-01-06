"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface Itinerary {
  id: number;
  country: string;
  cost: number;
  time: string;
  places_visited: string[];
  profile_pic: string;
  username: string;
  people: number;
}

async function getItinerary(): Promise<Itinerary[]> {
  const result = await fetch("http://localhost:3001/itineraries");

  return result.json();
}

export default function Home() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Fetch itineraries
  useEffect(() => {
    async function fetchItineraries() {
      const result = await fetch("http://localhost:3001/itineraries");
      const data = await result.json();
      setItineraries(data);
    }
    fetchItineraries();
  }, []);

  const imageWidth = 3584;
  const scrollSpeed = 200;
  const duration = imageWidth / scrollSpeed;

  const imageHeight = windowWidth < 768 ? '56.25vw' : '50vh';

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);
    updateWindowWidth();

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prevOffset => {
        const newOffset = prevOffset - 1;
        return newOffset <= -imageWidth ? 0 : newOffset;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [imageWidth]);

  return (
    <div>
      {/* Scrolling image container */}
      <div style={{ overflow: 'hidden', width: '100%', height: imageHeight }}>
        <motion.div
          animate={{ x: offset }}
          transition={{ duration: duration, ease: "linear" }}
          style={{
            display: 'flex',
            width: 'auto',
            height: '100%' // Ensure the images fill the container height
          }}
        >
          <img src="/Cities1.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities2.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities1.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities2.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities1.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities2.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities1.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
          <img src="/Cities2.png" alt="Scrolling Cities" style={{ width: `${imageWidth}px`, height: '100%' }} />
        </motion.div>
      </div>

      {/* Centered text and form container */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-center md:space-x-10 p-8">
        {/* Text section */}
        <div className="md:flex md:flex-1 md:flex-col md:justify-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Plan your next trip.</h1>
          <p className="text-xl md:text-2xl mb-2 font-bold text-custom-blue">With AI.</p>
          <h1 className="text-xl md:text-3xl mb-2">Discover. Plan. Explore.</h1>
          <p>Your next adventure is just a few clicks away. With <span className='text-custom-blue font-bold'>TripAI</span>, dive into a seamless world of personalized travel planning.</p>
        </div>
        
        {/* Form section */}
        <div className="md:flex md:flex-1 md:flex-col md:justify-center md:items-end">
          <h2 className="text-xl md:text-2xl font-bold text-custom-blue mb-4 my-3">Where do you want to go?</h2>
          <div className="w-full max-w-md">
            <div className="flex items-center border-b border-custom-blue py-2">
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Location" aria-label="Full name" />
              <button className="flex-shrink-0 bg-custom-blue hover:bg-teal-500 border-custom-blue hover:border-teal-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Let's go!
              </button>
              <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                Randomize
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col p-8 '>
        <h2 className='text-xl my-1'>Check out other people's itineraries</h2>
        {itineraries.map(itinerary => (
            <Card key={itinerary.id} className={`my-2 p-4 border-2 border-custom-blue ${itinerary.id === 1 ? 'bg-card-glow glow' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-1 items-center">
                <div className="col-span-1 sm:col-span-1 flex justify-center sm:justify-start">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{itinerary.username.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>                
                <div className="col-span-1 text-center sm:text-left">
                  <CardDescription>{itinerary.username}</CardDescription>
                  <CardTitle>{itinerary.country}</CardTitle>
                </div>
                <div className="col-span-1 text-center sm:text-left">
                  <CardDescription>{itinerary.people} pax</CardDescription>
                  <CardDescription>{itinerary.time}</CardDescription>
                </div>
                <div className="col-span-1 text-center sm:text-left">
                  <CardDescription>{itinerary.places_visited.join(', ')}</CardDescription>
                </div>
                <div className="col-span-1 text-center sm:text-left">
                  <CardDescription>Cost ${itinerary.cost}</CardDescription>
                </div>
              </div>
            </Card>          
        ))}
      </div>
    </div>
  );
}