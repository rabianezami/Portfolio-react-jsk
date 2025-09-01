import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faFilter,
  faThumbsUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/feedbackWall.css";

// Default Feedbacks Data
const defaultFeedbacks = [
  {
    id: 1,
    name: "Sahar Ahmadi",
    rating: 5,
    comment: "Great work! The layout looks professional and user-friendly.",
    date: new Date("2025-07-12").toISOString(),
    featured: true,
    reactions: { like: 0, love: 0 },
  },
  {
    id: 2,
    name: "Zahra Noori",
    rating: 5,
    comment:
      "Very inspiring portfolio, I really like the creativity in your projects.",
    date: new Date("2025-08-04").toISOString(),
    featured: true,
    reactions: { like: 0, love: 0 },
  },
  {
    id: 3,
    name: "Nargis Rahimi",
    rating: 4,
    comment: "Good job! The design feels fresh and well-structured.",
    date: new Date("2025-08-18").toISOString(),
    featured: false,
    reactions: { like: 0, love: 0 },
  },
];

const FeedbackWall = () => {
  // State: Feedbacks
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem("portfolioFeedbacks");
    if (savedFeedbacks) {
      const parsed = JSON.parse(savedFeedbacks);
      return parsed.map((fb) =>
        fb.reactions ? fb : { ...fb, reactions: { like: 0, love: 0 } }
      );
    }
    return defaultFeedbacks;
  });

  // State: User Reactions
  const [userReactions, setUserReactions] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolioUserReactions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // State: New Feedback Form
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false); // <<-- new state

  // Persist feedbacks
  useEffect(() => {
    localStorage.setItem("portfolioFeedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Persist reactions
  useEffect(() => {
    localStorage.setItem("portfolioUserReactions", JSON.stringify(userReactions));
  }, [userReactions]);

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Rating click
  const handleRatingClick = (rating) => {
    setNewFeedback((prev) => ({ ...prev, rating }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!newFeedback.name.trim()) newErrors.name = "Name is required";
    if (newFeedback.rating === 0)
      newErrors.rating = "Please select a rating";
    if (!newFeedback.comment.trim())
      newErrors.comment = "Feedback message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit new feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const feedback = {
      ...newFeedback,
      id: Date.now(),
      date: new Date().toISOString(),
      featured: newFeedback.rating === 5,
      reactions: { like: 0, love: 0 },
    };

    setFeedbacks((prev) => [feedback, ...prev]);
    setNewFeedback({ name: "", rating: 0, comment: "" });
    setHoverRating(0);
    setErrors({});
  };

  // Handle reaction
  const handleReaction = (id, type) => {
    setFeedbacks((prev) =>
      prev.map((fb) => {
        if (fb.id !== id) return fb;

        const prevReactions = userReactions[id] || {
          like: false,
          love: false,
        };
        let newReactionsCount = { ...fb.reactions };

        if (prevReactions[type]) {
          newReactionsCount[type] = Math.max(
            (fb.reactions?.[type] || 0) - 1,
            0
          );
        } else {
          Object.keys(newReactionsCount).forEach((key) => {
            if (prevReactions[key]) {
              newReactionsCount[key] = Math.max(
                newReactionsCount[key] - 1,
                0
              );
            }
          });
          newReactionsCount[type] = (fb.reactions?.[type] || 0) + 1;
        }

        return { ...fb, reactions: newReactionsCount };
      })
    );

    setUserReactions((prev) => {
      const prevForId = prev[id] || { like: false, love: false };
      const isSame = prevForId[type];
      return {
        ...prev,
        [id]: {
          like: type === "like" ? !isSame : false,
          love: type === "love" ? !isSame : false,
        },
      };
    });
  };

  // Sort
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

  // Only 3 feedbacks unless showAll
  const visibleFeedbacks = showAll
    ? sortedFeedbacks
    : sortedFeedbacks.slice(0, 3);

  // Star rating
  const StarRating = ({
    rating,
    onRate,
    hoverRating,
    onHover,
    showError = false,
  }) => (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hoverRating || rating) ? "active" : ""
            }`}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}
      </div>
      {showError && errors.rating && (
        <span className="text-danger small">{errors.rating}</span>
      )}
    </div>
  );

  // Format date
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString();

  return (
    <section id="feedback" className="feedback-section py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center text-lg-start">
          <h2 className="mb-3 fw-bold">Visitor Feedback Wall</h2>
        </div>
        <p className="text-center text-muted mb-4 fs-5">
          Share your thoughts about my portfolio and projects
        </p>

        {/* Feedback Form */}
        <form
          className="feedback-form shadow p-5 mb-5 bg-white rounded-4"
          onSubmit={handleSubmit}
        >
          <div className="row g-5">
            {/* Name */}
            <div className="col-md-6 mb-4">
              <label htmlFor="name" className="form-label fw-bold">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newFeedback.name}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Rating */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Your Rating</label>
              <StarRating
                rating={newFeedback.rating}
                onRate={handleRatingClick}
                hoverRating={hoverRating}
                onHover={setHoverRating}
                showError={true}
              />
            </div>
          </div>

          {/* Comment */}
          <div className="mt-3">
            <label htmlFor="comment" className="form-label fw-bold">
              Your Feedback
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newFeedback.comment}
              onChange={handleInputChange}
              className={`form-control ${
                errors.comment ? "is-invalid" : ""
              }`}
              rows="3"
              placeholder="Share your thoughts..."
            />
            {errors.comment && (
              <div className="invalid-feedback">{errors.comment}</div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-gradient mt-4 d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faStar} /> Submit Feedback
          </button>
        </form>

        {/* Sort */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faFilter} />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select w-auto rounded py-1 px-2 border"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
          <span className="ms-auto">({feedbacks.length} feedbacks)</span>
        </div>

        {/* Feedback Cards */}
        <div className="row g-4">
          {visibleFeedbacks.map((fb) => (
            <div key={fb.id} className="col-md-6 col-lg-4">
              <div
                className={`card h-100 shadow-sm feedback-card position-relative ${
                  fb.featured ? "featured" : ""
                }`}
              >
                {fb.featured && (
                  <div className="featured-badge-feedback">
                    <FontAwesomeIcon icon={faStar} /> Featured
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">{fb.name}</h5>
                    <div className="d-flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < fb.rating ? "star active" : "star"
                          }
                        >
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted fst-italic flex-grow-1">
                    "{fb.comment}"
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="small text-muted">
                      {formatDate(fb.date)}
                    </span>
                    <span className="badge bg-primary">
                      {fb.rating}/5
                    </span>
                  </div>
                  <div className="d-flex emoji-reactions mt-3 pt-3 gap-2 border-top">
                    <button
                      type="button"
                      className={`btn icon-btn ${
                        userReactions[fb.id]?.like ? "liked" : ""
                      }`}
                      onClick={() => handleReaction(fb.id, "like")}
                      title="Like"
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={`me-2 ${
                          userReactions[fb.id]?.like
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                      {fb.reactions.like}
                    </button>
                    <button
                      type="button"
                      className={`btn icon-btn ${
                        userReactions[fb.id]?.love ? "hearted" : ""
                      }`}
                      onClick={() => handleReaction(fb.id, "love")}
                      title="Love"
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`me-2 ${
                          userReactions[fb.id]?.love
                            ? "text-danger"
                            : "text-secondary"
                        }`}
                      />
                      {fb.reactions.love}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {sortedFeedbacks.length > 3 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline-secondary"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        {/* No Feedback */}
        {feedbacks.length === 0 && (
          <div className="text-center py-5">
            <div className="fs-1">💬</div>
            <h3>No feedback yet</h3>
            <p className="text-muted">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackWall;
