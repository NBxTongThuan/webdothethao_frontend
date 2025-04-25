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
import { UserStatsResponse, RevenueResponse } from '../../../api/interface/Responses';
import { getOrderStats, getRevenueOfMonth, getRevenueByDate } from '../../../api/admin/AdminOrderAPI';
import NumberFormat from '../../../util/NumberFormat';
import { getCountIsInStockProduct } from '../../../api/admin/ProductAdminAPI';
import { DatePicker } from 'antd';
import { format } from 'date-fns';
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

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), 'dd/MM/yyyy');
    };

    const labels = data.map((item: RevenueResponse) => formatDate(item.date)); // ví dụ: '21/04'
    const values = data.map((item: RevenueResponse) => (item.total / 1_000_000).toFixed(2)); // triệu VNĐ


    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {

        if (startDate && endDate) {
            getRevenueByDate(startDate, endDate).then(
                (data) => {
                    console.log(data);
                    setData(data);
                }
            );
        }

    }, [startDate, endDate]);

    console.log(data);

    const revenueData = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu (triệu VNĐ)',
                data: values,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
                fill: true,
            },
        ],
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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            <i className="fas fa-download mr-2"></i>
                            Xuất báo cáo
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <i className="fas fa-cog mr-2"></i>
                            Cài đặt
                        </button>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-semibold text-gray-800">Biểu đồ doanh thu</h5>
                            <DatePicker.RangePicker
                                format="DD/MM/YYYY"
                                onChange={(dates) => {
                                    if (dates) {
                                        const [start, end] = dates;
                                        if (start && end) {
                                            setStartDate(start.format('YYYY-MM-DD'));
                                            setEndDate(end.format('YYYY-MM-DD'));
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="h-80">

                           { data.length > 0 ? <Line
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(0, 0, 0, 0.05)',
                                            },
                                        },
                                        x: {
                                            grid: {
                                                display: false,
                                            },
                                        },
                                    },
                                }}
                            /> : <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Không có dữ liệu</p>
                            </div>}
                        </div>
                    </div>



                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-semibold text-gray-800">Hoạt động gần đây</h5>
                            <button className="text-blue-500 hover:text-blue-600">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-800">Đơn hàng mới #12347</p>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <i className="far fa-clock mr-1"></i>
                                        2 phút trước
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-800">Cập nhật sản phẩm</p>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <i className="far fa-clock mr-1"></i>
                                        15 phút trước
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-800">Đăng ký người dùng mới</p>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <i className="far fa-clock mr-1"></i>
                                        1 giờ trước
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-xl font-semibold text-gray-800">Đơn hàng gần đây</h5>
                        <button className="text-blue-500 hover:text-blue-600">
                            Xem tất cả
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nguyễn Văn A</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.234.000đ</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Hoàn thành
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-500 hover:text-blue-600">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12346</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trần Thị B</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.345.000đ</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Đang xử lý
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-500 hover:text-blue-600">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 