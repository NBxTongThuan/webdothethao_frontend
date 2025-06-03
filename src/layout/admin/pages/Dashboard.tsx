import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { getUserStats } from '../../../api/admin/UserAdminAPI';
import { UserStatsResponse, RevenueResponse, NotificationResponse, OrderResponse, InterestResponse } from '../../../api/interface/Responses';
import { getOrderStats, getRevenueOfMonth, getRevenueByDate, getNewOrder, getInterestByDate } from '../../../api/admin/AdminOrderAPI';
import NumberFormat from '../../../util/NumberFormat';
import { getCountIsInStockProduct } from '../../../api/admin/ProductAdminAPI';
import { Button, DatePicker, Pagination, Popover, Table } from 'antd';
import { format, subDays } from 'date-fns';
import { getUnReadNotifications } from '../../../api/admin/AdminNotificationAPI';
import { NotificationProp } from '../components/NotificationProp';
import Column from 'antd/es/table/Column';
import OrderDetailAdmin from '../components/OrderDetailAdmin';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {

    const [data, setData] = useState<RevenueResponse[]>([]);
    const [data2, setData2] = useState<RevenueResponse[]>([]);

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), 'dd/MM/yyyy');
    };

    const labels = data.map((item: RevenueResponse) => formatDate(item.date)); // ví dụ: '21/04'
    const values = data.map((item: RevenueResponse) => (item.total).toFixed(2)); // triệu VNĐ
    const values2 = data2.map((item: InterestResponse) => (item.total).toFixed(2)); // triệu VNĐ
    const [listNotification, setListNotification] = useState<NotificationResponse[]>([]);
    const [totalNotificationSize, setTotalNotificationSize] = useState<number>(0);
    const [currentNotificationPage, setCurrentNotificationPage] = useState<number>(1);
    const [startDate, setStartDate] = useState<string>(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

    const [showAllNotificationModal, setShowAllNotificationModal] = useState<boolean>(false);

    const [listOrder, setListOrder] = useState<OrderResponse[]>([]);

    const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [flag, setFlag] = useState<boolean>(false);
    const [currentOrderPage, setCurrentOrderPage] = useState<number>(1);
    const [totalOrderPage, setTotalOrderPage] = useState<number>(0);
    const [totalOrderSize, setTotalOrderSize] = useState<number>(0);
    const [orderSize, setOrderSize] = useState<number>(4);
    const [notificationFlag, setNotificationFlag] = useState<boolean>(false);
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
        }
    }

    useEffect(() => {
        getNewOrder(currentOrderPage - 1, orderSize).then((response) => {
            setListOrder(response.listOrder);
            setTotalOrderPage(response.totalPage);
            setTotalOrderSize(response.totalSize);
        });
    }, [flag]);

    useEffect(() => {
        getUnReadNotifications(currentNotificationPage - 1, 5).then(response => {
            setListNotification(response.listNotification);
            setTotalNotificationSize(response.totalSize);
        });
    }, [currentNotificationPage, notificationFlag]);

    useEffect(() => {

        if (startDate && endDate) {
            getRevenueByDate(startDate, endDate).then(
                (data) => {
                    setData(data);
                }
            );
        }

    }, [startDate, endDate, flag]);

    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    useEffect(() => {
        data.forEach(item => {
            setTotalRevenue(prev => prev + item.total);
        });
    }, [data]);

    

    const [totalInterest, setTotalInterest] = useState<number>(0);

    useEffect(() => {
        setTotalInterest(0);
        data2.forEach(item => {
            setTotalInterest(prev => prev + item.total);
        });
    }, [data2]);


    useEffect(() => {
        if (startDate && endDate) {
            getInterestByDate(startDate, endDate).then(
                (data) => {
                    setData2(data);
                }
            );
        }
    }, [startDate, endDate, flag]);

    const revenueData = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: values.map(v => String(v)),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Tiền lãi (VNĐ)',
                data: values2.map(v => String(v)),
                borderColor: 'rgb(206, 24, 24)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4,
                fill: true,
            }
        ]
    };



    const [userStats, setUserStats] = useState<UserStatsResponse | null>(null);

    useEffect(() => {
        getUserStats().then(setUserStats);
    }, []);

    const [orderStats, setOrderStats] = useState<number>(0);

    useEffect(() => {
        getOrderStats().then(setOrderStats);
    }, []);

    const [revenueOfMonth, setRevenueOfMonth] = useState<number>(0);

    useEffect(() => {
        getRevenueOfMonth().then(setRevenueOfMonth);
    }, []);

    const [countIsInStockProduct, setCountIsInStockProduct] = useState<number>(0);

    useEffect(() => {
        getCountIsInStockProduct().then(setCountIsInStockProduct);
    }, []);



    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <Popover
                            content={
                                <div className="w-80 max-h-96 overflow-y-auto">
                                    {listNotification.length > 0 ? (
                                        listNotification.map((notification) => (
                                            <NotificationProp key={notification.notificationId} notification={notification} setNotificationFlag={() => setNotificationFlag(!notificationFlag)} />
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            Không có thông báo mới
                                        </div>
                                    )}
                                    <Pagination
                                        className='mt-4 justify-end w-full'
                                        current={currentNotificationPage}
                                        total={totalNotificationSize}
                                        pageSize={5}
                                        onChange={(page) => setCurrentNotificationPage(page)}
                                    />

                                    <div className='mt-4'>
                                        <Button type='primary' onClick={() => setShowAllNotificationModal(true)}>Tất cả thông báo</Button>
                                    </div>
                                </div>

                            }
                            trigger="hover"
                            placement="bottomRight"
                        >
                            <Button>
                                <i className="fas fa-bell mr-2"></i>
                                Thông báo
                                {listNotification.length > 0 && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                                        {listNotification.length}
                                    </span>
                                )}

                            </Button>
                        </Popover>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center">
                            <div className="p-4 rounded-xl bg-blue-100">
                                <i className="fas fa-users text-blue-500 text-2xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Tổng số người dùng</p>
                                <h3 className="text-2xl font-bold text-gray-800">{userStats?.currentMonthTotal}</h3>
                                <p className="text-sm text-green-500 flex items-center">

                                    <i className="fas fa-arrow-up mr-1"> </i>
                                    {userStats?.percentChange}% so với tháng trước
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center">
                            <div className="p-4 rounded-xl bg-green-100">
                                <i className="fas fa-shopping-cart text-green-500 text-2xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Đơn hàng mới</p>
                                <h3 className="text-2xl font-bold text-gray-800">{orderStats}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <i className="far fa-clock mr-1"></i>
                                    Hôm nay
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">

                        <div className="flex items-center">
                            <div className="p-4 rounded-xl bg-yellow-100">
                                <i className="fas fa-dollar-sign text-yellow-500 text-2xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Doanh thu</p>
                                <h3 className="text-2xl font-bold text-gray-800">{NumberFormat(revenueOfMonth)} VNĐ</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <i className="far fa-calendar mr-1"></i>
                                    Tháng này
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center">
                            <div className="p-4 rounded-xl bg-purple-100">
                                <i className="fas fa-box text-purple-500 text-2xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Sản phẩm</p>
                                <h3 className="text-2xl font-bold text-gray-800">{countIsInStockProduct}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    Đang bán
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-semibold text-gray-800">Biểu đồ doanh thu từ ngày {startDate} đến ngày {endDate}</h5>
                            <DatePicker.RangePicker
                                format="DD/MM/YYYY"
                                onChange={(dates) => {
                                    if (dates) {
                                        const [start, end] = dates;
                                        if (start && end) {
                                            setStartDate(start.format('YYYY-MM-DD'));
                                            setEndDate(end.format('YYYY-MM-DD'));
                                        }
                                    } else {
                                        setStartDate(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
                                        setEndDate(format(new Date(), 'yyyy-MM-dd'));
                                    }
                                }}
                            />
                        </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
                                    <div className='bg-white p-2 rounded-lg shadow-md'>
                                        <h3 className="text-lg font-semibold text-gray-700">Tổng doanh thu</h3>
                                        <p className="text-2xl font-bold text-blue-600">{NumberFormat(totalRevenue)} VNĐ</p>
                                    </div>
                                    <div className='bg-white p-2 rounded-lg shadow-md'> 
                                        <h3 className="text-lg font-semibold text-gray-700">Tổng lãi</h3>
                                        <p className="text-2xl font-bold text-red-600">{NumberFormat(totalInterest)} VNĐ</p>
                                    </div>
                                    
                                </div>

                        <div className="h-80">
                            {data.length > 0 ? (
                                <Line
                                    data={revenueData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function(context) {
                                                        return `${context.dataset.label}: ${NumberFormat(Number(context.raw))} VNĐ`;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                grid: {
                                                    color: 'rgba(0, 0, 0, 0.05)',
                                                },
                                                ticks: {
                                                    callback: function(value) {
                                                        return NumberFormat(Number(value)) + ' VNĐ';
                                                    }
                                                }
                                            },
                                            x: {
                                                grid: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }}
                                />
                                
                                
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">Không có dữ liệu</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xl font-semibold text-gray-800">Đơn hàng gần đây</h5>
                        <Link to="/admin/orders">
                            <Button type="primary">Xem tất cả</Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <Table
                            dataSource={listOrder}
                            rowKey="orderId"
                            className="shadow-sm"

                            pagination={{
                                current: currentOrderPage,
                                total: totalOrderSize,
                                pageSize: orderSize,
                                onChange: (page) => setCurrentOrderPage(page),
                                onShowSizeChange: (current, size) => setOrderSize(size),
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
                        {
                            showAllNotificationModal &&
                            (<Notifications
                                onClose={() => setShowAllNotificationModal(false)}
                            />)
                        }
                    </div>
                </div>
                {/* <ChatBox /> */}
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 