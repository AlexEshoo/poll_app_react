import React, {useContext} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import FormGroup from 'react-bootstrap/FormGroup'
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Spinner from "react-bootstrap/Spinner";
import {UserContext} from "./UserContext";

const LOGIN = gql`
    mutation loginUser($username: String! $password: String! $rememberMe: Boolean) {
        login(username: $username, password: $password, rememberMe: $rememberMe) {
            ok
            failReason
        }
    }
`

function LogInForm() {
    const {refreshUser} = useContext(UserContext)
    const [login, loginResult] = useMutation(LOGIN)

    let loginResultDisplay = null

    if (loginResult.called) {
        if (loginResult.loading) {
            loginResultDisplay = <Spinner animation={"border"} variant="primary"/>
        } else {
            if (loginResult.data.login.ok) {
                refreshUser()  // Call this **AFTER** the mutation completes to avoid race condition
            } else {
                loginResultDisplay = <div>{loginResult.data.login.failReason}</div>
            }
        }
    }

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                rememberMe: false
            }}
            validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                password: Yup.string().required("Required"),
                rememberMe: Yup.bool()
            })}
            onSubmit={(values, {setSubmitting}) => {
                login(
                    {
                        variables: {
                            username: values.username,
                            password: values.password,
                            rememberMe: values.rememberMe
                        }
                    }
                )
                setSubmitting(false)
            }}
        >
            {/*Render Props pattern...*/}
            {({isValid, errors, touched}) => (
                <Form>
                    <FormGroup>
                        <Field
                            name="username"
                            as={FormControl}
                            type="text"
                            placeholder="Username"
                            isInvalid={errors.username && touched.username}
                        />
                        <ErrorMessage name="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Field
                            name="password"
                            as={FormControl}
                            type="password"
                            placeholder="Password"
                            isInvalid={errors.password && touched.password}
                        />
                        <ErrorMessage name="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Field
                            name="rememberMe"
                            as={FormCheck}
                            label="Remember Me"
                        />
                    </FormGroup>
                    <div className="d-flex align-content-center">
                        <Button
                            type="submit"
                            variant="success"
                            disabled={!isValid || Object.keys(touched).length === 0}
                        >
                            Log In
                        </Button>
                        <div style={{paddingLeft: "10px"}}>
                            {loginResultDisplay}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LogInForm