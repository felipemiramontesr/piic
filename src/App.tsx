import Header from './sections/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Features from './sections/Features'
import Process from './sections/Process'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import './App.css'

function App() {
    return (
        <div className="app-wrapper">
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Features />
                <Process />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
