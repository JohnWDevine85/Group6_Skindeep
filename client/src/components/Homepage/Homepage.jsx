import React from "react";
import Card from 'react-bootstrap/Card';
import { Col, Collapse, Container, Row } from "react-bootstrap";

const test = ["Hi this is an array", "Another one", "The last one", "Another one one", "Is this the last one?"]

export const Homepage = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {test.map((testItem) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{testItem}</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Homepage;
