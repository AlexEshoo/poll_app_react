import React from 'react';
import PollChart from "./PollChart";
import {Col, Row, Button} from "react-bootstrap";

class PollResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resultsHidden: true};
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
                            return {resultsHidden: !state.resultsHidden}
                        })
                    }}>
                        {this.state.resultsHidden ? "Show Results" : "Hide Results"}
                    </Button>
                </Row>
                <Row>
                    {/*<Col className="d-flex justify-content-center">*/}
                    <Col>
                        {this.state.resultsHidden ? <div>RESULTS HIDDEN</div> :
                            <PollChart data={this.props.poll.options} className="poll-chart"/>}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PollResult;