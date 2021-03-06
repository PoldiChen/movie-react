import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from "prop-types";
import './App.css';
import "./css/main.less";
import Layouts from "./pages/Layouts";
import PageLogin from "./pages/PageLogin";
import { LocaleProvider, message } from "antd";
import enUs from 'antd/lib/locale-provider/zh_CN'
import { API } from "./config/api.config";
import asyncFetch from "./utils/asyncFetch";

class App extends Component {

    constructor(props) {
        // console.log("App.js@constructor");
        // console.log(props);
        super(props);
        this.state = {
            login: false,
            userInfo: {},
            token: ''
        }
    }

    componentDidMount() {
        // console.log("App.js@componentDidMount");
        // console.log(this.state.token);
        // console.log(this.state.userInfo);
        this.fakeLogin();
        let url = API.get_current_user;
        asyncFetch('GET', url, {},
            (res) => {
                console.log(res);
                if (res.code === 0) {
                    // message.success("current user.");
                    // message.success(JSON.stringify(res.data));
                    this.setState(
                        {
                            login: true,
                            userInfo: res.data
                        }
                    );
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors', () => {}, false, localStorage.getItem("markerToken"));
    }

    getChildContext() {
        return {
            login: this.state.login,
            userInfo: this.state.userInfo,
            token: this.state.token,
            setLoginInfo: this.setLoginInfo
        };
    }

    setLoginInfo = (login, userInfo, token) => {
        // console.log('App.js@setLoginInfo');
        // console.log(login);
        // console.log(userInfo);
        // console.log(token);
        localStorage.setItem("markerToken", token);
        this.setState(
            {
                login: login,
                userInfo: userInfo,
                token: token
            }
        );
    };

    fakeLogin = (e) => {
        // console.log("fakeLogin");
        // e.preventDefault();

        let url = API.get_login;
        let params = {
            userName: 'jack',
            password: '123456'
        };
        asyncFetch('POST', url, params,
            (res) => {
                console.log(res.headers.get("authorization"));
                let token = res.headers.get("authorization");
                if (res.status == 200) {
                    // message.success("login success.");
                    this.fakeGetUserInfo(token);
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors', {}, true);
    };

    fakeGetUserInfo = (token) => {
        // console.log('LoginForm@getUserInfo');
        let url = API.get_current_user;
        asyncFetch('GET', url, {},
            (res) => {
                console.log(res);
                if (res.code === 0) {
                    // message.success("current user.");
                    setTimeout(() => {
                        this.setLoginInfo(true, res.data, token);
                        // this.props.history.push({
                        //     pathname: '/home'
                        // })
                    }, 1000)
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors', {}, false, token);
    };

    render() {
        // console.log("App.js@render");
        // console.log(this.state.login);
        return (
            <LocaleProvider locale={enUs}>
            {
                // this.state.login?
                <Layouts
                    setLoginInfo={this.setLoginInfo}
                />
                // :
                // <PageLogin
                //     setLoginInfo={this.setLoginInfo}
                // />
            }
            </LocaleProvider>

        );
    }
}

App.childContextTypes = {
    login: PropTypes.bool,
    userInfo: PropTypes.object,
    setLoginInfo: PropTypes.func,
    token: PropTypes.string
};


export default App;
