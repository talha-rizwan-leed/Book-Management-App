import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from './store.js';
import { Provider } from 'react-redux';
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ViewAllBooks from "./components/books/ViewAllBooks.jsx";
import AddBooks from "./components/books/AddBooks.jsx";
import ViewBookById from "./components/books/ViewBookById.jsx";
import UpdateBook from "./components/books/UpdateBook.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/viewallbooks" element={<ViewAllBooks />} />
        <Route path="/addbook" element={<AddBooks />} />
        <Route path="/books/:id" element={<ViewBookById />} />
        <Route path="/update/:id" element={<UpdateBook />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);