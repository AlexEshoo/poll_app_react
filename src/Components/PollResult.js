import React from 'react';
import PollChart from "./PollChart";
import PollInfo from "./pollInfo";
import {Row, Button} from "react-bootstrap";
import moment from "moment";

class PollResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showResults: false};
    }


    render() {
        const isClosed = moment().isAfter(moment(this.props.poll.votingClose))

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
                    <PollChart data={this.props.poll.options} highlightWinner={isClosed}
                               showResults={this.state.showResults}
                               className="poll-chart"/>
                </Row>
                <Row>
                    {/*Poll created on {createdAt.toString()}*/}
                    <PollInfo votingClosedAt={this.props.poll.votingClose}
                              createdAt={this.props.poll.createdAt}
                              resultsAvailableAt={this.props.poll.resultsAvailableAt}/>
                </Row>
            </div>
        );
    }
}

export default PollResult;