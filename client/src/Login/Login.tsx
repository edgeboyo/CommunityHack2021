import { Button, Checkbox, Divider, Form, Input } from "antd";
import "antd/dist/antd.css";
import { stat } from "fs";
import { useEffect, useState } from "react";
import { loginUser } from "../apiCalls/login";
import { registerUser } from "../apiCalls/register";

import "./Login.css";

export default function Login(props: any) {
  const { setToken } = props;
  return (
    <>
      <div className="row">
        <LoginForm setToken={setToken} />
        {/*<Divider  type="vertical" />*/}
        <RegisterForm />
      </div>
    </>
  );
}

const LoginForm = (props: any) => {
  const { setToken } = props;

  const [response, setResponse] = useState("");
  const onFinish = async (values: any) => {
    const resp = await loginUser(values["username"], values["password"]);

    setResponse(JSON.stringify(resp, null, "\t"));
  };

  useEffect(() => {
    console.log(response);
    console.log(setToken);
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

const RegisterForm = () => {
  const [response, setResponse] = useState("");

  const onFinish = async (values: any) => {
    const resp = await registerUser(
      values["username"],
      values["email"],
      values["password"]
    );

    setResponse(JSON.stringify(resp, null, "\t"));
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
