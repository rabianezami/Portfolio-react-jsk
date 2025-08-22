import { FaDownload } from "react-icons/fa"

// اطلاعات در باره خودم
const aboutData = {
  name : "Rabia!",
  description: `I’m 23, from the beautiful mountains of Parwan, Afghanistan.
  I hold a degree in English Language & Literature. My
  life is driven by learning and new experiences.
  No kidding – I always take a step forward, never
  backward. I love learning, exploring fresh ideas,
  and letting my sharp little mastermind brain find clever solutions.`,
}

// بخش در باره من
export default function AboutMe() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="text-center pe-5 mb-5">
          <h3 className="fw-bold">
            About Me
          </h3>
        </div>

        <div className="row">
          {/* عکس پروفایل */}
          <div className="col-md-5 text-lg-end text-center mb-4 mb-md-0">
            <img 
              src="/Rabia-Nezami.JPG"
              alt="Rabia Zia Nezami"
              className="img-fluid rounded-circle shadow"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                filter: "grayscale(100%)"
              }}
            />
          </div>

          {/* توضیحات */}
          <div className="col-md-7 ps-5 ps-md-1 ms-md-0 text-start">
            <p className="about-title">
              It's <strong>{aboutData.name}</strong>, herself!
            </p>
            <p className="about-description mt-3">{aboutData.description}</p>

            <p className="about-section fw-bold mt-4">Wanna know more?</p>
            <p className="about-section ">Click on the magic button bellow - no csary thing, it's only a CV :</p>
            
            {/* دکمه دانلود */}
           <div className="text-center mt-3">
              <a
              href="/Rabia-Zia-Nezami-CV.pdf"
              className="download-btn btn px-4 py-2 shadow-sm fw-bold"
              download="Rabia-Zia-Nezami-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload size={15} className="me-2" /> 
              Download
            </a>
           </div>
          </div>
        </div>
      </div>
    </section>
  )
}