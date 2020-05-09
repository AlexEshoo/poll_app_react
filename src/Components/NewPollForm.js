import React from 'react';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';



function NewPollForm(props) {
    const [options, setOptions] = useState(["", ""])

    function pollOptionChangeHandler(event) {
        let newArr = [...options]
        newArr[event.target.getAttribute("option-index")] = event.target.value
        if (newArr.length >= 2 && newArr.every((v) => !!v)){
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
                />
                <h2>
                    Options
                </h2>
                {
                    options.map((opt, index) =>
                        <Form.Control
                            type="text"
                            key={index}
                            option-index={index}
                            name={`option-${index}`}
                            value={opt}
                            placeholder="Enter an option"
                            onChange={pollOptionChangeHandler}
                        />
                    )
                }

            </Form.Group>
        </Form>
    )
}

export default NewPollForm