import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import PortfolioForm from "./pages/PortfolioForm"
import PortfolioDetails from "./pages/PortfolioDetails"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<PortfolioForm />} />
        <Route path="/portfolio/:id" element={<PortfolioDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
