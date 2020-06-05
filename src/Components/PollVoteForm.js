import React from "react";
import {useState} from 'react'
import Form from "react-bootstrap/Form"
import {Button} from "react-bootstrap";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Spinner from "react-bootstrap/Spinner";
import {addVotedPoll} from "../utils";

const CAST_VOTE = gql`
    mutation castMyVote($pollId: ID! $choiceIds: [ID!]!) {
        castVote(pollId: $pollId choiceIds: $choiceIds) {
            ok
            failReason
        }
    }
`


function PollVoteForm(props) {
    const [choiceSelections, setChoiceSelections] = useState(new Map(props.poll.choices.map((choice) => {
            return [choice.id, false]
        }
    )))
    const selectedIds = [...choiceSelections.keys()].filter((id) => choiceSelections.get(id))
    const [castVote, voteResult] = useMutation(CAST_VOTE);

    let voteResultInfo

    if (voteResult.called) {
        if (voteResult.loading) {
            voteResultInfo = (
                <div className="d-flex align-items-center" style={{"padding-left": "10px"}}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            )
        } else {
            if (voteResult.data.castVote.ok) {
                voteResultInfo = (
                    <div className="d-flex align-items-center" style={{color: "green", "padding-left": "10px"}}>
                        Vote Successful!
                    </div>
                )
                addVotedPoll(props.poll.id)  // Keep track internally

            } else {
                voteResultInfo = (
                    <div className="d-flex align-items-center" style={{color: "red", "padding-left": "10px"}}>
                        Vote Failed: {voteResult.data.castVote.failReason}
                    </div>
                )
            }
        }
    }

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            castVote(
                {
                    variables: {
                        pollId: props.poll.id,
                        choiceIds: selectedIds
                    }
                })
        }}>
            <Form.Label>Vote Selection</Form.Label>
            {
                props.poll.choices.map((choice) => {
                    return (
                        <Form.Check
                            id={choice.id}
                            key={choice.id}
                            label={choice.text}
                            checked={choiceSelections[choice.id]}
                            onChange={(event) => {
                                const newVotes = new Map(choiceSelections)
                                newVotes.set(event.target.id, event.target.checked)
                                setChoiceSelections(newVotes)
                            }}
                        />
                    )
                })
            }
            <div className="d-flex align-content-center">
                <Button variant="warning" type="submit">
                    Submit
                </Button>
                {voteResultInfo}
            </div>
        </Form>
    )
}

export default PollVoteForm