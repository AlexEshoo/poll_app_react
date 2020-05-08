import React from 'react';
import moment from "moment";

function PollInfo(props) {
    const votingCloseAt = moment(props.poll.votingClose)
    const createdAt = moment(props.poll.createdAt)
    const resultsAvailableAt = moment(props.poll.resultsAvailableAt)
    console.log("this")

    return (
        <div>
            Poll created {createdAt.fromNow()}.
            <br/>
            {moment().isBefore(votingCloseAt) ? "Voting Closes" : "Voting Closed"} {votingCloseAt.fromNow()}.
            <br/>
            {moment().isBefore(resultsAvailableAt) ? `Results available ${resultsAvailableAt.fromNow()}.` : "Results available now."}
        </div>
    )
}

export default PollInfo