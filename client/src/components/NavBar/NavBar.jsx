import React from "react";
import Nav from "react-bootstrap/Nav";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Drawer from "../Drawer/Drawer";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function showNavigation() {
  if (Auth.loggedIn()) {
    return (
      <ul className="flex-row">
        <li className="mx-1">
          {/* this is not using the Link component to logout or user and then refresh the application to the start */}
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="flex-row">
        <li className="mx-1">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="mx-1">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }
}

import { useQuery } from "@apollo/client";
import { GET_TATTOO } from "../../utils/queries";

export const NavBar = () => {

  // const { loading, data } = useQuery(GET_TATTOO, {
  //   variables: { id: '6125523163938b08d764df2f' }
  // });

  return (
    <>
      <Drawer />
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
            <nav>{showNavigation()}</nav>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
