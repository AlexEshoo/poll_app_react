import React from 'react';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


function NewPollForm(props) {
    const [options, setOptions] = useState(["", ""])

    function pollOptionChangeHandler(event) {
        let newArr = [...options]
        newArr[event.target.getAttribute("option-index")] = event.target.value
        if (newArr.length >= 2 && newArr.every((v) => !!v)) {
            newArr.push("")
        }
        console.log(newArr)
        setOptions(newArr)
    }

    return (
        <Form>
            <h1>
                New Poll
            </h1>
            <Form.Group>
                <Form.Control
                    type="text"
                    name="pollQuestion"
                    placeholder="Enter a question"
                    autoComplete="off"
                />
                <h2>
                    Options
                </h2>
                {
                    options.map((opt, index) => {
                            return (
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id={`option-${index}-label`}>
                                                {`Option ${index + 1}`}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            key={index}
                                            option-index={index}
                                            name={`option-${index}`}
                                            value={opt}
                                            placeholder="Enter an option"
                                            onChange={pollOptionChangeHandler}
                                            autoComplete="off"
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                variant='danger'
                                                key={index}
                                                option-index={index}
                                                disabled={options.length < 3}
                                                onClick={(event) => {
                                                    let newArr = [...options]
                                                    console.log(event.target.getAttribute("option-index"))
                                                    newArr.splice(event.target.getAttribute("option-index"), 1)
                                                    setOptions(newArr)
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

            </Form.Group>
        </Form>
    )
}

export default NewPollForm