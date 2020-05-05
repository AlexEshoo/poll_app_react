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
        votingStart: "2020-05-01T14:42:13Z",
        votingClose: "2020-05-05T11:14:13-04:00",
        resultsAvailableAt: "2020-05-05T11:13:13",
        question: "What type of bear is best?",
        options: [
            {
                id: "1",
                optionText: "Brown Bear",
                voteCount: 15,
            },
            {
                id: "2",
                optionText: "Black Bear",
                voteCount: 23,
            },
            {
                id: "3",
                optionText: "Polar Bear",
                voteCount: 10,
            }
        ]
    }
    return (
        <Container fluid className="App">
            <Row>
                {/*<Col lg={4}>*/}
                {/*    SOME CONTENT*/}
                {/*</Col>*/}
                <Col md={{span: 6, offset: 3}}>
                    <PollResult poll={poll}/>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
