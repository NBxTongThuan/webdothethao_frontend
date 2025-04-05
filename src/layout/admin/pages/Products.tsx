import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const Products: React.FC = () => {
    const [products] = useState([
        { id: 1, name: 'Giày Nike Air Max', category: 'Giày', price: 1200000, stock: 50, status: 'In Stock' },
        { id: 2, name: 'Áo thể thao Adidas', category: 'Áo', price: 450000, stock: 30, status: 'Low Stock' },
        { id: 3, name: 'Quần thể thao Puma', category: 'Quần', price: 350000, stock: 0, status: 'Out of Stock' },
    ]);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                    <i className="bi bi-plus-lg mr-2"></i>
                    Thêm sản phẩm
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toLocaleString('vi-VN')}đ</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                product.status === 'In Stock' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : product.status === 'Low Stock'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-500 hover:text-blue-700 mr-3">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Products; 