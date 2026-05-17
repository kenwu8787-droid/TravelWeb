import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useTripMemory() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only attempt to redirect if we are exactly on the root page
    if (location.pathname === '/') {
      const lastTripId = localStorage.getItem('lastViewedTripId');
      // Check location.state to see if we explicitly navigated back to home
      if (lastTripId && !location.state?.fromTrip) {
        navigate(`/trip/${lastTripId}`, { replace: true });
      }
    }
  }, [navigate, location]);

  const setLastViewedTrip = (tripId) => {
    localStorage.setItem('lastViewedTripId', tripId);
  };

  const clearLastViewedTrip = () => {
    localStorage.removeItem('lastViewedTripId');
  };

  return { setLastViewedTrip, clearLastViewedTrip };
}
