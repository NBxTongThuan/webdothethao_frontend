import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../util/AuthContext';
import { Popover, Button, Space, Avatar, Tooltip } from 'antd';
import { 
    UserOutlined, 
    LogoutOutlined, 
    DashboardOutlined,
    TeamOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();

    const getInitials = (name: string) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const getRandomColor = (name: string) => {
        const colors = [
            '#f56a00', '#7265e6', '#ffbf00', '#00a2ae',
            '#712fd1', '#eb2f96', '#13c2c2', '#52c41a'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { path: '/admin/users', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
        { path: '/admin/products', icon: <ShoppingOutlined />, label: 'Quản lý sản phẩm' },
        { path: '/admin/orders', icon: <ShoppingCartOutlined />, label: 'Quản lý đơn hàng' },
        { path: '/admin/categories', icon: <TagsOutlined />, label: 'Quản lý danh mục' },
        { path: '/admin/types', icon: <AppstoreOutlined />, label: 'Quản lý thể loại' },
    ];

    return (
        <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen transition-all duration-300 ease-in-out relative`}>
            <div className="absolute right-0 top-4">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white hover:text-blue-400"
                />
            </div>
            
            <div className="p-4">
                <div className="flex items-center justify-center mb-6">
                    <img 
                        src="/images/logo192.png" 
                        alt="logo" 
                        className={`transition-all duration-300 ${collapsed ? 'w-10' : 'w-24'}`}
                    />
                </div>
                
                <div className="flex items-center justify-center mb-6">
                    <Popover
                        content={
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button
                                    type="text"
                                    danger
                                    icon={<LogoutOutlined />}
                                    onClick={() => {
                                        logout();
                                        navigate('/admin');
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            </Space>
                        }
                        trigger="hover"
                        placement="bottom"
                    >
                        <div className="cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors flex items-center gap-2">
                            <Avatar 
                                style={{ 
                                    backgroundColor: getRandomColor(user?.userName || ''),
                                    verticalAlign: 'middle',
                                    fontSize: '18px'
                                }}
                                size="large"
                            >
                                {getInitials(user?.userName || '')}
                            </Avatar>
                            {!collapsed && (
                                <h4 className="text-xl font-semibold text-center text-white truncate">
                                    {user?.userName}
                                </h4>
                            )}
                        </div>
                    </Popover>
                </div>
            </div>

            {!collapsed && (
                <div className="px-5 mb-6">
                    <h4 className="text-xl font-semibold text-center text-blue-400">Admin Panel</h4>
                </div>
            )}

            <nav className="mt-4">
                {menuItems.map((item) => (
                    <Tooltip 
                        title={collapsed ? item.label : ''} 
                        placement="right"
                        key={item.path}
                    >
                        <Link
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ${
                                location.pathname === item.path 
                                    ? 'bg-blue-600 text-white border-r-4 border-blue-400' 
                                    : ''
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {!collapsed && (
                                <span className="ml-3">{item.label}</span>
                            )}
                        </Link>
                    </Tooltip>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar; 