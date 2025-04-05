import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
        { path: '/admin/users', icon: 'bi-people', label: 'Quản lý người dùng' },
        { path: '/admin/products', icon: 'bi-box', label: 'Quản lý sản phẩm' },
        { path: '/admin/orders', icon: 'bi-cart', label: 'Quản lý đơn hàng' },
        { path: '/admin/categories', icon: 'bi-tags', label: 'Quản lý danh mục' },
        { path: '/admin/settings', icon: 'bi-gear', label: 'Cài đặt' },
    ];

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen">
            <div className="p-4">
                <h4 className="text-xl font-semibold text-center">Admin Panel</h4>
            </div>
            <nav className="mt-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                            location.pathname === item.path ? 'bg-gray-700 text-white' : ''
                        }`}
                    >
                        <i className={`bi ${item.icon} mr-3`}></i>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar; 