import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Col, Collapse, Container, Row } from "react-bootstrap";

import images from "../../images";

export const Homepage = () => {
  return (
    <Container fluid style={{ justifyContent: "center" }}>
      <Row style={{ backgroundColor: "#282c34" }} xs={12} md={6} lg={4} className="g-4">
        {images.map((img) => (
          <Col>
            <Card
              style={{
                @media screen and (max-width: 540px) {
                  flex: 0 70%;
  }
                width: "80%",
                backgroundColor: "#282c34",
                color: "#e52fbd",
                padding: "30px",
              }}
            >
              <Card.Img variant="top" src={img.img.default} />
              <Card.Body>
                <Card.Title>
                  {img.title}
                  <Button style={{ float: "right" }}>Like</Button>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;
