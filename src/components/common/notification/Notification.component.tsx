import React from 'react';
import Toast from 'react-bootstrap/Toast';
import NotificationApi from '../../../apis/notification-api/NotificationApi';
import Store from '../../../store/configureStore';
import { connect } from 'react-redux';

const notificationApi = new NotificationApi(Store);

interface ISuccessNotificationProps {
    notification: any
    hideSuccessNotification: any
}
interface ISuccessNotificationState {
}
class SuccessNotification extends React.Component<ISuccessNotificationProps, ISuccessNotificationState>{
    constructor(props: ISuccessNotificationProps) {
        super(props);
        this.state = {
        };
        this.notificationOnClose = this.notificationOnClose.bind(this);
    }
    notificationOnClose() {
        this.props.hideSuccessNotification();
    }
    render() {
        const { message, type, showMessage = false } = this.props.notification;

        const successStyle = {
            color: '#155724', 
            borderColor: '#c3e6cb', 
            backgroundColor: "#d4edda"
        }

        const errorStyle = {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            borderColor: '#f5c6cb'
        }
        const notificationStyle = type === 'success' ? successStyle :  errorStyle;
        const notificationHeader = type === 'success' ? 'Success!' : 'Error!';

        return (
            <div className="notification">
                {showMessage &&
                    <Toast
                        onClose={this.notificationOnClose}
                        show={showMessage}
                        autohide={true}
                        delay={2000}>
                        <Toast.Header style={notificationStyle}>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">{notificationHeader}</strong>
                        </Toast.Header>
                        <Toast.Body style={notificationStyle}>{message}</Toast.Body>
                    </Toast>
                }
            </div>
        );
    }
}
function mapStateToProps(state: any, ownProps: any) {
    return {
        notification: notificationApi.getSuccessMessage()
    }
}
function mapDispatchToProps() {
    return {
        showSuccessNotification: (message: string) => {
            return notificationApi.setSuccessNotificationMessage(message);
        },
        hideSuccessNotification: () => {
            return notificationApi.hideSuccessNotification();
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessNotification);