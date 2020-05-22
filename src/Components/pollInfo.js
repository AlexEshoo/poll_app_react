import React from 'react';
import moment from "moment";

function PollInfo(props) {
    const votingEndAt = moment(props.poll.votingEnd)
    const createdAt = moment(props.poll.createdAt)
    const resultsAvailableAt = moment(props.poll.resultsAvailableAt)
    console.log("this")

    return (
        <div>
            Poll created {createdAt.fromNow()}.
            <br/>
            {moment().isBefore(votingEndAt) ? "Voting Closes" : "Voting Closed"} {votingEndAt.fromNow()}.
            <br/>
            {moment().isBefore(resultsAvailableAt) ? `Results available ${resultsAvailableAt.fromNow()}.` : "Results available now."}
        </div>
    )
}

export default PollInfo