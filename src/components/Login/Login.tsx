import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import LoaderApi from '../../apis/loader-api/loaderApi';
import Store from '../../store/configureStore';
import UserApi from '../../apis/user-api/UserApi';
import NotificationApi from "../../apis/notification-api/NotificationApi";
import { Form} from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loaderApi = new LoaderApi(Store);
const userApi = new UserApi(Store);
const notificationApi = new NotificationApi(Store);

interface IuserloginState {
}
interface IUserLoginProps {
    loginUser: any,
    loadUserDetails: any,
    userInformation: any,
    history: any,
    setSuccessNotificationMessage: any
}
class UserLogin extends React.Component<IUserLoginProps, IuserloginState> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.userInformation) {
            this.props.history.push("/home");
        }
    }
    componentDidUpdate(prevProps:IUserLoginProps){
        if(this.props.userInformation){
            this.props.history.push("/home");
        }
    }


    handleSubmit(fields: any) {
        const { username, password } = fields;
        if (username && password) {
            this.props.loginUser({ userName: username, password }).then((response: any) => {
                if (response && response.accessToken) {
                    this.props.setSuccessNotificationMessage({
                        message: 'Login Successfull!',
                        type: 'success'
                    });
                    this.props.loadUserDetails(username);
                }
            }).catch((error:any) => {
                console.log(error);
                if(error.errorCode === 404) {
                    this.props.setSuccessNotificationMessage({
                        message: `No user found with Username ${username}`,
                        type: 'error'
                    });
                } else {
                    this.props.setSuccessNotificationMessage({
                        message: error.message || 'Some error occured',
                        type: 'error'
                    });
                }
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="login-container">
                    <div className="login-form-wrapper">
                        <div className="login-form">
                            <h2>Login</h2>
                            {!this.props.userInformation &&
                                <Formik
                                initialValues={{
                                    username: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    username: Yup.string()
                                        .required('Username is required'),
                                    password: Yup.string()
                                        .required('Password is required'),
                                })}
                                onSubmit={fields => {
                                    this.handleSubmit(fields);
                                }}
                                render={({ errors, status, touched }) => (
                                    <FormikForm >
                                        <Form.Group>
                                            <Field name="username" type="text" placeholder="Enter Username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Field name="password" type="password" placeholder="Enter Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Link to="/signup" className="login-form-link login-form-forgot">Forgot passowrd?</Link>
                                            <button type="submit" className="btn btn-primary login-btn">Login</button>
                                            <Link to="/signup" className="btn btn-link">Register</Link>
                                        </Form.Group>
                                    </FormikForm>
                                )}
                            />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        userInformation: userApi.getUserDetails()
    }
}
function mapDispatchToProps(dispatch: any, ) {
    return {
        loginUser: (payload: any) => {
            //return userApi.loginUser(payload);
            return loaderApi.loadWithLoader(userApi.loginUser, payload);
        },
        loadUserDetails: (userId: string) => {
            return userApi.loadUserDetails(userId);
        },
        setSuccessNotificationMessage: (message: any) => {
            return notificationApi.setSuccessNotificationMessage(message);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);