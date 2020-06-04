import React from 'react';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Redirect} from 'react-router-dom'

const CREATE_POLL = gql`
    mutation createNewPoll($pollInput: PollInput!) {
        createPoll(pollData: $pollInput) {
            id
        }
    }
`


function NewPollForm() {
    const [question, setQuestion] = useState("")
    const [choices, setChoices] = useState([{"text": ""}, {"text": ""}])
    const [protectionMode, setProtectionMode] = useState("IP_ADDRESS")
    const [multiSelectEnabled, setMultiSelectEnabled] = useState(false)
    const [selectionLimit, setSelectionLimit] = useState(1)
    const [createPoll, createPollResult] = useMutation(CREATE_POLL)

    if (selectionLimit > choices.length) {
        setSelectionLimit(choices.length)
    }

    function pollChoiceChangeHandler(event) {
        let newArr = [...choices]
        newArr[event.target.getAttribute("choice-index")].text = event.target.value
        if (newArr.length >= 2 && newArr.every((v) => !!v.text)) {
            newArr.push({text: ""})
        }
        console.log(newArr)
        setChoices(newArr)
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        createPoll(
            {
                variables: {
                    pollInput: {
                        question: question,
                        duplicateVoteProtectionMode: protectionMode,
                        selectionLimit: selectionLimit,
                        choices: choices.filter(c => !!c.text)
                    }
                }
            }
        )
    }

    if (createPollResult.data) {
        return (
            <Redirect
                to={{
                    pathname: `/polls/${createPollResult.data.createPoll.id}`
                }}
            />
        )
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>
                New Poll
            </h1>
            <Form.Group>
                <Form.Label>
                    Poll Question
                </Form.Label>
                <Form.Control
                    type="text"
                    value={question}
                    // name="pollQuestion"
                    placeholder="Enter a question"
                    autoComplete="off"
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                />
            </Form.Group>
            <h2>
                Choices
            </h2>
            {
                choices.map((choice, index) => {
                        return (
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id={`choice-${index}-label`}>
                                            {`Choice ${index + 1}`}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        key={index}
                                        choice-index={index}
                                        // name={`Choice-${index}`}
                                        value={choice.text}
                                        placeholder="Enter an choice"
                                        onChange={pollChoiceChangeHandler}
                                        autoComplete="off"
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant='danger'
                                            key={index}
                                            choice-index={index}
                                            disabled={choices.length < 3 || index === choices.length - 1}
                                            onClick={(event) => {
                                                let newArr = [...choices]
                                                console.log(event.target.getAttribute("choice-index"))
                                                newArr.splice(event.target.getAttribute("choice-index"), 1)
                                                setChoices(newArr)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        )
                    }
                )
            }
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Duplicate Vote Protection Mode</Form.Label>
                <Form.Control
                    as="select"
                    value={protectionMode}
                    onChange={(e) => setProtectionMode(e.target.value)}
                >
                    <option>NONE</option>
                    <option>COOKIE</option>
                    <option>IP_ADDRESS</option>
                    <option>LOGIN</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    label="Allow users to make multiple selections"
                    checked={multiSelectEnabled}
                    onChange={(e) => {
                        setSelectionLimit(1)
                        setMultiSelectEnabled(e.target.checked)
                    }}
                />
                <Form.Label>
                    Maximum Number of Selections: {selectionLimit}
                </Form.Label>
                <Form.Control
                    type="range"
                    disabled={!multiSelectEnabled}
                    max={choices.length}
                    min={1}
                    step={1}
                    value={selectionLimit}
                    onChange={(e) => setSelectionLimit(e.target.value)}
                />
            </Form.Group>
            <Row className="justify-content-center">
                <Col>
                    <ButtonGroup className="d-flex">
                        <Button
                            type="submit"
                            disabled={createPollResult.loading}
                        >
                            Create Poll
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default NewPollForm