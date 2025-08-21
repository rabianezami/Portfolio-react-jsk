import { useRef, useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import Footer from "./components/Footer";


function App() {
  // ایجاد ref برای Navbar و SocialSidebar
  const navRef = useRef(null);
  const socialRef = useRef(null);

  // ذخیره ارتفاع‌ها در state
  const [navHeight, setNavHeight] = useState(0);
  const [socialHeight, setSocialHeight] = useState(0);

  // گرفتن ارتفاع‌ها از ref و بروزرسانی هنگام تغییر سایز صفحه
  useEffect(() => {
    const updateHeights = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
      if (socialRef.current) setSocialHeight(socialRef.current.offsetHeight);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, []);



  return (
    <>
      {/* Navbar و SocialSidebar با ref */}
      <Navbar ref={navRef} />
      <SocialSidebar ref={socialRef} />

      <HeroSection />
      <AboutMe />
      <Projects />
      <ContactMe />
      <Footer />
    </>
  );
}

export default App;
