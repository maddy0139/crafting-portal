import React from 'react';
import { connect } from "react-redux";
import LoaderAPi from '../../apis/loader-api/loaderApi';
import store from '../../store/configureStore';

const loaderApi = new LoaderAPi(store);

interface ILoaderProps {
    isLoading: boolean
}


class LoaderComponent extends React.Component<ILoaderProps, {}>{
    constructor(props: ILoaderProps) {
        super(props);
        this.state = {
        };
    }
    getLoaderView() {
        if (this.props.isLoading) {
            return (
                <div className="ds-alert-loader">
                    <div className="ds-loader-new">
                        <div className="ds-loader-new__item">
                            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                            </svg>
                            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                            </svg>
                            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div>
                {this.getLoaderView()}
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        isLoading: loaderApi.isLoading()
    }
}

export default connect(mapStateToProps)(LoaderComponent);
