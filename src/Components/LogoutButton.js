import React, {useContext} from 'react'
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag'
import {useMutation} from "@apollo/react-hooks";
import {UserContext} from "./UserContext";

const LOGOUT = gql`
    mutation {
        logout {
            ok
        }
    }
`

function LogoutButton() {
    const [logout, logoutResult] = useMutation(LOGOUT)
    const userContext = useContext(UserContext)

    console.log(logoutResult)

    return (
        <Button
            variant="danger"
            onClick={() => {
                logout()
                userContext.refreshUser()
            }}
        >
            Logout
        </Button>
    )
}

export default LogoutButton