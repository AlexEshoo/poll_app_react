import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {NavItem} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import LogInForm from "./LogInForm";

function AppNavbar() {
    return (
        <Navbar className="poll-nav">
            <Navbar.Brand as={Link} to="/">
                Poll App
            </Navbar.Brand>
            <NavbarCollapse>
                <Nav className="mr-auto">
                    <NavItem as={Link} to={"/polls/new"}>
                        New Poll
                    </NavItem>
                </Nav>
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                    <Popover id="login-popover">
                        <Popover.Content>
                            <LogInForm/>
                        </Popover.Content>
                    </Popover>
                }>
                    <Button>
                        LOGIN
                    </Button>
                </OverlayTrigger>
            </NavbarCollapse>
        </Navbar>
    )
}

export default AppNavbar