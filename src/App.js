import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useState } from "react";
import ModalAddNew from "./components/ModalAddNew";
import { ToastContainer } from "react-toastify";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List Users:</b>
          </span>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
        <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
      </Container>
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
    </div>
  );
}

export default App;
