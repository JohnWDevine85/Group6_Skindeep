import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";

function showNavigation(username) {
  if (Auth.loggedIn()) {
    return (
      <>
      <Button className=' neon-pink-btn mx-1' href={`/profile/${username}`}>View Profile</Button>
      <Button className=' neon-pink-btn mx-1' href='/' onClick={() => Auth.logout()}>Logout</Button>
      </>
    );
  } else {
    return (
      <>
        <Button className='neon-pink-btn mx-1' href="/signup">Signup</Button>
        <Button className='neon-pink-btn mx-1' href="/login">Login</Button>
      </>

    );
  }
}



export const NavBar = () => {

  const { loading, data } = useQuery(GET_ME);
  
  const me = data ? data.me : "";
  

  return (
    <>
      <Navbar className="p-4" bg="dark" variant="dark" expand='lg'>
        <Container>

          <Navbar.Brand id="NavTitle" href="/">
            #SkinDeep
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="#features">Features</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <Button className='neon-pink-btn me-1' id="button-addon2">
                  Search
                </Button>
                {showNavigation(me.username)}
              </InputGroup>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
