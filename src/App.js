import React from 'react';
import './App.css';
import PollResult from "./Components/PollResult";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const poll = {
        id: "1",
        createdAt: "2020-05-01T14:42:13Z",
        duration: 3600,
        question: "What type of bear is best?",
        options: [
            {
                id: "1",
                optionText: "Brown Bear",
                voteCount: 12,
            },
            {
                id: "2",
                optionText: "Black Bear",
                voteCount: 21,
            },
            {
                id: "3",
                optionText: "Polar Bear",
                voteCount: 42,
            }
        ]
    }
    return (
        <Container fluid className="App">
            <Row>
                {/*<Col lg={1}>*/}
                {/*    SOME CONTENT*/}
                {/*</Col>*/}
                <Col>
                    <PollResult poll={poll}/>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
