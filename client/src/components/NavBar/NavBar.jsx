import React from "react";
import Nav from "react-bootstrap/Nav";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { useQuery } from "@apollo/client";
import { GET_TATTOO } from "../../utils/queries";

export const NavBar = () => {

  // const { loading, data } = useQuery(GET_TATTOO, {
  //   variables: { id: '6125523163938b08d764df2f' }
  // });

  return (
    <>
    {/* <img src = {data.tattoo.imageContent}></img> */}
      <Navbar className="p-4" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand id="NavTitle" href="#home">
            #SkinDeep
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
