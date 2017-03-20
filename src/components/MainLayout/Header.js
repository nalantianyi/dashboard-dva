/**
 * Created by nalantianyi on 2017/3/20.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
function Header({location}) {
    return (<Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
        <Menu.Item key="/users">
            <Link to="/users"><Icon type="bars"></Icon>Users</Link>
        </Menu.Item>
        <Menu.Item key="/">
            <Link to="/"><Icon type="home"></Icon>Home</Link>
        </Menu.Item>
        <Menu.Item key="/404">
            <Link to="/page-you-dont-know">
                <Icon type="frown-circle"></Icon>
                404
            </Link>
        </Menu.Item>
        <Menu.Item key="/antd">
            <a href="https://github.com/dvajs/dva">dva</a>
        </Menu.Item>
    </Menu>);

}
export default Header;

