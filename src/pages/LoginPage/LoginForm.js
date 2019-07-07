import React from 'react';
import 'antd/dist/antd.css';
import './Forms.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import ForgetForm from './ForgetForm'
import QueueAnim from 'rc-queue-anim';
import Spin from "antd/es/spin";
import {userActions} from "../../actions/userAction";
import {connect} from 'react-redux';

class loginForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        //reset login state:
        // this.props.dispatch(userActions.logout());

        this.state = {
            submitted:false,
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.setState({
                    submitted:true,
                });

                const username = values.username;
                const password = values.password;

                const{ dispatch } = this.props;

                if(username&&password){
                    dispatch(userActions.login(username,password));
                }
            }
        });
    };

    render() {
        const {loggingIn} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <QueueAnim delay={100} component="div" type="left">
                <div key='0'>
                    <div className='login-slogan'>
                        LOG IN <Icon type="key"/>
                    </div>
                    <Spin spinning={loggingIn}>
                        <Form onSubmit={this.handleSubmit} className='login-form'>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {/*调整rememberme的大小 todo*/}
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox className='checkbox'>Remember me</Checkbox>)}
                                <div className="login-form-forgot">
                                    <ForgetForm/>
                                </div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <a onClick={() => this.props.handleRegister(true)} style={{fontSize: '20px'}}>register
                                now!</a>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </QueueAnim>
        );
    }
}

const ReduxLoginForm = Form.create({
    name:'Login',
//todo onfieldchange可以把值转存到redux store中
//todo onvaluechange 可以映射到state中的username和password吗 任一表单域的值发生改变时的回调
})(loginForm);

function mapStateToProps(state){
    const { loggingIn } = state.authentication;
    return {loggingIn};//todo logging in 用来判断是否waiting
}

const LoginForm = connect(mapStateToProps)(ReduxLoginForm);

export default LoginForm ;
