import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import UserApi from '../../apis/user-api/UserApi';
import LoaderApi from '../../apis/loader-api/loaderApi';

import Store from '../../store/configureStore';
import NotificationApi from "../../apis/notification-api/NotificationApi";

import { Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const userApi = new UserApi(Store);
const loaderApi = new LoaderApi(Store);
const notificationApi = new NotificationApi(Store);

interface ISignupProps {
    signup: any,
    history: any,
    checkUsernameAvailability: any,
    checkEmailAvailability: any,
    setSuccessNotificationMessage: any
}

interface IsignupState {
    user: IUser,
    submitted: boolean
}

interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    mobilenumber: string,
    username: string,
    password: string,
    confirmPassword: string,
}

type Userkeys = keyof IUser;

class SignupComponent extends React.Component<ISignupProps, IsignupState>{
    constructor(props: ISignupProps) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                mobilenumber: ''
            },
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        } as Pick<IsignupState, keyof IsignupState>);

    }

    handleSubmitForm(user:IUser, {setErrors, resetForm}:any) {
        this.setState({ submitted: true });
        let errors:any = {};
        this.validateUsernameAvailability(user.username).then(() => {
            this.validateEmailAvailability(user.email).then(() => {
                this.props.signup(user).then((res: any) => {
                    if (res.id) {
                        this.props.setSuccessNotificationMessage({
                            message: 'Successfully signup',
                            type: 'success'
                        });
                        this.props.history.push('/login');
                    }
                }).catch(() => {
                    this.props.setSuccessNotificationMessage({
                        message: 'Some error occured',
                        type: 'error'
                    });
                });
            }).catch((error) => {
                this.props.setSuccessNotificationMessage({
                    message: 'Some error occured',
                    type: 'error'
                });
                // errors['email'] = error;
                // setErrors(errors);    
            });
        }).catch((error) => {
            this.props.setSuccessNotificationMessage({
                message: 'Some error occured',
                type: 'error'
            });
            // errors['username'] = error;
            // setErrors(errors); 
        });
    }

    validateUsernameAvailability(username:string) {
        return new Promise((resolve, reject) => {
            this.props.checkUsernameAvailability(username).then((res: any) => {
                if (!res.available) {
                    reject(res.message);
                }
                resolve();
            }).catch((error:any) => {
                reject(error);
            });
        });
    }

    validateEmailAvailability(email:string) {
        return new Promise((resolve, reject) => {
            this.props.checkEmailAvailability(email).then((res: any) => {
                if (!res.available) {
                    reject(res.message);
                } 
                resolve();
            }).catch((error:any) => {
                reject(error);
            });
        });
    }

    render() {

        return (
            <div className="container">
                <div className="login-container">
                    <div className="login-form-wrapper">
                        <div className="login-form">
                            <h2 className="form-header">Signup</h2>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    username: '',
                                    mobilenumber: '',
                                    password: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    firstName: Yup.string()
                                        .required('First name is required'),
                                    lastName: Yup.string()
                                        .required('Last name is required'),
                                    email: Yup.string()
                                        .email('Email is invalid')
                                        .required('Email is required'),
                                    username: Yup.string()
                                        .required('User name is required')
                                        .min(5, 'Minimum 5 characters required'),
                                    mobilenumber: Yup.string()
                                        .required('Mobile number is required')
                                        .length(10, 'It should be 10 digits'),
                                    password: Yup.string()
                                        .min(6, 'Password must be at least 6 characters')
                                        .required('Password is required'),
                                    confirmPassword: Yup.string()
                                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                        .required('Confirm Password is required')
                                })}
                                onSubmit={this.handleSubmitForm}
                                render={({ errors, status, touched }) => (
                                    <FormikForm>
                                        <Form.Group>
                                            <Field name="firstName" type="text" placeholder="Enter First name" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="lastName" type="text" placeholder="Enter Last name" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="email" type="text" placeholder="Enter Email address" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="username" type="text" placeholder="Enter User name" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="mobilenumber" type="text" placeholder="Enter Mobile number" className={'form-control' + (errors.mobilenumber && touched.mobilenumber ? ' is-invalid' : '')} />
                                            <ErrorMessage name="mobilenumber" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="password" type="password" placeholder="Enter Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="confirmPassword" type="password" placeholder="Enter Confirm passowrd" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <button type="submit" className="btn btn-primary signup-btn">Signup</button>
                                            <Link to="/login" className="btn btn-link">Login</Link>
                                        </Form.Group>
                                    </FormikForm>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IsignupState, ownProps: ISignupProps) {
    return {

    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        signup: (user: IUser) => {
            return userApi.signup(user);
        },
        checkUsernameAvailability: (username: string) => {
            return loaderApi.loadWithLoader(userApi.checkUsernameAvailability, username);
        },
        checkEmailAvailability: (email: string) => {
            return loaderApi.loadWithLoader(userApi.checkEmailAvailability, email);
        },
        setSuccessNotificationMessage: (message: any) => {
            return notificationApi.setSuccessNotificationMessage(message);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
