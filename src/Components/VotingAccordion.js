import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import PollVoteForm from "./PollVoteForm";
import {useAccordionToggle} from "react-bootstrap";
import {getVotedPolls} from '../utils'

function CustomToggle({children, eventKey}) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log("clicked Accordian"),
    )

    return (
        <Button
            type="button"
            onClick={decoratedOnClick}
        >
            {children}
        </Button>
    )
}

function VotingAccordion(props) {
    return (
        <Accordion defaultActiveKey={getVotedPolls().includes(props.poll.id) ? null : "0"}>
            <Card>
                <Card.Header>
                <CustomToggle eventKey="0">
                    Vote
                </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body style={{color: "black"}}>
                        <PollVoteForm poll={props.poll}/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default VotingAccordion