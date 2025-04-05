import React from 'react';
import Sidebar from './Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, Users, Products, Orders, Categories, Settings } from '../index';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     const isAdmin = /* logic kiểm tra quyền admin */;
    
//     if (!isAdmin) {
//         return <Navigate to="/login" />;
//     }
    
//     return <>{children}</>;
// };

export default AdminLayout; 