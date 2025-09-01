
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import FeedbackWall from './components/FeedbackWall';
import Footer from "./components/Footer";
import NotificationModal from './components/NotificationModal';



function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
    

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  // ایجاد ref برای Navbar و SocialSidebar

  const socialRef = useRef(null);
  const [socialHeight, setSocialHeight] = useState(0);

  // گرفتن ارتفاع‌ها از ref و بروزرسانی هنگام تغییر سایز صفحه
  useEffect(() => {
    const updateHeights = () => {
      // if (navRef.current) setNavHeight(navRef.current.offsetHeight);
      if (socialRef.current) setSocialHeight(socialRef.current.offsetHeight);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, []);


    const handleFormSubmit = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 5000);
  };

  return (
   <Router>
     <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* SocialSidebar با ref */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SocialSidebar ref={socialRef} />
  
      {/* مسیرها */}
      <Routes>
        <Route 
           path="/"
           element={
            <>
              <HeroSection />
              <AboutMe />
              <Projects />
              <ContactMe onSubmit={handleFormSubmit} />
              <FeedbackWall />
            </>
           }
        />
          
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />}/>
        <Route path="/contact" element={<ContactMe onSubmit={handleFormSubmit} />} />
      </Routes>
      
       <Footer />

      {showModal && (
        <NotificationModal 
          show={showModal}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />

      )}
    </div>
   </Router>
  );
}

export default App;
