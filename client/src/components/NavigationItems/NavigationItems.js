import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import logo from "../../assets/images/logo.png";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="logo" width="55px" /> TaskMaster
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavigationItem
              href="/tasks"
              pageName="TASKS"
              className="text-center"
            />
            <NavigationItem href="/tasks/new-task" pageName="ADD NEW" />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationItems;
