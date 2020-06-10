import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {NavItem} from "react-bootstrap";

function AppNavbar(){
    return (
        <Navbar className="poll-nav">
            <Navbar.Brand as={Link} to="/">
                Poll App
            </Navbar.Brand>
            <NavbarCollapse>
                <NavItem as={Link} to={"/polls/new"}>
                    New Poll
                </NavItem>
            </NavbarCollapse>
        </Navbar>
    )
}

export default AppNavbar