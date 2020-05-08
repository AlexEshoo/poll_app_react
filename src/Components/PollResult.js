import React from 'react';
import {useState} from 'react'
import PollChart from "./PollChart";
import PollInfo from "./pollInfo";
import {Row, Col, Button} from "react-bootstrap";
import moment from "moment";
import VotingAccordion from "./VotingAccordion";
import {useParams} from 'react-router-dom'

const polls = {
    "1": {
        id: "1",
        createdAt: "2020-05-01T14:42:13Z",
        votingStart: "2020-05-01T14:42:13Z",
        votingClose: "2020-05-31T11:14:13-04:00",
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
}

function PollResult(props) {
    let {id} = useParams()
    const [showResults, setShowResults] = useState(false)
    const [poll, setPoll] = useState(polls[id])

    const isClosed = moment().isAfter(moment(poll.votingClose))

    return (
        <div>
            <Row className="justify-content-md-center">
                <h1>{poll.question}</h1>
            </Row>
            {
                isClosed ? null : (
                    <Row>
                        <Col className="justify-content-md-center"
                             style={{paddingRight: "0px", paddingLeft: "0px"}}>
                            <VotingAccordion poll={poll}/>
                        </Col>
                    </Row>
                )
            }
            <Row className="justify-content-end">
                <Button onClick={() => setShowResults(!showResults)}>
                    {showResults ? "Hide Results" : "Show Results"}
                </Button>
            </Row>
            <Row>
                {/*<Col className="d-flex justify-content-center">*/}
                <PollChart data={poll.options} highlightWinner={isClosed}
                           showResults={showResults}
                           className="poll-chart"/>
            </Row>
            <Row>
                <PollInfo poll={poll}/>
            </Row>
        </div>
    );
}

export default PollResult;