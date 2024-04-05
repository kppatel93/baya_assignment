import React, { useState } from "react";
import "./Login.css";
import Comments from "../Comments/Comments";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title, Link } = Typography;

export default function LoginForm() {
  const [userLogin, setUserLogin] = useState(false);

  const MOCK_LOGIN_INFO = {
    username: "baya_user",
    password: "baya@123",
    fullName: "Baya User",
  };

  const onFinish = (values) => {
    if (
      values.username === MOCK_LOGIN_INFO.username &&
      values.password === MOCK_LOGIN_INFO.password
    ) {
      window.sessionStorage.setItem("login", true);
      setUserLogin(true);
    } else {
      alert("Enter Valid Login Details");
    }
  };

  const onLogout = () => {
    setUserLogin(false);
    window.sessionStorage.removeItem("login");
  }

  const styles = {
    container: {
      margin: "0 auto",
      padding: "0 32px",
      width: "380px",
      height: "70%",
      backgroundColor: "white",
    },
    footer: {
      marginTop: "24px",
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: "32px",
    },
    section: {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      padding: "25px 15px",
    },
    text: {
      color: "rgba(0, 0, 0, 0.65)",
    },
    title: {
      fontSize: "30px",
    },
  };

  const isUserLogin = window.sessionStorage.getItem("login") || userLogin;
  console.log(isUserLogin);

  return (
    <div style={{width: "100%" }}>
      {isUserLogin ? (
        <div className="navbar">
          <nav className="nav-link">
            <p>
              Hi, {MOCK_LOGIN_INFO.fullName} 
            </p>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </nav>
          <Comments />
        </div>
      ) : (
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Title style={styles.title}>Sign in</Title>
            </div>
            <Form
              name="normal_login"
              onFinish={onFinish}
              layout="vertical"
              requiredMark="optional"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a style={styles.forgotPassword} href="/#">
                  Forgot password?
                </a>
              </Form.Item>
              <Form.Item style={{ marginBottom: "0px" }}>
                <Button block="true" type="primary" htmlType="submit">
                  Log in
                </Button>
                <div style={styles.footer}>
                  <Text style={styles.text}>Don't have an account?</Text>{" "}
                  <Link href="/#">Sign up now</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </section>
      )}
    </div>
  );
}
