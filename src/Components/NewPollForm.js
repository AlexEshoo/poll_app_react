import React from 'react';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";


function NewPollForm() {
    const [choices, setChoices] = useState(["", ""])

    function pollChoiceChangeHandler(event) {
        let newArr = [...choices]
        newArr[event.target.getAttribute("choice-index")] = event.target.value
        if (newArr.length >= 2 && newArr.every((v) => !!v)) {
            newArr.push("")
        }
        console.log(newArr)
        setChoices(newArr)
    }

    return (
        <Form>
            <h1>
                New Poll
            </h1>
            <Form.Group>
                <Form.Label>
                    Poll Question
                </Form.Label>
                <Form.Control
                    type="text"
                    // name="pollQuestion"
                    placeholder="Enter a question"
                    autoComplete="off"
                />
            </Form.Group>
            <h2>
                Choices
            </h2>
            {
                choices.map((opt, index) => {
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
                                        value={opt}
                                        placeholder="Enter an choice"
                                        onChange={pollChoiceChangeHandler}
                                        autoComplete="off"
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant='danger'
                                            key={index}
                                            choice-index={index}
                                            disabled={choices.length < 3}
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
            <Row className="justify-content-center">
                <Col>
                    <ButtonGroup className="d-flex">
                        <Button type="submit">
                            Create Poll
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default NewPollForm