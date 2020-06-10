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
    Route
} from "react-router-dom";
import PollsDeck from "./Components/PollsDeck";
import LoadingIcon from "./Components/LoadingIcon";
import AppNavbar from "./Components/AppNavbar";

function App() {
    return (
        <Router>
            <AppNavbar/>
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
