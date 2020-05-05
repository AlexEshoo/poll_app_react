import React from 'react';
import moment from "moment";

function PollInfo(props) {
    const votingCloseAt = moment(props.votingClose)
    const createdAt = moment(props.createdAt)
    const resultsAvailableAt = moment(props.resultsAvailableAt)
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