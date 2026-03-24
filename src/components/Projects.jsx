import React, { useState } from "react";
import "../styles/project.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Freelance Invoice App",
      description:
        "Manage clients and invoices with ease. Add, edit, and store records instantly using localStorage.",
      techStack: ["JavaScript",  "Bootstrap", "HTML"] ,
      liveUrl: "https://rabianezami.github.io/FreeLancerInvoceAPP/",
      imageUrl: "/freeLancerApp.JPG",
    },
    {
      id: 2,
      name: "Hackathon-Seda app",
      description:
         "A team project focused on Digital Safety for Afghan women.",
      techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Bootstrap", "HTML", "CSS"],
      liveUrl: "https://cyber-experts-web.onrender.com/",
      imageUrl: "/seda-app.JPG",
    },
    {
      id: 3,
      name: "E-commarce-APP",
      techStack: ["React", "Node.js", "AI", "Bootstrap", "HTML", "CSS"] ,
      description:
       "modern online store where users can explore products, add or remove items from their cart, and manage everything seamlessly with localStorage.",
      liveUrl: "https://e-commarce-website-phi.vercel.app/",
      imageUrl: "/online-shop.JPG",
    },
     {
      id: 4,
      name: "AI-Translation-App",
      techStack: ["React", "Node.js", "AI", "Bootstrap", "HTML",] ,
      description:
       "Translate text instantly with smart AI. Type, submit, and get accurate translations in seconds.",
      liveUrl: "https://ai-translation-app-beta.vercel.app/",
      imageUrl: "/AI-translation.JPG",
    },
     {
      id: 5,
      name: "PopChoice – AI Movie Recommendation App ",
      techStack: ["React", "Node.js", "AI", "Supabase", "Sql", "Bootstrap", "HTML" ] ,
      description:
       "Find your next movie with AI. Answer a few questions and get personalized recommendations instantly.",
      liveUrl: "https://ai-move-recomondation-app.vercel.app/",
      imageUrl: "/ai-movie.JPG",
    },
     {
      id: 6,
      name: "Bazaar-e-Noor",
      techStack: ["React", "Redux Toolkit", "Tailwindcss", ] ,
      description:
       "A modern Afghan-inspired marketplace experience, built with React, Redux Toolkit, and Tailwind CSS. Browse products with fast search, filters, sorting, and a smooth cart drawer.",
      liveUrl: "https://rabianezami.github.io/bazzar-e-noor-application/",
      imageUrl: "/bazaar-e-noor.JPG",
    }

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
