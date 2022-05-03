import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

const Address = ({ address }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shipHereHandler = () => {
    dispatch(saveShippingAddress(address));
    navigate("/payment");
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>{address.fullname}</Card.Title>
        <Card.Text>
          {address.houseNumber} {address.address} {address.landmark}
          {address.city} {address.pincode} +91 {address.alternativePhone}
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
