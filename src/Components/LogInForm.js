import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
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
            <Form>
                <FormGroup>
                    <Field name="username" placeholder="Username" as={FormControl}/>
                    <ErrorMessage name="username"/>
                </FormGroup>
                <FormGroup>
                    <Field name="password" type="password" placeholder="Password" as={FormControl}/>
                    <ErrorMessage name="password"/>
                </FormGroup>
                <FormGroup>
                    <Field name="rememberMe" as={FormCheck} label="Remember Me"/>
                </FormGroup>
                <Button type="submit" variant="success">Log In</Button>
            </Form>

        </Formik>
    )
}

export default LogInForm