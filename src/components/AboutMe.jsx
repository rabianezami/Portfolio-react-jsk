import React from "react";
import "../styles/about.css";
import { FaDownload} from "react-icons/fa";


const Profile = () => {
  const profileData = {
    title: "About Me",
    name: "Rabia",
    description:
      `I’m 23, from the beautiful mountains of Parwan, Afghanistan.
      I hold a degree in English Language & Literature. My
      life is driven by learning and new experiences.
      No kidding – I always take a step forward, never
      backward. I love learning, exploring fresh ideas,
     and letting my sharp little mastermind brain find clever solutions.`,
    skills: [
      "React",
      "JavaScript",
      "API",
      "Bootstrap",
      "CSS3",
      "HTML5",
    ],
    image: "/Rabia-Nezami.JPG",
  };

  return (
    <section id="about" className="container my-5">
      <div className="text-center text-lg-start mb-3">
        <h2 className="about-title text-center fw-bold">
        {profileData.title}
        </h2>
      </div>

      <div className="row bg-white rounded-4 shadow-lg p-4 p-md-5 align-items-center about-card">
        <div className="col-md-4 d-flex justify-content-center mb-4 mb-md-0">
          <div
            className="rounded-circle shadow-lg overflow-hidden about-text"
            style={{ width: "220px", height: "220px" }}
          >
            <img
              src={profileData.image}
              alt="Profile"
              className="img-fluid w-100 h-100 object-fit-cover profile-img"
            />
          </div>
        </div>

        <div className="col-md-8">
          <p>It's <span className="fw-bold profile-name">{profileData.name} </span>herself!</p>
          <p className="text-muted mb-4 about-description">{profileData.description}</p>
          <p className="fw-bold mb-0 profile-resume">Wanna know more?</p>
          <p>Click on the magic button bellow - no scary thing, it's only a CV.</p>

          <div className="mt-3">
            <a 
              href="/Rabia-Zia-Nezami-CV.pdf"
              className="btn px-4 py-2 mb-4 shadow-sm fw-bold download-btn"
              target="blank"
              rel="noorpener noreferrer"
            >
             <FaDownload size={15} className="me-2"/>
             Download
            </a>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {profileData.skills.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
