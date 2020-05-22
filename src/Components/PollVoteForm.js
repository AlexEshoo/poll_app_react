import React from "react";
import Form from "react-bootstrap/Form"
import {Button} from "react-bootstrap";

class PollVoteForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: {}
        }
        for (let opt of props.poll.choices) {
            this.state.votes[opt.id] = {isCast: false}
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }


    handleInputChange(event) {
        const choiceId = event.target.name
        const checkboxValue = event.target.checked
        this.setState((state, props) => {
            let newVotes = {}
            Object.assign(newVotes, state.votes)
            newVotes[choiceId] = checkboxValue
            return {votes: newVotes}
        })
    }

    handleSubmission(event) {
        console.log("Submitted!")
    }


    render() {
        // console.log(this.state)
        return (
            <Form onSubmit={(e) => {e.preventDefault(); this.handleSubmission(e)}}>
                <Form.Group controlId="formVoteSelection">
                    <Form.Label>Vote Selection</Form.Label>
                    {
                        this.props.poll.choices.map((o) => {
                            return <Form.Check
                                name={o.id}
                                key={o.id}
                                label={o.text}
                                checked={this.state.votes[o.id].isCast}
                                onChange={this.handleInputChange}/>
                        })
                    }
                </Form.Group>
                <Button variant="warning" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default PollVoteForm