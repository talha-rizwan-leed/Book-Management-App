/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewAllBooks = () => {
    const [books, setBooks] = useState(() => []);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/books', {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setBooks(data))
                .catch(error => {
                    toast.error('API Error:', error);
                    // Handle error scenario, e.g., display an error message to the user
                });
        } else {
            toast.log('No token found');
            // Handle no token scenario, e.g., redirect to login page
        }
    }, [token]);
    const fetchBooks = () => {
        fetch('http://localhost:5000/api/books', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => {
                toast.error('API Error:', error);
                // Handle error scenario, e.g., display an error message to the user
            });
    };

    const fetchBookById = (id) => {
        fetch(`http://localhost:5000/api/books/${id}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                // console.log(data);
            })
            .catch(error => {
                toast.error('API Error:', error);
                // Handle error scenario, e.g., display an error message to the user
            });
    };


    const handleSearch = (e) => {
        e.preventDefault();
        const lowerCaseQuery = query.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(lowerCaseQuery) ||
            book.author.toLowerCase().includes(lowerCaseQuery) ||
            book.genre.toLowerCase().includes(lowerCaseQuery) ||
            (book.readStatus ? 'read' : 'unread').includes(lowerCaseQuery)
        );
        setResults(filteredBooks);

    }

    return (
        <>
            <Container className=' fluid'>
                <Row className='justify-content-between'>
                    <Col xs={6} className='text-start'>
                        <Row className='my-2'>
                            <Col xs={10}>

                                <Form onSubmit={handleSearch}>
                                    <Form.Group >
                                        <Form.Control
                                            type='search'
                                            placeholder='Search'
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={2} >
                                <Button className='btn btn-primary mx-0' type='submit'>Search</Button>
                            </Col>
                            <ul className="list-group mt-3">
                                {results.map((result, index) => (
                                    <li key={index} className="list-group-item">
                                        {result.title} by {result.author} - {result.genre} - {result.readStatus ? 'Read' : 'Unread'}
                                    </li>
                                ))}
                            </ul>
                        </Row>
                    </Col>
                    <Col xs={6} className='text-end'>
                        <Button className='btn btn-secondary mx-2 my-2' onClick={fetchBooks}>Reload API</Button>
                        <Link to="/addbook" className="btn btn-primary">Add New Book</Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='text-center mt-2'>
                        <h1>View All Books</h1>
                    </Col>
                </Row>
                <Row>
                    {Array.isArray(books) && books.map((book, index) => (
                        <Col xs={12} sm={6} key={index}>
                            <Card className='mt-3 w-100 h-100'>
                                <Card.Img variant="top" src={book.imageUrl} className="img-fluid" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Row>
                                        <Col>
                                            <Card.Text>Author: {book.author}</Card.Text>
                                            <Card.Text>Genre: {book.genre}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text>Read Status: {book.readStatus ? 'Read' : 'Not Read'}</Card.Text>
                                            <Card.Text>
                                                {/* {book.reviews.length > 0 ? (
                                                    book.reviews.map((review, index) => (
                                                        <span key={index}>
                                                            Rating: {review.rating} <br />
                                                            Review: {review.review}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <>
                                                        <span>
                                                            No rating yet <br />
                                                            No review yet
                                                        </span>
                                                    </>
                                                )} */}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Col className='text-end'>
                                        <Link to={`/books/${book._id}`} className='btn btn-secondary' onClick={() => fetchBookById(book._id)} >Read More</Link>
                                    </Col>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}


export default ViewAllBooks;
