import React from "react";
import Card from 'react-bootstrap/Card';
import { Col, Collapse, Container, Row } from "react-bootstrap";
import './Homepage.css'

import images from "../../images";

export const Homepage = () => {
  return (
    <Container style={{ justifyContent: "center" }}>
      <Row style={{ backgroundColor: "#282c34" }} xs={1} md={2} className="g-4">
        {images.map((img) => (
          <Col>
            <Card
              style={{
                width: "40rem",
                backgroundColor: "#282c34",
                color: "#e52fbd",
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
