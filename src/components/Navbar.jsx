
import React, { forwardRef } from "react";

const Navbar = forwardRef((props, ref) => {
   // آرایه لینک‌های منو
  const navLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <nav
     ref={ref}
     className="custom-navbar position-fixed top-0 start-50 translate-middle-x mt-3
                py-1 px-md-3 px-1 rounded-pill"  // ثابت بالای صفحه و وسط افقی
    >
      <ul className="nav justify-content-center rounded-pill flex-nowrap">
         {navLinks.map((link) => (
          <li className="nav-item mx-2 mx-sm-1" key={link}>  {/* آیتم منو با فاصله افقی */}
            <a 
               className="nav-link custom-nav-link text-white px-2 fs-6 fs-md-5 fs-lg-4"
               href={`#${link.toLowerCase()}`}
            >
            {link}   {/* متن لینک */}
            </a>
          </li>
         ))}
      </ul>

    </nav>
  )
})

export default Navbar;  // صادر کردن کامپوننت برای استفاده در فایل‌های دیگر