import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { ChevronLeft, Map, Receipt, Wrench } from 'lucide-react';
import { useTripMemory } from '../hooks/useTripMemory';
import { mockTrips } from '../mockData';

export default function TripView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId } = useParams();
  const { clearLastViewedTrip } = useTripMemory();

  const trip = mockTrips.find(t => t.id === tripId) || mockTrips[0];

  useEffect(() => {
    if (trip.theme === 'pokemon') {
      document.documentElement.classList.add('theme-pokemon');
    } else {
      document.documentElement.classList.remove('theme-pokemon');
    }

    return () => {
      document.documentElement.classList.remove('theme-pokemon');
    };
  }, [trip.theme]);

  const handleBack = () => {
    clearLastViewedTrip();
    // Pass state to prevent auto-redirecting back to this trip
    navigate('/', { state: { fromTrip: true } });
  };

  const currentPath = location.pathname;

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F7]">
      {/* iOS-style Top Header with Frosted Glass */}
      <header className="sticky top-0 z-20 pt-14 pb-4 px-4 bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center text-blue-500 hover:text-blue-600 active:opacity-70 transition-opacity"
          >
            <ChevronLeft size={24} />
            <span className="font-medium text-lg">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate px-4 flex-1 text-center">
            {trip.title || trip.theme}
          </h1>
          <div className="w-[60px]"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <Outlet context={{ trip }} />
      </main>

      {/* iOS-style Bottom Navigation Bar with Frosted Glass */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-4 pb-8 z-20 rounded-t-[2rem]">
        <div className="flex justify-between items-center">
          <Link 
            to="" 
            className={`flex flex-col items-center space-y-1 ${currentPath.endsWith(tripId) || currentPath.endsWith(tripId + '/') ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Map size={24} />
            <span className="text-[10px] font-medium">Itinerary</span>
          </Link>
          <Link 
            to="expenses" 
            className={`flex flex-col items-center space-y-1 ${currentPath.includes('/expenses') ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Expenses</span>
          </Link>
          <Link 
            to="tools" 
            className={`flex flex-col items-center space-y-1 ${currentPath.includes('/tools') ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Wrench size={24} />
            <span className="text-[10px] font-medium">Tools</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
