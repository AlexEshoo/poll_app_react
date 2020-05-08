import React from 'react';
import './App.css';
import PollResult from "./Components/PollResult";
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
                <Switch>
                    <Route path="/polls/:id">
                        <Row>
                            <Col md={{span: 6, offset: 3}}>
                                <PollResult/>
                            </Col>
                        </Row>
                    </Route>
                    <Route path="/">
                        <Link to="/polls/1">
                            Poll 1
                        </Link>
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}

export default App;
