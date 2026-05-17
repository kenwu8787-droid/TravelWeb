import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TripView from './pages/TripView';
import Itinerary from './pages/Itinerary';
import Expenses from './pages/Expenses';
import Tools from './pages/Tools';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent font-sans text-theme-text max-w-md mx-auto shadow-lg overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trip/:tripId" element={<TripView />}>
            <Route index element={<Itinerary />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="tools" element={<Tools />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
