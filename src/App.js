import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import TableUser from "./components/TableUsers";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
