import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar, X } from 'lucide-react';
import { mockTrips } from '../mockData';
import { useTripMemory } from '../hooks/useTripMemory';

export default function Home() {
  const { setLastViewedTrip } = useTripMemory();
  const navigate = useNavigate();
  
  const [trips, setTrips] = useState(mockTrips);
  const [activeTag, setActiveTag] = useState('All');
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripTheme, setNewTripTheme] = useState('camping');

  const tags = ['All', 'Japan', 'Korea', 'Taiwan', 'Europe'];

  const filteredTrips = activeTag === 'All' 
    ? trips 
    : trips.filter(trip => trip.tags && trip.tags.includes(activeTag));

  const handleTripClick = (tripId) => {
    setLastViewedTrip(tripId);
    navigate(`/trip/${tripId}`);
  };

  const handleAddTrip = (e) => {
    e.preventDefault();
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: newTripTitle || 'New Trip',
      theme: newTripTheme,
      destination: newTripDestination || 'Unknown',
      tags: [newTripDestination],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      itinerary: [],
      expenses: []
    };
    
    // Add to mockData array so TripView can find it
    mockTrips.push(newTrip);
    
    // Update local state
    setTrips([...trips, newTrip]);
    
    // Reset and close
    setNewTripTitle('');
    setNewTripDestination('');
    setNewTripTheme('camping');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-10 relative">
      {/* iOS-style Header */}
      <header className="pt-14 pb-4 px-6 bg-white shadow-sm sticky top-0 z-10 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Trips</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-transform active:scale-95"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Tags Filter Row */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-medium transition-colors text-sm ${
                activeTag === tag
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Trip Cards List */}
      <main className="px-5 mt-6 space-y-5">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => handleTripClick(trip.id)}
              className={`bg-white rounded-[2rem] p-5 cursor-pointer active:scale-[0.98] transform duration-200 ${trip.theme === 'pokemon' ? 'border-2 border-gameDark shadow-game hover:shadow-game-sm translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0 transition-all' : 'shadow-sm hover:shadow-md transition-shadow'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {trip.title}
                </h2>
              </div>
              
              <div className="space-y-2 mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-blue-500" />
                  <span className="font-medium text-gray-700">{trip.destination}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-500" />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>No trips found for this category.</p>
          </div>
        )}
      </main>

      {/* Add Trip Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-slide-up sm:animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Trip</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddTrip} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                <input 
                  type="text" 
                  value={newTripTitle}
                  onChange={(e) => setNewTripTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Summer Vacation"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input 
                  type="text" 
                  value={newTripDestination}
                  onChange={(e) => setNewTripDestination(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Japan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Theme</label>
                <select 
                  value={newTripTheme}
                  onChange={(e) => setNewTripTheme(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="camping">Camping Warm</option>
                  <option value="pokemon">Pokémon Pixel</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold rounded-xl py-3 shadow-md hover:bg-blue-600 active:scale-[0.98] transition-transform"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
