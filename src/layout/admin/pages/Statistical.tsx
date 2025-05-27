import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { CountRateOrder, ProductResponse, TopBuyerResponse } from "../../../api/interface/Responses";
import { getCountRateOrder } from "../../../api/admin/AdminOrderAPI";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TopSaleProduct, TopSlowSaleProduct } from "../../../api/admin/ProductAdminAPI";
import { Table, Card } from "antd";
import Column from "antd/es/table/Column";
import NumberFormat from "../../../util/NumberFormat";
import { getTopBuyer } from "../../../api/admin/UserAdminAPI";
import { BarChart3, TrendingUp, TrendingDown, Users, Package, ShoppingCart } from 'lucide-react';

const Statistical: React.FC = () => {
    const [countRateOrder, setCountRateOrder] = useState<CountRateOrder>({
        orderCancel: 0,
        orderDelivered: 0,
    });
    const [topSaleProduct, setTopSaleProduct] = useState<ProductResponse[]>([]);
    const [topSlowSaleProduct, setTopSlowSaleProduct] = useState<ProductResponse[]>([]);
    const [topBuyer, setTopBuyer] = useState<TopBuyerResponse[]>([]);

    useEffect(() => {
        getCountRateOrder().then(setCountRateOrder);
        TopSaleProduct(0, 5).then(
            (response) => {
                setTopSaleProduct(response.listProduct);
            }
        );
        TopSlowSaleProduct(0, 5).then(
            (response) => {
                setTopSlowSaleProduct(response.listProduct);
            }
        );
        getTopBuyer().then(setTopBuyer);
    }, []);

    const data = [
        {
            name: "Đã hủy",
            value: countRateOrder.orderCancel
        },
        {
            name: "Đã giao",
            value: countRateOrder.orderDelivered
        }
    ];

    const COLORS = ['#FF8042', '#00C49F'];

    return (
        <AdminLayout>
            <div className="p-6 space-y-8">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Thống kê</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <ShoppingCart className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">Tổng số đơn hàng</h2>
                                <p className="text-2xl font-bold text-gray-900">{countRateOrder.orderDelivered + countRateOrder.orderCancel}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Package className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">Đơn hàng đã giao</h2>
                                <p className="text-2xl font-bold text-gray-900">{countRateOrder.orderDelivered}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Phân bố trạng thái đơn hàng</h2>
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Top 5 sản phẩm bán chạy nhất</h2>
                        </div>
                        <Table 
                            dataSource={topSaleProduct}
                            rowKey="productId"
                            className="shadow-sm"
                            pagination={false}
                            scroll={{ y: 400 }}
                        >
                            <Column align="center" ellipsis ={true} title="Mã sản phẩm" dataIndex="productId" key="productId" />
                            <Column align="center" title="Tên sản phẩm" dataIndex="productName" key="productName" />
                            <Column align="center" title="Số lượng bán" dataIndex="quantitySold" key="quantitySold" />
                        </Table>
                    </Card>

                    <Card className="shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingDown className="w-5 h-5 text-red-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Top 5 sản phẩm bán chậm nhất</h2>
                        </div>
                        <Table 
                            dataSource={topSlowSaleProduct}
                            rowKey="productId"
                            className="shadow-sm"
                            pagination={false}
                            scroll={{ y: 400 }}
                        >
                            <Column align="center" ellipsis={true} title="Mã sản phẩm" dataIndex="productId" key="productId" />
                            <Column align="center" title="Tên sản phẩm" dataIndex="productName" key="productName" />
                            <Column align="center" title="Số lượng bán" dataIndex="quantitySold" key="quantitySold" />
                        </Table>
                    </Card>
                </div>

                <Card className="shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Top 5 khách hàng mua nhiều nhất</h2>
                    </div>
                    <Table 
                        dataSource={topBuyer}
                        rowKey="userId"
                        className="shadow-sm"
                        pagination={false}
                        scroll={{ y: 400 }}
                    >
                        <Column 
                            align="center" 
                            title="Mã khách hàng" 
                            ellipsis={true}
                            dataIndex="user" 
                            key="userId"
                            render={(value) => <div>{value.userId}</div>}
                        />
                        <Column 
                            align="center" 
                            title="Tên khách hàng" 
                            dataIndex="user" 
                            key="username"
                            render={(value) => <div>{value.username}</div>}
                        />
                        <Column 
                            align="center" 
                            title="Số tiền hàng" 
                            dataIndex="totalBuy" 
                            key="totalBuy"
                            render={(value) => 
        
                                NumberFormat(value)
                                    }
                        />
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
}
export default Statistical;
