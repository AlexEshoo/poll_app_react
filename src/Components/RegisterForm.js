import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Spinner from "react-bootstrap/Spinner";

const REGISTER = gql`
    mutation registerUser($username: String! $password: String!) {
        register(username: $username, password: $password) {
            ok
            failReason
        }
    }
`

function RegisterForm() {
    const [register, registerResult] = useMutation(REGISTER)

    let registerResultDisplay = null

    if (registerResult.called) {
        if (registerResult.loading) {
            registerResultDisplay = <Spinner animation={"border"} variant="primary"/>
        } else {
            if (registerResult.data.register.ok) {
                registerResultDisplay = (
                    <div>
                        Registration Successful!
                    </div>
                )
            } else {
                registerResultDisplay = <div>{registerResult.data.register.failReason}</div>
            }
        }
    }

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                passwordConfirm: "",
            }}
            validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                password: Yup.string().required("Required"),
                passwordConfirm: Yup.string()
                    .oneOf([Yup.ref('password'), null], "Passwords do not match")
                    .required("Required")
            })}
            onSubmit={(values, {setSubmitting}) => {
                register(
                    {
                        variables: {
                            username: values.username,
                            password: values.password,
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
                            name="passwordConfirm"
                            as={FormControl}
                            type="password"
                            placeholder="Repeat Password"
                            isInvalid={errors.passwordConfirm}
                        />
                        <ErrorMessage name="passwordConfirm"/>
                    </FormGroup>
                    <div className="d-flex align-content-center">
                        <Button
                            type="submit"
                            variant="success"
                            disabled={!isValid || Object.keys(touched).length === 0}
                        >
                            Register
                        </Button>
                        <div style={{paddingLeft: "10px"}}>
                            {registerResultDisplay}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm