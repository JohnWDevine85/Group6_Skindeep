import { Drawer } from "react-bootstrap-drawer";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import {useState} from 'react';
const ApplicationDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Drawer {...props}>
      <Drawer.Toggle onClick={handleToggle} />

      <Collapse in={open}>
        <Drawer.Overflow>
          <Drawer.ToC>
            <Drawer.Header href="/">Application</Drawer.Header>

            <Drawer.Nav>
              <Drawer.Item href="/settings">Settings</Drawer.Item>
            </Drawer.Nav>
          </Drawer.ToC>
        </Drawer.Overflow>
      </Collapse>
    </Drawer>
  );
};
