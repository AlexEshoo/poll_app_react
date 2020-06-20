import React from 'react'
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";


const UserContext = React.createContext({
        currentUser: null,
        refreshUser: () => {
        }
    }
)

const GET_ME = gql`
    query {
        me {
            id
            username
            joinedAt
            createdPolls {
                id
                question
            }
        }
    }
`

function UserContextProvider(props) {
    const meQuery = useQuery(GET_ME)
    console.log("meQuery", meQuery)

    return (
        <UserContext.Provider
            value={{
                currentUser: meQuery.loading || meQuery.error ? null : meQuery.data.me,
                refreshUser: meQuery.refetch
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
}
