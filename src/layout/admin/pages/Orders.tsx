import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Table, Card, Select, Space, Input, Button } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import { OrderResponse } from '../../../api/interface/Responses';
import { getAllOrders } from '../../../api/admin/AdminOrderAPI';
import { toast } from 'react-toastify';
import OrderDetailAdmin from '../components/OrderDetailAdmin';
import NumberFormat from '../../../util/NumberFormat';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Column from 'antd/es/table/Column';
import dayjs from 'dayjs';

const { Option } = Select;

const Orders: React.FC = () => {


    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(4);
    const [selectedItem, setSelectedItem] = useState('');
    const [totalElement, setTotalElement] = useState<number>(0);
    const [flag, setFlag] = useState(false);

    const [filteredOrders, setFilteredOrders] = useState<OrderResponse[]>([]);

    const exportToExcel = () => {
        const exportData = filteredOrders.map(order => ({
            "Mã đơn hàng": order.orderId,
            "Ngày đặt": order.createdDate,
            "Người nhận": order.toName,
            "SĐT": order.toPhone,
            "Trạng thái": getStatusText(order.status),
            "Tổng tiền": NumberFormat(order.totalPrice) + " VNĐ"
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Đơn hàng");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, `don_hang_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    useEffect(() => {
        getAllOrders(currentPage - 1, size, statusFilter)
            .then(response => {
                setOrders(response.listOrder);
                setTotalElement(response.totalSize);
            })
            .catch(
                error => {
                    toast.error("Không lấy được danh sách!");
                }
            )
    }, [currentPage, size, statusFilter, flag]);


    useEffect(() => {
        setFilteredOrders(orders.filter((order) => {
            if (statusFilter === 'all') return true;
            return order.status === statusFilter;
        }))
    }, [statusFilter, orders])

    const handleFilter = (value: string) => {
        setStatusFilter(value);
        setFilteredOrders(orders.filter((order) => {
            if (value === 'all') return true;
            return order.status === value;
        }));
    }

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
                return 'bg-yellow-500';
            case 'CONFIRMED':
                return 'bg-green-500';
            case 'SHIPPING':
                return 'bg-blue-500';
            case 'DELIVERED':
                return 'bg-purple-500';
            case 'CANCELLED':
                return 'bg-red-500';
        }
    }

    return (
        <AdminLayout>
            <div className="container mx-auto p-4">
                <Card title="Quản lý đơn hàng" className="shadow-lg">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-4">
                                <Input
                                    placeholder="Tìm kiếm đơn hàng..."
                                    prefix={<SearchOutlined />}
                                    style={{ width: 300 }}
                                />
                                <Select
                                    style={{ width: 200 }}
                                    placeholder="Lọc theo trạng thái"
                                    onChange={(value) => {
                                        setStatusFilter(value);
                                        handleFilter(value);
                                    }
                                    }
                                    defaultValue="all"
                                >
                                    <Option value="all">Tất cả</Option>
                                    <Option value="PENDING">Chờ xác nhận</Option>
                                    <Option value="CONFIRMED">Đã xác nhận</Option>
                                    <Option value="SHIPPING">Đang giao hàng</Option>
                                    <Option value="DELIVERED">Đã giao hàng</Option>
                                    <Option value="CANCELLED">Đã hủy</Option>
                                </Select>
                                <Button icon={<FilterOutlined />}>
                                    Bộ lọc
                                </Button>
                            </div>
                            <Button type="primary" icon={<DownloadOutlined />}
                                onClick={() => exportToExcel()}
                            >
                                Xuất báo cáo
                            </Button>
                        </div>

                        <Table
                            dataSource={filteredOrders}
                            rowKey="id"
                            className="shadow-sm"

                            pagination={{
                                current: currentPage,
                                total: totalElement,
                                pageSize: size,
                                onChange: (page) => setCurrentPage(page),
                                onShowSizeChange: (current, size) => setSize(size),
                                showSizeChanger: true,
                                pageSizeOptions: ['4', '8', '12', '16', '20'],
                                showTotal: (total) => `Tổng ${total} đơn hàng`
                            }}
                            scroll={{ y: 600 }}
                        >
                            <Column
                                title="Mã đơn hàng"
                                align='center'
                                dataIndex="orderId"
                                key="orderId"
                                ellipsis={true}
                            />
                            <Column
                                title="Ngày đặt"
                                align='center'
                                dataIndex="createdDate"
                                key="createdDate"
                                width={120}
                                render={(createdDate) => (
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${createdDate}`}>
                                        {dayjs(createdDate).format('DD/MM/YYYY HH:mm')}
                                    </span>
                                )}
                            // ellipsis={true}
                            />
                            {/* <Column
                                title="Ngày giao dự kiến"
                                dataIndex="dateExpected"
                                key="dateExpected"
                                ellipsis={true}
                            /> */}
                            <Column
                                title="Người nhận"
                                align='center'
                                dataIndex="toName"
                                key="toName"
                                width={180}
                                ellipsis={true}
                            />
                            <Column
                                title="SĐT"
                                align='center'
                                dataIndex="toPhone"
                                key="toPhone"
                                ellipsis={true}
                                render={(toPhone) => (
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${toPhone}`}>
                                        {toPhone.toLocaleString("vi-VN")}
                                    </span>
                                )}
                            />
                            {/* <Column
                                title="Địa chỉ"
                                dataIndex="toAddress"
                                key="toAddress"
                                ellipsis={true}
                            /> */}
                            {/* <Column
                                title="Ghi chú"
                                dataIndex="orderNote"
                                key="orderNote"
                                ellipsis={true}
                            /> */}
                            <Column
                                title="Trạng thái"
                                align='center'
                                dataIndex="status"
                                key="status"
                                width={190}
                                render={(status) => (
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                        {getStatusText(status)}
                                    </span>
                                )}
                            />
                            <Column
                                title="Tổng tiền"
                                align='center'
                                dataIndex="totalPrice"
                                key="totalPrice"
                                width={190}
                                ellipsis={true}
                                render={(totalPrice) => (
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${totalPrice}`}>
                                        {NumberFormat(totalPrice)} VNĐ
                                    </span>
                                )}
                            />
                            <Column
                                title="Thao tác"
                                align='center'
                                key="action"
                                render={(_, record) => (
                                    <Button type="primary" onClick={
                                        () => {
                                            setSelectedItem(record.orderId);
                                            setShowOrderDetail(true);
                                        }}
                                    >Xem chi tiết</Button>
                                )}
                            />
                        </Table>
                        {
                            showOrderDetail &&
                            (<OrderDetailAdmin
                                orderId={selectedItem}
                                onClose={() => {
                                    setShowOrderDetail(false);
                                }}
                                setFlag={() => setFlag(!flag)}
                            />)
                        }
                    </Space>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Orders; 