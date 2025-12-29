import { NavBarMain, HeroSection, ArticleSelection, Footer } from './components/Maincomponent'
function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <header className="w-full">
        <NavBarMain />
      </header>
      <main className="grow">
        <HeroSection />
        <ArticleSelection />
        <div className="h-20" />
      </main>
      <Footer />
    </div>
  )
}

export default App
