import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes'
import { connect } from 'react-redux'
import { SYSTEM_DATA_KEY, SYSTEM_DATA_IS_AUTHENTICATED, LOGIN_KEY, LOGIN_REQEUST_SESSION_LOADING, LOGIN_REQUEST_SESSION_STATUS, STATUS, MESSAGE, SUCCESS, ERROR, SYSTEM_DATA_PAGE_TITLE } from './redux/Types';
import { sessionLogin } from './redux/login/Action';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { Loader } from './components/base_components';

class Root extends PureComponent {
    static propTypes = {

    }

    componentDidMount = () => {
        const { sessionLogin } = this.props;

        sessionLogin();
    }

    componentDidUpdate = (prevProps) => {
        const { reqeustStatus } = this.props;

        const prevReqeustStatus = prevProps && prevProps.reqeustStatus ? prevProps.reqeustStatus : {};
        if (reqeustStatus[STATUS] !== prevReqeustStatus[STATUS]) {

            const isTokenExpired = reqeustStatus[MESSAGE] && reqeustStatus[MESSAGE].data && reqeustStatus[MESSAGE].data.name === "TokenExpiredError" ? true : false;
            if (isTokenExpired) {
                ToastsStore.error("Token has been expired!");
            }

            if (!isTokenExpired)
                switch (reqeustStatus[STATUS]) {
                    case SUCCESS:

                        break;
                    case ERROR:
                        const status = reqeustStatus[MESSAGE] && reqeustStatus[MESSAGE].status ? reqeustStatus[MESSAGE].status : 500;
                        switch (status) {
                            case 409:
                                break;
                            case 404:
                                ToastsStore.error("No user found");
                                break;
                            default:
                                ToastsStore.error("Internal server error");
                        }
                        break;
                }
        }
    }

    render() {
        const { isAuthenticated, loading } = this.props;

        const data = {
            isAuthenticated: isAuthenticated
        };

        return (
            <Fragment>
                <Router>
                    {
                        loading ? <Loader /> : null
                    }
                    <Routes
                        childProps={data} />
                    <ToastsContainer store={ToastsStore} lightBackground position={ToastsContainerPosition.TOP_RIGHT} />
                </Router>
            </Fragment>
        )
    }
}

const mapToProps = ({ system_data, login }) => {
    const system_data_data = system_data && system_data[SYSTEM_DATA_KEY] ? system_data[SYSTEM_DATA_KEY] : undefined;
    const isAuthenticated = system_data_data && system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] ? system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] : false;
    const page_title = system_data_data && system_data_data[SYSTEM_DATA_PAGE_TITLE] ? system_data_data[SYSTEM_DATA_PAGE_TITLE] : false;
    const login_data = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;
    const loading = login_data && login_data[LOGIN_REQEUST_SESSION_LOADING] ? login_data[LOGIN_REQEUST_SESSION_LOADING] : false;
    const reqeustStatus = login_data && login_data[LOGIN_REQUEST_SESSION_STATUS] ? login_data[LOGIN_REQUEST_SESSION_STATUS] : {};

    if (document.title !== page_title) {
        document.title = page_title ? page_title : "Loading..."
    }

    return ({
        isAuthenticated,
        loading,
        reqeustStatus
    });
}

export default connect(mapToProps, {
    sessionLogin
})(Root);