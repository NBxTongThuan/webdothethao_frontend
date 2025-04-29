import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../api/user/OrderAPI';
import { Card, Table, Tag, Button, Select, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserName } from '../../../util/JwtService';
import { toast } from 'react-toastify';
import { Pagination } from "../../../util/Pagination";
import { OrderResponse } from '../../../api/interface/Responses';
import NumberFormat from '../../../util/NumberFormat';
import dayjs from 'dayjs';
import { useAuth } from '../../../util/AuthContext';
const { Column } = Table;
const { Option } = Select;

const MyOrder: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);

    const [filteredOrders, setFilteredOrders] = useState<OrderResponse[]>([]);
    const navigate = useNavigate();

    const {user} = useAuth();

    const setPage = (page: number) => setCurrentPage(page);


    useEffect(() => {
        getOrders(user?.userName + "", currentPage - 1, size, statusFilter)
            .then(response => {
                setOrders(response.listOrder);
                setTotalPage(response.totalPage);
            })
            .catch(error => {
                toast.error("Không lấy được thông tin người dùng!");
            });
    }, [user, currentPage, size, statusFilter]);

    useEffect(() => {
        setFilteredOrders(orders.filter((order) => {
            if (statusFilter === 'all') return true;
            return order.status === statusFilter;
        }));
    }, [statusFilter, orders]);

    const handleFilter = (value: string) => {
        setStatusFilter(value);
        setFilteredOrders(orders.filter((order) => {
            if (value === 'all') return true;
            return order.status === value;
        }));
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ xác nhận';
            case 'CONFIRMED':
                return 'Đã xác nhận';
            case 'SHIPPING':
                return 'Đang giao hàng';
            case 'DELIVERED':
                return 'Đã giao hàng';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800';
            case 'SHIPPING':
                return 'bg-purple-100 text-purple-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    return (
        <div className="container mx-auto p-4">
            <Card title="Lịch sử đơn hàng">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Lọc theo trạng thái"
                        onChange={(value) => {
                            setStatusFilter(value);
                            handleFilter(value);
                        }}
                        defaultValue="all"

                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="PENDING">Đang chờ</Option>
                        <Option value="CONFIRMED">Đã xác nhận</Option>
                        <Option value="SHIPPING">Đang giao</Option>
                        <Option value="DELIVERED">Đã giao</Option>
                        <Option value="CANCELLED">Đã hủy</Option>
                    </Select>

                    <Table dataSource={filteredOrders} rowKey="orderId" pagination={false}>
                        <Column
                            ellipsis={true}
                            title="Mã đơn hàng" dataIndex="orderId" key="orderId" />
                        <Column
                            title="Ngày đặt"
                            dataIndex="createdDate"
                            key="createdDate"
                            render={(date: string) => dayjs(date).format('DD/MM/YYYY HH:mm')}
                        />
                        {/* <Column title="Ngày giao dự kiến" dataIndex="dateExpected" key="dateExpected" /> */}
                        <Column title="Người nhận" dataIndex="toName" key="toName" />
                        <Column title="SĐT" dataIndex="toPhone" key="toPhone" />
                        <Column title="Địa chỉ" dataIndex="toAddress" key="toAddress" />
                        {/* <Column title="Ghi chú" dataIndex="orderNote" key="orderNote" /> */}
                        <Column
                            align='center'
                            title="Trạng thái" dataIndex="status" key="status"

                            render={(status) => (
                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                    {getStatusText(status)}
                                </span>
                            )}

                        />
                        <Column title="Tổng tiền" dataIndex="totalPrice" key="totalPrice"

                            render={(totalPrice) => (
                                <span className={`px-2 py-1 rounded-full text-sm font-medium`}>
                                    {NumberFormat(totalPrice)} VNĐ
                                </span>
                            )}

                        />
                        <Column
                            align='center'
                            title="Thao tác" key="action" render={(_, record) => (
                                <Button type="primary" onClick={() => navigate(`/orderDetail/${record.orderId}`)}>Xem chi tiết</Button>
                            )} />
                    </Table>
                    <Pagination currentPage={currentPage} setPage={setPage} totalPage={totalPage} />
                </Space>
            </Card>
        </div>
    );
};

export default MyOrder;
