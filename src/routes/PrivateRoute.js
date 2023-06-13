import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>
          You got an error
          <p>
            You don't have access to this page because you are not logged in.
          </p>
        </Alert.Heading>
      </Alert>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
