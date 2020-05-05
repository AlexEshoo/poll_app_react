import React from 'react';
import PollChart from "./PollChart";
import {Row, Button} from "react-bootstrap";

class PollResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showResults: false};
    }


    render() {
        return (
            <div>
                <Row className="justify-content-md-center">
                    <h1>{this.props.poll.question}</h1>
                </Row>
                <Row className="justify-content-end">
                    <Button onClick={() => {
                        return this.setState((state, props) => {
                            return {showResults: !state.showResults}
                        })
                    }}>
                        {this.state.showResults ? "Hide Results" : "Show Results"}
                    </Button>
                </Row>
                <Row>
                    {/*<Col className="d-flex justify-content-center">*/}
                    <PollChart data={this.props.poll.options} highlightWinner showResults={this.state.showResults}
                               className="poll-chart"/>
                </Row>
            </div>
        );
    }
}

export default PollResult;