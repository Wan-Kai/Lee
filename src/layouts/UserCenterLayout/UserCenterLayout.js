import React, {Component, component} from 'react';
import {Layout, Menu, Icon, SubMenu, Dropdown, Avatar} from 'antd';
import './UserCenterLayout.less';
import mlogo from "../../assets/img/mlogo.png";
import Badge from "antd/es/badge";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import ExceptionsPage from '../../pages/ExceptionPages/Exceptions'
import {userActions} from "../../actions/userAction";

const {Header,Footer,Content} = Layout;

const MenuUser = (
    <Menu>
        <Menu.Item>
            <a target="/user" rel="noopener noreferrer">
                个人中心
            </a>
            <a target="_blank" rel="noopener noreferrer">
                未读消息
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                个人信息
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                设置
            </a>
        </Menu.Item>

    </Menu>
);

const StillNotLogin = (
    <Menu>
        <Menu.Item>
            <a href="#login" rel="noopener noreferrer">
                login now!
            </a>
        </Menu.Item>
    </Menu>
)

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                中文
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                English
            </a>
        </Menu.Item>

    </Menu>
);

class userCenterLayout extends Component {



    handleValidator(){
        //todo  会不会很占资源？？
        const{loggedIn} = this.props
        if(!loggedIn){
            let token = localStorage.getItem("token")
            console.log("in if",loggedIn)
            if(token){
                console.log("in token if ",loggedIn)
                userActions.checkLogin(token)
                console.log("in after action ",loggedIn)
            }
        }
    }

    render() {
        console.log("in render")
        const {children, loggedIn} = this.props;
        return (
            <Layout>
                <Header style={{background: '#FFF', height: 60}} className="user-header">
                    <Menu
                        theme="light"
                        mode="horizontal"
                        className="user-menu"
                        defaultSelectedKeys={['1']}

                        style={{lineHeight: '60px', height: 60}}>

                        <Menu.Item key="1">企业本页</Menu.Item>
                        <Menu.Item key="2">信息</Menu.Item>
                        <Menu.Item key="3">设置</Menu.Item>

                        <img className="user-logo" src={mlogo}/>
                        <div className='menu-float-right'>
                            <Dropdown overlay={loggedIn ? MenuUser : StillNotLogin}>
                                <span style={{marginRight: '1em'}}>
                                    <Badge count={1}>
                                        <Avatar icon="user"/>
                                    </Badge>
                                </span>
                            </Dropdown>

                            <Dropdown overlay={menu}>
                                <a href="#">
                                    语言 <Icon type="global"/>
                                </a>
                            </Dropdown>
                        </div>
                    </Menu>
                </Header>
                <Content>
                    {loggedIn?console.log("true"):this.handleValidator()}
                    {loggedIn?children:<ExceptionsPage status="403"/>}
                </Content>
                <Footer style={{background: '#FFF'}} className="user-footer">Copyright by Wan</Footer>
            </Layout>
        )
    }
}

function mapSateToProps(state) {
    const {loggedIn} = state.authentication
    return {loggedIn}

}

const UserCenterLayout = connect(mapSateToProps)(userCenterLayout)

export default UserCenterLayout;
