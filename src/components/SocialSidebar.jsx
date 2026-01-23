import React, { forwardRef } from "react";
import { FaGithub, FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialSidebar = forwardRef((props, ref) => {
  // آرایه شبکه‌های اجتماعی
  const socials = [
    { icon: <FaGithub />, url: "https://github.com/rabianezami" },
    { icon: <FaEnvelope />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=rabianezami786@gmail.com"},
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/rabia-zia-nezami-993989379/" },
    { icon: <FaTwitter />, url: "https://x.com/zia95355" }
  ];

  return (
    <div
      ref={ref}
      className="position-fixed top-50 start-0 translate-middle-y d-flex flex-column align-items-center gap-3 ms-4"
      style={{ zIndex: 9999 }}
    >
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark d-flex align-items-center rounded shadow-sm text-decoration-none px-2 py-2 fs-5"
        >
          {item.icon}
        
        </a>
      ))}
    </div>
  );
});

export default SocialSidebar;
