import React, { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { slide as Menu } from "react-burger-menu";
import "./Drawer.css"

class Drawer extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {

    return (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={this.showSettings} className="menu-item--small menu-item" href="">
          Settings
        </a>
      </Menu>
    );
  }
}

export default Drawer;
