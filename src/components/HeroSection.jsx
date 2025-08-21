import { useState, useEffect } from "react";

// کامپوننت بخش هرو (صفحه اول)
export default function HeroSection() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    // پیدا کردن Navbar بر اساس کلاس یا آی‌دی
    const navbar = document.querySelector(".navbar"); 
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }
    
    // اگر سایز صفحه تغییر کرد، دوباره محاسبه شود
    const handleResize = () => {
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="d-flex justify-content-center align-items-center text-center text-white"
      style={{
        minHeight: `calc(100vh - ${navHeight}px)`,
        paddingLeft: "5rem", // فاصله از آیکن‌ها
        paddingRight: "1rem",
        backgroundImage: "url('../public/hero.png')", // بک‌گراند
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* متن خوش‌آمدگویی */}
      <div className="hero-title">
        <h1 className="display-4 display-md-1 fw-bold">Hi,</h1>
        <h4 className="fw-bold">
          <span className="display-6 display-md-1 fw-bold">my name is </span>
           Rabia Zia Nezam!
        </h4>
        <p className="fw-bold fs-5">I'm based in Parwan, Afghanistan</p>
      </div>
    </section>
  );
}
