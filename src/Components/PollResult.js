import React from 'react';
import {useState} from 'react'
import PollChart from "./PollChart";
import PollInfo from "./PollInfo";
import {Row, Col, Button} from "react-bootstrap";
import moment from "moment";
import VotingAccordion from "./VotingAccordion";
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const GET_POLL = gql`
    query getPoll($pollId: ID!) {
        poll(pollId: $pollId) {
            id
            question
            voteCount
            createdAt
            votingStart
            votingEnd
            resultsAvailableAt
            choices {
                id
                text
                voteCount
            }
        }
    }
`

function PollResult(props) {
    let {id} = useParams()
    const [showResults, setShowResults] = useState(false)
    const {loading, error, data} = useQuery(GET_POLL, {
        pollInterval: 500,
        variables: {
            pollId: id
        }
    })

    if (loading) return "LOADING"
    if (error) {
        console.log(error)
        return error.message
    }

    const poll = data.poll

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
            <Row className="poll-chart">
                {/*<Col className="d-flex justify-content-center">*/}
                <PollChart
                    data={poll.choices}
                    highlightWinner={isClosed}
                    showResults={showResults}
                />
            </Row>
            <Row>
                <PollInfo poll={poll}/>
            </Row>
        </div>
    );
}

export default PollResult;