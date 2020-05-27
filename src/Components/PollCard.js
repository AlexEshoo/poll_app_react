import React from 'react';
import Card from "react-bootstrap/Card";
import PollInfo from "./PollInfo";
import {Link} from 'react-router-dom'

function PollCard(props) {
    return (
        <Card className="poll-card">
            <Card.Title>
                {props.poll.question}
            </Card.Title>
            <Card.Body>
                <PollInfo poll={props.poll}/>
                <Link to={`/polls/${props.poll.id}`}>
                    Go to Poll
                </Link>
            </Card.Body>
        </Card>
    )
}

export default PollCard