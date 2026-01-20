import { NavBarMain } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { LandingPage } from "./pages/LandingPage"

function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <header className="w-full">
        <NavBarMain />
      </header>
      <main className="grow">
        <LandingPage />
        <div className="h-20" />
      </main>
      <Footer />
    </div>
  )
}


export default App
