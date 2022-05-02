import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Address = ({ address }) => {
  const navigate = useNavigate();
  const shipHereHandler = () => {
    //dispatch address to cart localstoarge
    navigate("/payment");
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>{address.fullname}</Card.Title>
        <Card.Text>
          {address.houseNumber} {address.address} {address.landmark}
          {address.city} {address.pincode}
        </Card.Text>
        <Button variant="primary" onClick={shipHereHandler}>
          Ship here
        </Button>
        <Button variant="primary">
          <i className="fas fa-edit"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Address;
