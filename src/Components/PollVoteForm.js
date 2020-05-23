import React from "react";
import {useState} from 'react'
import Form from "react-bootstrap/Form"
import {Button} from "react-bootstrap";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const CAST_VOTE = gql`
    mutation castMyVote($pollId: ID! $choiceIds: [ID!]!) {
        castVote(pollId: $pollId choiceIds: $choiceIds) {
            ok
            failReason
        }
    }
`


function PollVoteForm(props) {
    const [votes, setVotes] = useState(new Map(props.poll.choices.map((choice) => {
            return [choice.id, false]
        }
    )))
    const selectedIds = [...votes.keys()].filter((id) => votes.get(id))
    const [castVote, {data}] = useMutation(CAST_VOTE);

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
            console.log(data)
        }}>
            <Form.Group controlId="formVoteSelection">
                <Form.Label>Vote Selection</Form.Label>
                {
                    props.poll.choices.map((choice) => {
                        return <Form.Check
                            name={choice.id}
                            key={choice.id}
                            label={choice.text}
                            checked={votes[choice.id]}
                            onChange={(event) => {
                                const newVotes = new Map(votes)
                                newVotes.set(event.target.name, event.target.checked)
                                setVotes(newVotes)
                            }}
                        />
                    })
                }
            </Form.Group>
            <Button variant="warning" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default PollVoteForm