import React, {useContext} from 'react'
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {NavItem} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {UserContext} from "./UserContext";
import LogoutButton from "./LogoutButton";
import LoginRegisterPopoverButton from "./LoginRegisterPopoverButton";

function AppNavbar() {
    const {currentUser} = useContext(UserContext)

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
                {currentUser ? <div>Logged in as {currentUser.username} <LogoutButton/></div> : <LoginRegisterPopoverButton/>}
            </NavbarCollapse>
        </Navbar>
    )
}

export default AppNavbar