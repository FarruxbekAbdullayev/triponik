import React from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import { FlightResultsScreen } from './shared/flights/FlightResultsScreen'
import HotelsResultsScreen from './shared/hotels/HotelsResultsScreen'
import './styles/animations.css'
import CarRentResultsScreen from './shared/carrent/CarRentResultsScreen'
import TourResultsScreen from './shared/tours/TourResultsScreen'

/**
 * App.tsx
 * Asosiy marshrutlar: Home, FlightResults demo, HotelsResults demo, CarRentResults demo.
 * animations.css global yuklanadi (global scrollbar yashirish qoidalari bilan).
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightResultsScreen />} />
        <Route path="/hotels" element={<HotelsResultsScreen />} />
        <Route path="/car-rent" element={<CarRentResultsScreen />} />
        <Route path="/tours" element={<TourResultsScreen />} />
      </Routes>
    </HashRouter>
  )
}
