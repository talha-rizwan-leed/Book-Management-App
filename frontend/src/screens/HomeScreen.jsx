import Hero from '../components/Hero'
import ViewAllBooks from '../components/books/ViewAllBooks'
import { useEffect, useState } from 'react';

const HomeScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <>
            <div>
                {isLoggedIn === false ? <Hero /> : <ViewAllBooks />}

            </div>
        </>
    )

}

export default HomeScreen