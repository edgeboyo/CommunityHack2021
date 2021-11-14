import { Button, Checkbox, Divider, Form, Input } from "antd";
import "antd/dist/antd.css";
import { stat } from "fs";
import { useEffect, useState } from "react";
import { loginUser } from "../apiCalls/login";
import { registerUser } from "../apiCalls/register";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import "./Login.css";

export default function Login(props: any) {
  const { setToken, setUser } = props;
  return (
    <>
      <div className="row">
        <LoginForm setToken={setToken} setUser={setUser} />
        {/*<Divider  type="vertical" />*/}
        <RegisterForm setToken={setToken} setUser={setUser} />
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const LoginForm = (props: any) => {
  const { setToken, setUser } = props;

  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const resp = await loginUser(values["username"], values["password"]);

    if (resp.status === 200) {
      setToken(resp.token);
      setUser(resp.user);
      navigate("/");
    } else {
      window.alert(JSON.stringify(resp, null, "\t"));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="column"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const RegisterForm = (props: any) => {
  const { setUser, setToken } = props;
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const resp = await registerUser(
      values["username"],
      values["email"],
      values["password"]
    );

    if (resp.status === 200) {
      setToken(resp.token);
      setUser(resp.user);
      navigate("/");
    } else {
      window.alert(JSON.stringify(resp, null, "\t"));
    }
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="column"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        name="confirm-password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

RegisterForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
