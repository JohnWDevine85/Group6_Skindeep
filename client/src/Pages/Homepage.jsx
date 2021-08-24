import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./Homepage.css";

export const Homepage = () => {
  return (
    <main>
    <Container>
    <Row>
      <Col xs={6} md={4}>
        xs=6 md=4
      </Col>
    </Row>
         </Container>
<Container>
         <Row>
           <Col xs={6} md={4}>
             xs=6 md=4
           </Col>
         </Row>
              </Container>
<Container>
              <Row>
                <Col xs={6} md={4}>
                  xs=6 md=4
                </Col>
              </Row>
                  </Container>
  </main>
  );
  }
  export default Homepage;
