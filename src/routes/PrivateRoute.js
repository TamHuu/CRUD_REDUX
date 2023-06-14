import React from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.account);
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
