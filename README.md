# Book Management App

## Description

The Book Management App is a web application designed to help users manage their book collections. Users can add, update, delete, and view books in their collection. The app also provides features to search for books and filter them based on by author, title, or genre.

## Features

- Add new books with details like title, author, genre, and publication date.
- Update existing book information.
- Update their own read status.
- Delete books from the collection.
- View a list of all books.
- Search for books by title, author, genre & read status.

## Technologies Used

- **Frontend:** React JS, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/talha-rizwan-leed/Book-Management-App.git

   ```

2. Navigate to the project directory:

   ```bash
   cd book-management-app
   ```

3. Install the dependencies:

   ```bash
   npm install in 
   -book-management-app,
   -cd frontend.
   ```

4. Set up the environment variables: - Create a `.env` file in the root directory. - Add the following variables:
   `env
         NODE_ENV=development
         PORT=5000
         MONGO_URI= mongodb+srv://trizwan:trizwan123@book-management-app.oks6x.mongodb.net/book-management-app?
         JWT_SECRET=abc123
        `

## Usage

1. Start the backend server:

   ```bash
   npm run server
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

3. If you want to run both Frontend and Backend use concurrently.

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the BinaryCodeBarn & Leed License.

## Contact

For any questions or feedback, please contact <trizwan@leeddev.io>.
