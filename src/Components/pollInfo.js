import React from 'react';
import moment from "moment";

function PollInfo(props) {
    const votingClose = moment(props.votingClose)

    return (
        <div>
            {moment().isBefore(votingClose) ? "Voting Closes" : "Voting Closed"} {votingClose.fromNow()}
        </div>
    )
}

export default PollInfo