import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title } = Typography;

const LoginAdmin: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {

        const url = 'http://localhost:8080/api/admin/account/Login';
        const data = {
            userName: values.username,
            passWord: values.password
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.jwt);
                toast.success('Đăng nhập thành công');
                navigate('/admin/dashboard');
            } else {
               if(response.status === 403)
               {
                toast.error('Bạn không có quyền truy cập trang này!');
               }else{
                toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
               }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
            }}
        >
            <Card
                className="w-full max-w-md p-6"
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
            >
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/images/logo192.png"
                        alt="Logo"
                        style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "contain",
                        }}
                    />
                    <Title level={2} style={{ color: '#1890ff', marginBottom: 0 }}>
                        Đăng nhập quản trị
                    </Title>
                </div>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                        className="mb-6"
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Tên đăng nhập"
                            size="large"
                            style={{ borderRadius: '4px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        className="mb-6"
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                            size="large"
                            style={{ borderRadius: '4px' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                            style={{
                                height: '40px',
                                fontSize: '16px',
                                borderRadius: '4px'
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginAdmin;
