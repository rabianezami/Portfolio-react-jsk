import React, { forwardRef } from "react";
import { FaGithub, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialSidebar = forwardRef((props, ref) => {
   // آرایه شبکه‌های اجتماعی و لینک‌های مربوطه
  const socials = [
    { icon: <FaGithub />, url: "https://github.com/rabia-nezami" },
    { icon: <FaEnvelope />, url: "mailto:rabianezami786@gmail.com" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/feed/" },
    { icon: <FaTwitter />, url: "https://x.com/zia95355" }
  ];

  return (
    <div
      ref={ref} // اضافه کردن ref برای محاسبه ارتفاع
      className="position-fixed top-50 start-0 translate-middle-y d-flex flex-column align-items-center gap-3 ms-4"
    >
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="social-icon text-dark d-flex align-items-center rounded shadow-sm text-decoration-none px-2 py-2 fs-5"
        >
          {item.icon} {/* نمایش آیکن شبکه اجتماعی */}
        </a>
      ))}
    </div>
  );
});

export default SocialSidebar;  // صادر کردن کامپوننت برای استفاده در فایل‌های دیگر