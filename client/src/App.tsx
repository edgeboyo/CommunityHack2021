

import React, {FC, useLayoutEffect} from 'react';
import { useState, useEffect } from 'react';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
import Login from 'ant-design-pro/lib/Login';
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
/*
function App(): JSX.Element {
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                    Content
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>);
}
*/

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

/*
function App() {
    const [wdth, hght] = useWindowSize();

    return (
        <div className="App">
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={logo} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={logo} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={logo} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>,
            mountNode,
        </div>
    );
}
*/

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


/*
<div className="App">
    <Layout>
        <Header>header</Header>
        <Layout>
            <Sider width={wdth*0.2}>left sidebar</Sider>
            <Content>
                <Button type="primary">Search</Button>
                <iframe loading="lazy" allowFullScreen
                        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"></iframe>
            </Content>
            <Sider width={wdth*0.2}>right sidebar</Sider>
        </Layout>
        <Footer>footer</Footer>
    </Layout>
</div>
*/


/*
<Layout>
    <Header>header</Header>
    <Layout>
        <Sider width={wdth*0.2}>left sidebar</Sider>
        <Content>
            <Button type="primary">Search</Button>
            <iframe loading="lazy" allowFullScreen
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"></iframe>
        </Content>
        <Sider width={wdth*0.2}>right sidebar</Sider>
    </Layout>
    <Footer>footer</Footer>
</Layout>
*/

export default App;
