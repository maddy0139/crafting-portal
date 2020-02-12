import { RouteComponentProps } from 'react-router-dom';
export default interface IAppProps extends RouteComponentProps<any> {
    userInformation: any
    showSuccessMessage: any
}