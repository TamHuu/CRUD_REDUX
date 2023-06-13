import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import TableUser from "./components/TableUsers";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
function App() {
  const token = localStorage.getItem("token");
  const { user, handleLoginContext } = useContext(UserContext);
  console.log(">>>>>> check use context", user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleLoginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={token === null ? <Home /> : <TableUser />}
            />
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
