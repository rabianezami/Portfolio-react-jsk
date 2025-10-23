import React, { useState } from "react";
import "../styles/project.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Freelance Invoice App",
      description:
        "Manage clients and invoices with ease. Add, edit, and store records instantly using localStorage.",
      techStack: ["HTML", "Bootstrap", "JavaScript"] ,
      liveUrl: "https://rabianezami.github.io/FreeLancerInvoceAPP/",
      imageUrl: "/freeLancerApp.JPG",
    },
    {
      id: 2,
      name: "Sada – Women’s Digital Safety",
      description:
         "A team project about raising awareness and protecting women's digital security.",
      techStack: ["HTML", "CSS", "Bootstrap", "JavaScript", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://cyber-experts-web.onrender.com/",
      imageUrl: "/seda-app.JPG",
    },
    {
      id: 3,
      name: "Online Shopping",
      techStack: ["HTML", "Bootstrap", "JavaScript"] ,
      description:
       "modern online store where users can explore products, add or remove items from their cart, and manage everything seamlessly with localStorage.",
      liveUrl: "https://online-shopping-new.vercel.app/login.html",
      imageUrl: "/online-shopping.JPG",
    },

  ];

 
  const allSkills = ["All", ...new Set(projects.flatMap((p) => p.techStack))];
console.log(allSkills);
  const [selectedSkill, setSelectedSkill] = useState("All");

  const filteredProjects = 
    selectedSkill === "All"
    ? projects
    : projects.filter((p) => p.techStack.includes(selectedSkill));

  return (
    
    <section id="projects" className="project-section p-5 bg-light">
      <div className="container">
        <div className="text-center text-lg-start">
          <h2 className="project-title text-center mb-4 fw-bold">My Recent Works</h2>
          <p className="fs-5 text-dark">Here’s a look at my recent projects — crafted with care and clean code.</p>
        </div>
        
        <div className="d-flex flex-wrap justify-content-lg-start justify-content-center gap-2 mb-5">
          {allSkills.map((skill) => (
            <button 
              key={skill}
              className={`btn btn-sm ${
                selectedSkill === skill ? "btn-primary"  : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </button>
          ))}
        </div>


        <div className="row g-4">
          {filteredProjects.map((project) => (
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
                  <h5 className="card-title fw-bold">{project.name}</h5>
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
