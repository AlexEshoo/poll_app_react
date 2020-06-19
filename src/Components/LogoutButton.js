import React, {useContext} from 'react'
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag'
import {useMutation} from "@apollo/react-hooks";
import {UserContext} from "./UserContext";
import Spinner from "react-bootstrap/Spinner";

const LOGOUT = gql`
    mutation {
        logout {
            ok
        }
    }
`

function LogoutButton() {
    const [logout, logoutResult] = useMutation(LOGOUT)
    const {refreshUser} = useContext(UserContext)

    if (logoutResult.called) {
        if (logoutResult.loading) {
        } else {
            if (logoutResult.data.logout.ok) {
                refreshUser()  // Call this **AFTER** the mutation completes to avoid race condition
            } else {
            }
        }
    }

    return (
        <Button
            variant="danger"
            onClick={() => {
                logout()
            }}
        >
            Logout
        </Button>
    )
}

export default LogoutButton