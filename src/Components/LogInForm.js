import React from 'react'
import {Formik, Form, Field, ErrorMessage, useFormikContext} from "formik";
import * as Yup from 'yup'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import FormGroup from 'react-bootstrap/FormGroup'
import Button from "react-bootstrap/Button";

function LogInForm() {
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
            onSubmit={(values, {setSubmitting}) => console.log(values)}
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
                    <Button
                        type="submit"
                        variant="success"
                        disabled={!isValid || Object.keys(touched).length === 0}
                    >
                        Log In
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default LogInForm