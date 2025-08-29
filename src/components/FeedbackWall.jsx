import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilter } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/feedbackWall.css"


const defaultFeedbacks = [
  {
    id: 1,
    name: "Sahar Ahmadi",
    rating: 5,
    comment: "Great work! The layout looks professional and user-friendly.",
    date: new Date("2025-07-12").toISOString(),
    featured: true,
  },
  {
    id: 2,
    name: "Zahra Noori",
    rating: 5,
    comment: "Very inspiring portfolio, I really like the creativity in your projects.",
    date: new Date("2025-08-04").toISOString(),
    featured: true,
  },
  {
    id: 3,
    name: "Nargis Rahimi",
    rating: 4,
    comment: "Good job! The design feels fresh and well-structured.",
    date: new Date("2025-08-18").toISOString(),
    featured: false,
  },
];

const FeedbackWall = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem("portfolioFeedbacks");
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : defaultFeedbacks;
  });

  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    localStorage.setItem("portfolioFeedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setNewFeedback((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.rating > 0 && newFeedback.comment) {
      const feedback = {
        ...newFeedback,
        id: Date.now(),
        date: new Date().toISOString(),
        featured: newFeedback.rating === 5,
      };
      setFeedbacks((prev) => [feedback, ...prev]);
      setNewFeedback({ name: "", rating: 0, comment: "" });
      setHoverRating(0);
    }
  };

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const StarRating = ({ rating, onRate, hoverRating, onHover }) => (
    <div className="d-flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );

  return (
    <section id="feedback" className="feedback-section py-5">
      <div className="container">
        <h2 className="text-start mb-3 fw-bold">Visitor Feedback Wall</h2>
        <p className="text-center text-muted mb-4 fs-5 feedback-text">
          Share your thoughts about my portfolio and projects
        </p>

        {/* Feedback Form */}
        <form className="feedback-form shadow p-5 mb-5 bg-white rounded" onSubmit={handleSubmit}>
          <div className="row g-5">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newFeedback.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Micchael Jackson"
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Your Rating</label>
              <StarRating
                rating={newFeedback.rating}
                onRate={handleRatingClick}
                hoverRating={hoverRating}
                onHover={setHoverRating}
              />
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="comment" className="form-label fw-bold">Your Feedback</label>
            <textarea
              id="comment"
              name="comment"
              value={newFeedback.comment}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Share your thoughts..."
              rows="3"
              required
            />
          </div>

          <button type="submit" className="btn btn-gradient mt-4 d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faStar} /> Submit Feedback
          </button>
        </form>

        {/* Sorting Controls */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faFilter} />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select w-auto rounded py-1 px-2 border border-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {/* Feedback Cards */}
        <div className="row g-4">
          {sortedFeedbacks.map((feedback) => (
            <div key={feedback.id} className="col-md-6 col-lg-4">
              <div
                className={`card h-100 shadow-sm feedback-card ${feedback.featured ? "featured" : ""}`}
              >
                {feedback.featured && (
                  <div className="featured-badge-feedback">
                    <FontAwesomeIcon icon={faStar} /> Featured
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">{feedback.name}</h5>
                    <div className="d-flex  gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < feedback.rating ? "star active" : "star"}
                        >
                          <FontAwesomeIcon icon={faStar} className="mt-3" />
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-muted fst-italic flex-grow-1">
                    "{feedback.comment}"
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="small text-muted">
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                    <span className="badge bg-primary">{feedback.rating}/5</span>
                  </div>

                  <div className="d-flex emoji-reactions mt-3 pt-3 gap-1 border-top">
                    <button type="button" className="btn btn-light rounded-circle">👍</button>
                    <button type="button" className="btn btn-light rounded-circle">❤️</button>
                    <button type="button" className="btn btn-light rounded-circle">🎉</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {feedbacks.length === 0 && (
          <div className="text-center py-5">
            <div className="fs-1">💬</div>
            <h3>No feedback yet</h3>
            <p className="text-muted">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackWall;
