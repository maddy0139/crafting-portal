import React, { Component } from 'react';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import './App.css';
import IAppProps from '../interfaces/IAppProps';
import HomeComponent from '../components/Home/HomeComponent';
import GiftdetailsComponents from '../components/Gift-Details/GiftDetails';
import UserLogin from '../components/Login/Login';
import LoaderComponent from '../components/Loader/Loader.component';
import HeaderComponent from '../components/common/Header/Header.component';
import  {connect} from "react-redux";
import Store from "../store/configureStore";
import UserApi from '../apis/user-api/UserApi';
import SignupComponent from '../components/Signup/Signup.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessNotification from '../components/common/notification/Notification.component';
import CategoryList from '../admin/components/add-category/CategoryList.component';

const userApi = new UserApi(Store);

class App extends Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <LoaderComponent {...this.props} />
        <SuccessNotification {...this.props}/>
        <header>
          <HeaderComponent {...this.props}/>
        </header>
        <Switch>
          <Route exact path="/login"
            render={(props: any) => <UserLogin {...props} />}>
          </Route>
          <Route exact path="/signup"
            render={(props: any) => <SignupComponent {...props} />}>
          </Route>
          <Route exact path="/"
            render={(props) => <HomeComponent {...props} />}>
          </Route>
          <Route exact path="/home"
            render={(props) => <HomeComponent {...props} />}>
          </Route>
          <Route exact path="/gift-details"
            render={(props: any) => <GiftdetailsComponents {...props} />}>
          </Route>
          <Route exact path="/category-list"
            render={(props: any) => <CategoryList {...props} />}>
          </Route>
        </Switch>
      </div>
    );
  }
};

function mapStateToProps(state:any, ownProps:any) {
  return {
    userInformation: userApi.getUserDetails()
  }
}

function mapDispatchToProps() {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
