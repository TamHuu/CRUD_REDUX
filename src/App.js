import Container from "react-bootstrap/esm/Container";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useState } from "react";
import ModalAddNew from "./components/ModalAddNew";

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
    </div>
  );
}

export default App;
