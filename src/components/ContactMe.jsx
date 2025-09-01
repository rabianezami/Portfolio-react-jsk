import React, { useState, useEffect } from "react";
import "../styles/contactMe.css";
import { FaUser, FaEnvelope, FaCommentDots, FaArrowRight, FaPen } from "react-icons/fa";
import { useForm } from "@formspree/react";

export default function ContactMe({ onSubmit }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    message: "" 
  });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  const [state, handleFormSubmit] = useForm("xkgvrobw");

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save form data with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  // --- Validators ---
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value) return "Email is required";
        return validateEmail(value) ? "" : "Invalid email format";
      case "message":
        return value.trim() ? "" : "Message is required";
      default:
        return "";
    }
  };

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsTyping(true);

   
    if (name === "email") {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }, 400);
      return () => clearTimeout(timer);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    // If no errors, submit
    if (!Object.values(newErrors).some((error) => error)) {
      // Formspree submit
      await handleFormSubmit(e);
         onSubmit(`Thank you, ${formData.name}! Your message was sent.`);
         setFormData({ name: "", email: "", message: "" });
         localStorage.removeItem("contactFormData");
    }
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
       <div className="text-center text-lg-start">
         <h2 className="mb-4 contact-title fw-bold">Get In Touch</h2>
       </div>
        
        <div className="row g-4">
          {/* Left: Form */}
          <div className="col-md-6">
            <div className="card contact-form bg-white p-4 shadow-md rounded-4 w-100">
              <form onSubmit={handleSubmit} noValidate className="p-4">
                <div className="mb-5">
                  <label className="form-label fw-bold">Your Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUser /></span>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Michael Jackson"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-5">
                  <label className="form-label fw-bold">Your Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaEnvelope /></span>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="jackson@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                  {isTyping && formData.email && !errors.email && (
                    <div className="email-hint mt-1">✓ Valid email format</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Your Message</label>
                  <div className="input-group">
                    <span className="input-group-text"><FaCommentDots /></span>
                    <textarea
                      name="message"
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      placeholder="Write me a text..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                  {errors.message && <div className="text-danger">{errors.message}</div>}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-gradient px-5 py-2 rounded-pill fw-bold">
                    Send <FaArrowRight />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="col-md-6">
            <div className="live-preview bg-white p-4 shadow-md rounded-4 w-100">
              <h5 className="mb-4 fw-bold live-preview-title"><FaPen className="live-preview-icon"/> Live Preview</h5>
              <div className="preview-content">
                 <p className="mb-0"><strong>From:</strong> {formData.name || "Anonymous"}</p>
                 <p><strong>Email:</strong> {formData.email || "Not provided"}</p>
                 <div className="message-preview p-3 mt-2">
                 {formData.message || "Start typing to see your message here..."}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
