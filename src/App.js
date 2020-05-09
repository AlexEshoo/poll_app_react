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
    Route,
    Link,
    useParams
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Container fluid className="App">
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <Switch>
                            <Route path="/polls/new">
                                <NewPollForm/>
                            </Route>
                            <Route path="/polls/:id">
                                <PollResult/>
                            </Route>
                            <Route path="/">
                                <Link to="/polls/1">
                                    Poll 1
                                </Link>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Router>
    )
}

export default App;
