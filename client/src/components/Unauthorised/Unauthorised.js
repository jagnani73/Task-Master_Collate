import React from "react";
import { Link } from "react-router-dom";

class Unauthorised extends React.Component {
  render() {
    return (
      <div>
        <h1>Unauthorised Access</h1>
        <p style={{ textAlign: "center" }}>
          <Link to="/log-in">Login</Link>
        </p>
      </div>
    );
  }
}
export default Unauthorised;
