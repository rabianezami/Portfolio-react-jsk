import React from "react";
import "../styles/Project.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Freelance Invoice App",
      description:
        "Manage clients and invoices with ease. Add, edit, and store records instantly using localStorage.",
      techStack: ["JavaScript", "HTML", "Bootstrap"],
      liveUrl: "https://rabianezami.github.io/FreeLancerInvoceAPP/",
      imageUrl: "/freeLancerApp.JPG",
    },
    {
      id: 2,
      name: "School Portal",
      description:
         "Showcasing Afghan cities with heritage, history, and traditions. Includes interactive galleries and clean design.",
      techStack: ["JavaScript", "Bootstrap", "HTML"],
      liveUrl: "https://rabianezami.github.io/School-Portal/",
      imageUrl: "/school-portal.JPG",
    },
    {
      id: 3,
      name: "Afghanistan Culture Cites",
      description:
       "A showcase of Afghan cities highlighting heritage, history, and traditions with clean, interactive design.",
      techStack: ["JavaScript", "HTML", "CSS"],
      liveUrl: "https://rabianezami.github.io/Cultural-Cities-of-Afghanistan/",
      imageUrl: "/culture-cites-af.JPG",
    },
  ];

  return (
    <section id="projects" className="p-5 bg-light">
      <div className="container">
        <div className="text-center">
          <h2 className="project-heading text-center mb-4 fw-bold">My Recent Works</h2>
        </div>

        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-12 col-md-6 col-lg-4" key={project.id}>
              <div className="card h-100 shadow-sm project-card">
                <div className="project-img-wrapper">
                  <img
                    src={project.imageUrl}
                    className="card-img-top img-fluid"
                    alt={project.name}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text text-muted">{project.description}</p>

                  {/* تکنالوژی‌ها */}
                  <div className="mb-3 d-flex flex-wrap gap-3 project-tech">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className=" mt-auto text-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn view-btn"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
