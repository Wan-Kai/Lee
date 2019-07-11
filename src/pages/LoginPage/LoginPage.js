import React, {Component} from 'react';
import {Layout} from 'antd';
import Icon from "antd/es/icon";
import './registerPage.less'
import myLogo from '../../assets/img/mlogo.png'
import {Menu} from "antd";
import Dropdown from "antd/es/dropdown";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import QueueAnim from 'rc-queue-anim';
import NewRegister from "./newRegister";
import background from "../../assets/img/backForm.png";

const {Header,Footer} = Layout;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.baidu.com/">
                English
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.baidu.com/">
                中文
            </a>
        </Menu.Item>
    </Menu>
)


class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isRegister:false,
        };
    }

    handleChangeForm(msg){
        this.setState({
            isRegister:msg,
        })
    }


    // todo 父子通信，传text
    render() {
        return (
           <div className="register-page-root">
               <div>
                   <Header style={{background: '#FFF', height: 60}}>
                       <Dropdown overlay={menu} className="register-page-global">
                           <Icon type="global" />
                       </Dropdown>
                   </Header>
                   <div className="register-page-width" >
                       <div className="register-page-content" >
                           <div className="register-page-content-form"  style={{marginTop:-150}}>
                               <div className='login-page-content'>
                                   {this.state.isRegister ?
                                       <RegisterForm key="0" handleLogin={this.handleChangeForm.bind(this)}/> :
                                       <LoginForm isLoading = {this.state.isLoading} data = {this.state.data} key="0" handleRegister={this.handleChangeForm.bind(this)}/>}
                               </div>
                           </div>
                           <div className="register-page-content-background">
                               <img src={background} className="register-page-content-background-img"/>
                           </div>
                       </div>
                   </div>

                   <Footer className="register-page-footer" style={{background: '#FFF', height: 60}}>
                       <p><img src={myLogo} className="register-page-logo"/>花旗杯创新组</p>
                   </Footer>
               </div>
           </div>
        )
    }
}

export default LoginPage;
