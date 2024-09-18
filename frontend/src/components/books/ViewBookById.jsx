/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewBookById = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [readStatus, setReadStatus] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleReviewChange = (event) => setReview(event.target.value);
  const handleRatingChange = (event) => setRating(event.target.value);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:5000/api/books/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setBooks([data]);
          setReadStatus(data.readStatus);
        })
        .catch((error) => {
          toast.error("API Error:", error);
        });
    } else {
      toast.error("No token found");
    }
  }, [id, refresh, token]);

  const handleDeleteBook = () => {
    if (token) {
      fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Book deleted successfully");
            navigate("/viewallbooks", { replace: true });
          } else {
            toast.error("Failed to delete book");
          }
        })
        .catch((error) => {
          toast.error("Failed to delete book: " + error);
        });
    } else {
      toast.error("No token found");
    }
  };

  const handleReadStatusChange = (event) => {
    setReadStatus(event.target.checked);
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ readStatus: event.target.checked }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Read status updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update read status: " + error);
      });
  };

  const handleAddReview = () => {
    if (review.trim() === "" || rating < 1 || rating > 5) {
      toast.error("Please enter a valid review and rating");
      return;
    }

    fetch(`http://localhost:5000/api/books/${id}/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ review, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success("Review added successfully");
        } else {
          toast.error(data.message);
        }
        handleCloseModal();
        setReview("");
        setRating(0);
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error("Failed to add review: " + error);
      });
  };
  return (
    <>
      <Container className="fluid">
        <Col md={12}>
          <Link to="/viewallbooks" className="btn btn-outline-secondary mx-2">
            Back to Books
          </Link>
        </Col>
        <Col md={12} className="text-center mt-2">
          <h1>View Book</h1>
        </Col>
        {Array.isArray(books) && books.map((book, index) => (
          <Row key={index} className="border rounded-2 mt-2">
            <Col md={4} className="p-2">
              <img
                src={book.imageUrl}
                className="img-thumbnail w-100 img-fluid rounded-top"
              />
            </Col>
            <Col md={8} className="p-1">
              <h2>{book.title}</h2>
              <Row>
                <Col>
                  <Row>
                    <Col sm={6}>
                      <b>Author:</b> {book.author}
                    </Col>
                    <Col sm={6}>
                      <b>Genre:</b> {book.genre}
                    </Col>
                    <Col sm={6}>
                      <b>Read Status: </b>
                      <input
                        type="checkbox"
                        checked={readStatus}
                        onChange={handleReadStatusChange}
                      />{" "}
                      {readStatus ? "Read" : "Not Read"}
                    </Col>
                  </Row>
                </Col>
                <Col md={12} className="mt-2">
                  <h2>Reviews</h2>
                  {book.reviews.length > 0 ? (
                    book.reviews.map((review, index) => (
                      <span key={index}>
                        <b>Rating:</b> {review.rating} <br />
                        <b>Review:</b> {review.review}
                        <br /> <br />
                      </span>
                    ))
                  ) : (
                    <span>
                      No rating yet <br />
                      No review yet
                    </span>
                  )}
                </Col>
              </Row>
              <Row className="float-end ">
                <Col xs={12} className="mt-2">
                  <Button
                    onClick={handleShowModal}
                    className="btn btn-primary mx-2"
                  >
                    Add Review
                  </Button>
                  <Button
                    onClick={handleDeleteBook}
                    className="btn btn-danger mx-2"
                  >
                    Delete Book
                  </Button>
                  <Link
                    to={`/update/${book._id}`}
                    state={{ id: book._id }}
                    className="btn btn-success mx-2"
                  >
                    Update
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="review">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                value={review}
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={handleRatingChange}
                min="1"
                max="5"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReview}>
            Add Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBookById;
