import Navbar from './components/Navbar.jsx'
import Hero3D from './components/Hero3D.jsx'
import AnimatedHeadline from './components/AnimatedHeadline.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Marquee from './components/Marquee.jsx'
import Programs from './components/Programs.jsx'
import Stats from './components/Stats.jsx'
import Trainers from './components/Trainers.jsx'
import Membership from './components/Membership.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <section className="hero">
        <Hero3D />
        <div className="hero-content">
          <AnimatedHeadline lines={['Train with', 'intent.']} className="hero-title" />
          <p className="hero-sub">
            A coached strength floor in Soro. Four programs, nine coaches, one standard —
            every rep gets watched.
          </p>
          <div className="hero-actions">
            <a href="#membership" className="btn btn-primary">
              See membership
            </a>
            <a href="#contact" className="btn btn-ghost">
              Book a trial
            </a>
          </div>
        </div>
        <div className="hero-scroll-cue">
          <span />
        </div>
      </section>

      <Marquee />
      <Stats />
      <Programs />
      <Trainers />
      <Membership />
      <ContactForm />
      <Footer />
    </div>
  )
}
