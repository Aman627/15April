import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newShppingAddress } from "../actions/cartActions";
import Address from "../components/Address";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = () => {
  const [fullname, setFullName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLankmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [alternativePhone, setAlternativePhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      newShppingAddress({
        fullname,
        houseNumber,
        address,
        landmark,
        city,
        pincode,
        alternativePhone,
      })
    );
  };
  return (
    <Row>
      <CheckoutSteps step1 step2 />

      <Col md={5}>
        <h2>saved addresses</h2>

        {userInfo &&
          userInfo.addresses.map((address) => (
            <Row key={address._id}>
              <Address address={address}></Address>
            </Row>
          ))}
      </Col>
      <Col md={7}>
        <FormContainer>
          <h2>New Address</h2>

          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=" Full name"
                value={fullname}
                required
                onChange={(e) => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="houseNumber">
              <Form.Label>HouseNumber</Form.Label>
              <Form.Control
                type="text"
                placeholder=" House Number"
                value={houseNumber}
                required
                onChange={(e) => setHouseNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="landmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Landmark"
                value={landmark}
                required
                onChange={(e) => setLankmark(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pincode"
                value={pincode}
                required
                onChange={(e) => setPincode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="alernativePhone">
              <Form.Label>Alternative Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="alternative Phone"
                value={alternativePhone}
                required
                onChange={(e) => setAlternativePhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="my-2" type="submit" varient="primary">
              Update address
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
