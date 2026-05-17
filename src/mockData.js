export const mockTrips = [
  {
  id: "trip-kanto-2026",
  title: "Kanto Theme Park & Street Dance Tour",
  theme: "pokemon",
  destination: "Japan",
  tags: ["Japan"],
  startDate: "2026-07-03",
  endDate: "2026-07-05",
  itinerary: [
    {
      id: "it-1",
      date: "2026-07-03",
      time: "10:00",
      activity: "Visit PokéPark KANTO",
      location: "Kanto",
      notes: "Buy tickets in advance",
    },
    {
      id: "it-2",
      date: "2026-07-05",
      time: "14:00",
      activity: "Take EVA Air flight BR107 back to Kaohsiung",
      location: "Narita Airport",
      notes: "Terminal 1",
    }
  ],
  expenses: [
    {
      id: "exp-1",
      date: "2026-07-03",
      category: "Transport",
      amount: 5000,
      currency: "JPY",
      description: "Suica reload",
    },
    {
      id: "exp-2",
      date: "2026-07-03",
      category: "Entertainment",
      amount: 8500,
      currency: "JPY",
      description: "Theme park tickets",
    },
    {
      id: "exp-3",
      date: "2026-07-04",
      category: "Food",
      amount: 1500,
      currency: "JPY",
      description: "McDonald's",
    },
    {
      id: "exp-4",
      date: "2026-07-04",
      category: "Food",
      amount: 1200,
      currency: "JPY",
      description: "Turkey Rice",
    }
  ]
  }
];
