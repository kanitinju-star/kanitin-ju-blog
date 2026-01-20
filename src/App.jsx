import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { NavBarMain } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { LandingPage } from "./pages/LandingPage"
import { ViewPostPage } from "./pages/ViewPostPage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <header className="w-full">
        <NavBarMain />
      </header>
      <main className="grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <div className="h-20" />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}


export default App
