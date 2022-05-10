import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder, getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
  const [paytmScriptReady, setPaytmScriptReady] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addDecimels = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, lodaing, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { lodaing: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPaytmScript = async () => {
      const { data } = await axios.get("/api/paytm/config/");
      //get the token from backend Initiate Transaction API
      console.log(data.PAYTM_HOST);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${data.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${data.PAYTM_MID}.js`;
      script.onload = () => {
        setPaytmScriptReady(true);
        //create config data
        let config = {
          root: "",
          flow: "DEFAULT",
          data: {
            orderId: order._id,
            token: "" /* update token value */,
            tokenType: "TXN_TOKEN",
            amount: order.totalPrice,
          },
          handler: {
            notifyMerchant: function (eventName, data) {
              console.log("notifyMerchant handler function called");
              console.log("eventName => ", eventName);
              console.log("data => ", data);
            },
          },
        };
      };
      document.body.appendChild(script);
    };

    addPaytmScript();

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paytm || !window.Paytm.CheckoutJS) {
        addPaytmScript();
      } else {
        setPaytmScriptReady(true);
      }
    }
  }, [dispatch, order, id]);

  const makePayment = () => {
    console.log("make payment");
  };

  return lodaing ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Id:</h2>
              <strong>{order._id}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.firstName} {order.user.lastName}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.houseNumber},
                {order.shippingAddress.address},{order.shippingAddress.landmark}
                ,{order.shippingAddress.city},{order.shippingAddress.pincode},
                {order.shippingAddress.alternativePhone}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items:</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹ {item.price} = ₹{" "}
                          {addDecimels(Number(item.qty * item.price))}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {addDecimels(Number(order.itemPrice))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>convenience fee</Col>
                  <Col>₹ {addDecimels(Number(order.convenienceFee))}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {addDecimels(Number(order.totalPrice))}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!setPaytmScriptReady ? (
                  <Loader />
                ) : (
                  <Row>
                    <Button className="btn-block" onClick={makePayment}>
                      proceed to pay
                    </Button>
                  </Row>
                )}
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
