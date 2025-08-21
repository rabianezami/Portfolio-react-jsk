import { FaArrowRight } from "react-icons/fa"


// آرایه پروژه‌ها
const projects = [
  {
    id: 1,
    hook: "Dive into Afghanistan’s rich heritage!",
    description: "Explore Afghanistan’s cultural gems through a visually stunning website. Highlights cities’ heritage, history, and traditions with interactive galleries and a user-friendly interface. Built with semantic HTML & CSS.",
    image: "./culture-cites-af.JPG",
    link: "https://rabianezami.github.io/Cultural-Cities-of-Afghanistan/"
  },

  {
    id: 2,
    hook: "Empowering students through technology!",
    description: "A dynamic multi-page student portal showcasing profiles, courses, and contact forms. Features responsive design and seamless form validation. Built using HTML, CSS, and JavaScript.",
    image: "./school-portal.JPG",
    link: "https://rabianezami.github.io/School-Portal/"
  },

  {
    id: 3,
    hook: "Simplify your freelance workflow!",
    description: "Efficient invoice & client management for freelancers. Add, edit, delete clients/invoices with real-time localStorage updates. Built with HTML, Bootstrap, and JavaScript for smooth workflow.",
    image: "freeLancerApp.JPG",
    link: "https://rabianezami.github.io/FreeLancerInvoceAPP/"
  }
]

// کامپوننت نمایش پروژه‌ها
export default function Projects() {
  return (
    <section id="projects" className="project-section bg-dark rounded">
      <div className="container p-5">
        <div className="d-flex justify-content-center align-items-center">
          <h3 className="project-title fw-bold text-light text-center mb-4">
            Porjects
          </h3>
        </div>

        {/* رندر کارت‌های پروژه */}
        <div className="row">
          {projects.map((project) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3 d-flex" key={project.id}>
              <div className="card h-100 shadow-sm">
                {/* تصویر پروژه */}
                <img
                  src={project.image}
                  className="card-img-top"
                  alt={project.title}
                />
                <div className="card-body">
                  {/* عنوان پروژه */}
                  <h5 className="card-title mt-2 fw-bold">{project.hook}</h5>
                  {/* توضیحات پروژه */}
                  <p className="card-text">{project.description}</p>
                   {/* دکمه مشاهده پروژه */}
                  <a
                    href={project.link}
                    className="btn btn-dark w-50"
                    target="_blank"
                    rel="noorpener noreferrer"
                  >
                    View Project <FaArrowRight /> {/* آیکن فلش */}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}