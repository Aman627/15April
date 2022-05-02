import React, { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";

const PaymentMethodScreen = () => {
  const [PaymentMethod, setPaymentMethod] = useState("");

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
    //dispatch method
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="h3">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="UPI"
              id="UPI"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod.target.value(e)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="debit card"
              id="debitCard"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod.target.value(e)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="credit card"
              id="creditCard"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod.target.value(e)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button className="my-2" type="submit" varient="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
