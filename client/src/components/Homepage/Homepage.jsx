import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Collapse, Container, Row } from "react-bootstrap";

import images from "../../images";

export const Homepage = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {images.map((img) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={img.default} />
            <Card.Body>
              {/* <Card.Title>{}</Card.Title> */}
              {/* <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Homepage;
