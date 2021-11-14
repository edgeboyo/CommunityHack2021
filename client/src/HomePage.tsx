import "antd/dist/antd.css";
import "./HomePage.css";

import { Layout, Menu, Breadcrumb } from "antd";

import logo from "./icons/betterLogo.png";

const { Header, Content, Footer } = Layout;

function HomePage() {
  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#001529",
          }}
        >
          <img src={logo} className="logo" alt="Homepage" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Search</Menu.Item>
            <Menu.Item key="2">Login / Signup</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", height: "80vh" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ height: "90%" }}>
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKeyH6vVzdEgRVp9Uu4KZl1M&key=AIzaSyBmoJGxjYSO1MToeKhfM9Cz6-dMB4i2-Tg"
              title="MainMap"
            ></iframe>
          </div>
        </Content>
        <Footer className="flex-wrapper" style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default HomePage;
