import React from 'react';
import PollChart from "./PollChart";
import {Col, Row, Button} from "react-bootstrap";

class PollResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showResults: false};
    }


    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h1>{this.props.poll.question}</h1>
                    </Col>
                </Row>
                <Row>
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
                    <Col>
                        <PollChart data={this.props.poll.options} showResults={this.state.showResults} className="poll-chart"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PollResult;