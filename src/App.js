import React from 'react';
import './App.css';
import PollResult from "./Components/PollResult";
import NewPollForm from "./Components/NewPollForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from "react-router-dom";
import PollsDeck from "./Components/PollsDeck";
import LoadingIcon from "./Components/LoadingIcon";
import Navbar from "react-bootstrap/Navbar";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {NavItem} from "react-bootstrap";

function App() {
    return (
        <Router>
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
            <Container fluid className="App">
                <Row>
                    <Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} sm={{span: 10, offset: 1}}>
                        <Switch>
                            <Route path="/polls/new">
                                <NewPollForm/>
                            </Route>
                            <Route path="/polls/:id">
                                <PollResult/>
                            </Route>
                            <Route path="/loading">
                                <LoadingIcon/>
                            </Route>
                            <Route path="/">
                                <PollsDeck/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
)
}

export default App;
