import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { slide as Menu } from "react-burger-menu";
import { GET_ME_BASIC, GET_USER } from "../../utils/queries";
import "./Drawer.css";

const Drawer = () => {

  const showSettings = (event) => {
    event.preventDefault();
  }

  const { loading, data } = useQuery(GET_ME_BASIC);
    const user = data?.me || '';

  return (
    <Menu showSettings={showSettings}>
      {loading ? <div>Loading...</div> : <p id="username" className="item">{user.username}</p>}
    </Menu>
  );
};

export default Drawer;
