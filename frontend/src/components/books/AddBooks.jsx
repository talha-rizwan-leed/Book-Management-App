import { useState } from 'react';
import FormContainer from '../FormContainer';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, author, genre, imageUrl, userId: 'yourUserId' };
        try {
            const response = await fetch('http://localhost:5000/api/books', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook)
            });
            const data = await response.json();
            toast.error(data);
            setToken('yourTokenValue');
            setTitle('');
            setAuthor('');
            setGenre('');
            setImageUrl('');
            if (response.ok) {
                // Check if the response status code is 200-299
                toast.success("Book deleted successfully");
                navigate("/viewallbooks", { replace: true });
            } else {
                toast.error("Failed to delete book");
            }
        } catch (error) {
            toast.error('Error adding book:', error);
        }
    };
    return (
        <>
            <Link to="/viewallbooks" className="btn btn-outline-primary">Back</Link>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='my-2' controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Author:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Author Name'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Genre:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Genre'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>ImageUrl:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image URL'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary'
                        className='mt-3 text-center'
                    >
                        Add New Book
                    </Button>

                </Form>
            </FormContainer>
        </>
    );
};

export default AddBook;
