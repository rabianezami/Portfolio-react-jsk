import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaArrowRight} from "react-icons/fa";


// کامپوننت فرم تماس
export default function ContactMe() {
   // استیت ذخیره اطلاعات ورودی‌ها
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

   // استیت ذخیره خطاهای ورودی‌ها
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState(""); // پیام ارسال موفق

   // تغییر مقدار فیلدها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // حذف خطا هنگام تایپ
  };

  
  // اعتبارسنجی ورودی‌ها
  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    // نام خالی نباشد و فقط حروف باشد
    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty.";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters.";
      valid = false;
    }

    // ایمیل خالی نباشد و فرمت درست داشته باشد
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // پیام خالی نباشد
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

    // ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSuccessMsg("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });

    // محو شدن پیام بعد از 9 ثانیه
    setTimeout(() => setSuccessMsg(""), 9000);
  };

  return (
    // بخش Contact
    <section id="contact" className="d-flex flex-column justify-content-center align-items-center py-5 bg-secondary">
      <h3 className="text-center mb-4 fw-bold">Contact Me</h3>
      <p className="w-50 text-center">I’d love to hear from you! Whether it’s a project, a job offer, or simply a message, don’t hesitate to get in touch.</p>

       {/* کارت فرم */}
      <div
        className="card p-4 shadow-lg col-md-4 contact-card"
        style={{
          borderRadius: "20px",
          background: "#0b1622",
          color: "white",
        }}
      >
       

        {/* پیام موفقیت */}
        {successMsg && (
          <div className="alert alert-success text-center mb-3" role="alert">
            {successMsg}
          </div>
        )}

         {/* فرم تماس */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="mb-1">Your Name</label>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Michael Jackson"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <div className="text-danger mb-2">{errors.name}</div>}

          {/* Email */}
          <label className="mt-2 mb-1">Your Email</label>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="text"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="jackson@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

          {/* Message */}
          <label className="mt-2 mb-1">Your Message</label>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaCommentDots />
            </span>
             <textarea
               name="message"
               className={`form-control ${errors.message ? "is-invalid" : ""}`}
               placeholder="Write me a text..."
               rows="4"
               value={formData.message}
               onChange={handleChange}
             >
             </textarea>
           </div>
          {errors.message && <div className="text-danger mb-2">{errors.message}</div>}

          {/* Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-light px-4 py-2 mt-3 rounded-pill fw-bold">
              Send <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
