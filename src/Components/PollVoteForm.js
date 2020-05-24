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
    const [choiceSelections, setChoiceSelections] = useState(new Map(props.poll.choices.map((choice) => {
            return [choice.id, false]
        }
    )))
    const selectedIds = [...choiceSelections.keys()].filter((id) => choiceSelections.get(id))
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
            <Button variant="warning" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default PollVoteForm