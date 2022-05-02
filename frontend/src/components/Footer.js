import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container className="text-center">
        <Row>
          <Col>Copyright &copy; JdLight</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
