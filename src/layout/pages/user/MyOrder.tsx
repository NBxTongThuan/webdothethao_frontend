import React, { useEffect, useState } from 'react';
import { getOrders, OrderResponse } from '../../../api/OrderAPI';
import { Card, Table, Tag, Button, Select, Space} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserName } from '../../../util/JwtService';
import { toast } from 'react-toastify';
import { Pagination } from "../../../util/Pagination";

const { Column } = Table;
const { Option } = Select;

const MyOrder: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);

    const [filteredOrders, setFilteredOrders] = useState<OrderResponse[]>([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userName = getUserName(token+"");

    const setPage = (page: number) => setCurrentPage(page);

    
    useEffect(() => {
        getOrders(userName+"", currentPage-1, size, statusFilter)
        .then(response => {
            setOrders(response.listOrder);
            setTotalPage(response.totalPage);
        })
        .catch(error => {
            toast.error("Không lấy được thông tin người dùng!");
        });
    }, [userName, currentPage, size, statusFilter]);

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

    return (
        <div className="container mx-auto p-4">
            <Card title="Lịch sử đơn hàng">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Lọc theo trạng thái"
                        onChange={(value) => {setStatusFilter(value);
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
                        <Column title="Mã đơn hàng" dataIndex="orderId" key="orderId" />
                        <Column title="Ngày đặt" dataIndex="createdDate" key="createdDate" />
                        <Column title="Ngày giao dự kiến" dataIndex="dateExpected" key="dateExpected" />
                        <Column title="Người nhận" dataIndex="toName" key="toName" />
                        <Column title="SĐT" dataIndex="toPhone" key="toPhone" />
                        <Column title="Địa chỉ" dataIndex="toAddress" key="toAddress" />
                        <Column title="Ghi chú" dataIndex="orderNote" key="orderNote" />
                        <Column title="Trạng thái" dataIndex="status" key="status" />
                        <Column title="Tổng tiền" dataIndex="totalPrice" key="totalPrice" />
                        <Column title="Thao tác" key="action" render={(_, record) => (
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
