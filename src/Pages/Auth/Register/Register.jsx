import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography, message } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../Config/Firebase';

const { Title } = Typography;

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const onFinish = async (values) => {
        const { fullName, email, password, confirmPassword } = values;
        const trimmedName = fullName?.trim() || '';
        const trimmedEmail = email?.trim() || '';

        if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
            return message.error("Please fill all fields!");
        }
        if (trimmedName.length < 3) {
            return message.warning("Please Enter your Full name (Min 3 characters)");
        }
        if (!isValidEmail(trimmedEmail)) {
            return message.error("Please enter a valid email");
        }
        if (password !== confirmPassword) {
            return message.error("Passwords do not match!");
        }
        if (password.length < 6) {
            return message.warning("Password should be at least 6 characters");
        }

        setIsLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            await updateProfile(user, { displayName: trimmedName });

            message.success("Account created successfully!");
            navigate("/auth/login");
        } catch (error) {
            console.error('Registration Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                message.error("User already exists with this email");
            } else {
                message.error(error.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth">
            <div className="container card p-3">
                <Title level={2} className="text-white">Register</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Full Name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input placeholder="Full Name" size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Enter Your E-mail Here" size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder=". . . . . . . ." size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                className="text-white"
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{ required: true, message: 'Please confirm your password!' }]}
                            >
                                <Input.Password placeholder=". . . . . . . ." size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={24} className="mb-3">
                            <Button
                                htmlType="submit"
                                block
                                loading={isLoading}
                                disabled={isLoading}
                                style={{ backgroundColor: "#2B4F8C", color: "white", border: "none" }}
                            >
                                Register
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
};

export default Register;