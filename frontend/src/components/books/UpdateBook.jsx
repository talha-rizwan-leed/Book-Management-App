import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../FormContainer';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for toast notifications

const UpdateBook = () => {
    const location = useLocation();
    const { id } = location.state;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5000/api/books/${id}`, {
                method: 'GET', // You need to make a GET request first to get the book data
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTitle(data.title);
                    setAuthor(data.author);
                    setGenre(data.genre);
                    setImageUrl(data.imageUrl);
                })
                .catch((error) => {
                    toast.error('Api error:', error);
                });
        } else {
            toast.error('Please login to update book');
        }
    }, [id, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (token) {
            fetch(`http://localhost:5000/api/books/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, author, genre, imageUrl }),
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success("Book Updated successfully", data);
                    navigate(`/books/${id}`, { replace: true });
                })
                .catch((error) => {
                    toast.error('Api error:', error);
                });
        } else {
            toast.error('Please login to update book');
        }
    };

    return (
        <>
            <FormContainer>
                <h1>Update Book</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='my-2'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Genre'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>ImageUrl</Form.Label>
                        <Form.Control
                            type='url'
                            placeholder='imageUrl'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};

export default UpdateBook;