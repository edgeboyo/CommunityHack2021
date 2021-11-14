

import React, {FC, useLayoutEffect} from 'react';
import { useState, useEffect } from 'react';
import { Button, Layout, Menu, Breadcrumb } from 'antd';

import './App.css';
import logoRaw from './icons/betterLogo.png';
const logo = <img src={logoRaw}/>;

const { Sider, Header, Content, Footer } = Layout;
const { SubMenu } = Menu;


const source = {
  html: `<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"></iframe>`
};


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const App: FC = () => (
    <div className="App">
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" icon={logo}></Menu.Item>
                    <Menu.Item key="2">Search</Menu.Item>
                    <Menu.Item key="3">Login / Signup</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background">
                    <iframe width="100%" height="100%" loading="lazy" allowFullScreen
                            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"></iframe>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED
                <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons-com" title="Flat-icons-com">Flat-icons-com</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Footer>
        </Layout>,
    </div>
);


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default App;
