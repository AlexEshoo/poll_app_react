import React from 'react'
import CardDeck from "react-bootstrap/CardDeck";
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import PollCard from "./PollCard";

const GET_POLLS = gql`
    query {
        polls {
            id
            createdAt
            votingStart
            votingEnd
            resultsAvailableAt
            voteCount
            question
        }
    }
`


function PollsDeck() {

    const {loading, error, data} = useQuery(GET_POLLS)
    console.log(data)

    if (loading) return "LOADING"
    if (error) return error.message

    return (
        <div>
            {
                data.polls.map(poll => {
                    return (
                        <PollCard poll={poll} key={poll.id}/>
                    )
                })
            }
        </div>
    )
}

export default PollsDeck