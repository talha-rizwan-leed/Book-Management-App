import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  )
}

export default App