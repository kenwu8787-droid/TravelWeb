import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Clock, StickyNote } from 'lucide-react';

export default function Itinerary() {
  const { trip } = useOutletContext();
  
  // Group itinerary by date
  const groupedItinerary = trip.itinerary.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedItinerary).sort();

  return (
    <div className="p-5 space-y-8">
      {sortedDates.map((date, index) => (
        <section key={date}>
          <div className="sticky top-0 bg-[#F2F2F7]/90 backdrop-blur-md z-10 py-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Day {index + 1} <span className="text-sm font-normal text-gray-500 ml-2">{new Date(date).toLocaleDateString()}</span>
            </h2>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {groupedItinerary[date].sort((a, b) => a.time.localeCompare(b.time)).map((item) => (
              <div key={item.id} className="relative flex items-start gap-4">
                {/* Timeline Dot */}
                {trip.theme === 'pokemon' ? (
                  <div className="pokeball-node"></div>
                ) : (
                  <div className="triangle-icon"></div>
                )}
                
                {/* Time Column */}
                <div className="flex flex-col items-center pl-10 pr-2 pt-1 w-[90px] shrink-0">
                  <span className="text-sm font-bold text-gray-700">{item.time}</span>
                </div>

                {/* Card */}
                <div className={`rounded-2xl p-4 shadow-sm w-full border border-gray-100 hover:shadow-md transition-shadow ${trip.theme === 'pokemon' ? 'card-grass border-gameDark' : 'bg-white'}`}>
                  {trip.theme === 'pokemon' && (
                    <>
                      <div className="cloud-overlay opacity-30"></div>
                      <div className="grass-overlay"></div>
                    </>
                  )}
                  <div className="relative z-10">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                      {item.activity}
                    </h3>
                    
                    {item.location && (
                      <p className="text-sm text-gray-700 mb-2 flex items-center">
                        <span className="font-medium text-gray-900">Location:</span> 
                        <span className="ml-1">{item.location}</span>
                      </p>
                    )}
                    
                    {item.notes && (
                      <div className={`rounded-xl p-3 text-sm flex items-start mt-3 ${trip.theme === 'pokemon' ? 'bg-white/70 text-gray-800 border border-gameDark/20' : 'bg-blue-50 text-blue-800'}`}>
                        <StickyNote size={16} className={`shrink-0 mr-2 mt-0.5 ${trip.theme === 'pokemon' ? 'text-gameDark' : 'text-blue-500'}`} />
                        <p>{item.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
