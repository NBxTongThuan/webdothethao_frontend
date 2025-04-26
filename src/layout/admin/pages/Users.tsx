import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getUserList } from '../../../api/admin/UserAdminAPI';
import { UserResponse } from '../../../api/interface/Responses';
import { Table, Button, Tag, ConfigProvider, Modal } from 'antd';
import Column from 'antd/es/table/Column';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { X } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [showLockAccountModal, setShowLockAccountModal] = useState(false);
    const [showUnlockAccountModal, setShowUnlockAccountModal] = useState(false);
    const [flag,setFlag] = useState(false);
    const token = localStorage.getItem('token');

    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

    const handleLockAccount = async () => {
        if (selectedUser) {

            try {
                const url = `http://localhost:8080/api/account/lockAccount?userId=${selectedUser.userId}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    toast.success('Khóa tài khoản thành công');
                } else {
                    toast.error('Khóa tài khoản thất bại');
                }
                setShowLockAccountModal(false);
                setSelectedUser(null);
                setFlag(!flag);

            } catch (error) {
                toast.error('Khóa tài khoản thất bại');
            }

        }
    }

    const handleUnlockAccount = async () => {
        if (selectedUser) {

            try {
                const url = `http://localhost:8080/api/account/unLockAccount?userId=${selectedUser.userId}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    toast.success('Mở khóa tài khoản thành công');
                } else {
                    toast.error('Mở khóa tài khoản thất bại');
                }
                setShowUnlockAccountModal(false);
                setSelectedUser(null);
                setFlag(!flag);

            } catch (error) {
                toast.error('Mở khóa tài khoản thất bại');
            }

        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUserList(currentPage - 1, size);
            setUsers(response.listUser);
            setTotalPage(response.totalPage);
            setTotalSize(response.totalSize);
        };
        fetchUsers();
    }, [currentPage, size,flag]);

    return (
        <ConfigProvider getPopupContainer={() => document.body}>

            <Modal
                open={showLockAccountModal}
                onCancel={() => setShowLockAccountModal(false)}
                onOk={() => {
                    handleLockAccount();
                }}
                okText="Xác nhận"
                cancelText="Quay lại"
                centered
                okButtonProps={{
                    className: "bg-red-600 hover:bg-red-700 flex items-center justify-center",
                    icon: <CheckCircle2 className="h-4 w-4 mr-2" />
                }}
                cancelButtonProps={{
                    className: "hover:bg-gray-100 flex items-center justify-center",
                    icon: <X className="h-4 w-4 mr-2" />
                }}
                className="[&_.ant-modal-content]:p-0 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4 [&_.ant-modal-footer]:border-t [&_.ant-modal-footer]:border-gray-200 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-end [&_.ant-modal-footer]:gap-2"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận khóa tài khoản</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn khóa tài khoản này không?</p>
                </div>
            </Modal>

            <Modal
                open={showUnlockAccountModal}
                onCancel={() => setShowUnlockAccountModal(false)}
                onOk={() => {
                    handleUnlockAccount();
                }}
                okText="Xác nhận"
                cancelText="Quay lại"
                centered
                okButtonProps={{
                    className: "bg-red-600 hover:bg-red-700 flex items-center justify-center",
                    icon: <CheckCircle2 className="h-4 w-4 mr-2" />
                }}
                cancelButtonProps={{
                    className: "hover:bg-gray-100 flex items-center justify-center",
                    icon: <X className="h-4 w-4 mr-2" />
                }}
                className="[&_.ant-modal-content]:p-0 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4 [&_.ant-modal-footer]:border-t [&_.ant-modal-footer]:border-gray-200 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-end [&_.ant-modal-footer]:gap-2"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận mở khóa tài khoản</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn mở lại tài khoản này không?</p>
                </div>
            </Modal>    

            <AdminLayout>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
                    <Button type="primary" icon={<DownloadOutlined />}
                    // onClick={() => exportToExcel()}
                    >
                        Xuất báo cáo
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <Table dataSource={users}
                                pagination={{
                                    current: currentPage,
                                    total: totalSize,
                                    pageSize: size,
                                    onChange: (page, pageSize) => {
                                        setCurrentPage(page);
                                        setSize(pageSize);
                                    },
                                    showSizeChanger: true,
                                    pageSizeOptions: ['4', '8', '12', '16', '20'],
                                    showTotal: (total) => `Tổng ${total} người dùng`
                                }}
                            >
                                <Column title="Mã người dùng"
                                    dataIndex="userId"
                                    key="userId"
                                    align='center'
                                    width={150}
                                    ellipsis={true}
                                />

                                <Column title="Tên người dùng"
                                    dataIndex="username"
                                    key="username"
                                    width={150}
                                    align='center'
                                />
                                <Column title="Email"
                                    dataIndex="email"
                                    key="email"
                                    ellipsis={true}
                                    width={150}
                                    align='center'
                                />
                                <Column title="Vai trò"
                                    dataIndex="role"
                                    key="role"
                                    ellipsis={true}
                                    align='center'
                                    width={120}
                                />
                                <Column title="Kích hoạt"
                                    dataIndex="active"
                                    key="active"
                                    align='center'
                                    width={150}
                                    render={(active) => {
                                        return active ? <Tag color="green">Kích hoạt</Tag> : <Tag color="red">Không kích hoạt</Tag>
                                    }}
                                />
                                <Column title="Trạng thái"
                                    dataIndex="enable"
                                    key="enable"
                                    align='center'
                                    width={120}
                                    render={(enable) => {
                                        return enable ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Bị khóa</Tag>
                                    }}
                                />
                                <Column title="Hành động"
                                    dataIndex="action"
                                    key="action"
                                    align='center'
                                    render={(_, record:UserResponse) => (
                                        <div className="flex justify-center gap-2">
                                            <Button type="primary" className='bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-md' icon={<EyeOutlined />}
                                            >
                                                Xem chi tiết
                                            </Button>

                                            {record.enable && <Button type="primary" className='bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md' icon={<LockOutlined />}
                                                onClick={() => {
                                                    setSelectedUser(record);
                                                    setShowLockAccountModal(true);
                                                }}
                                            >
                                                Khóa tài khoản
                                            </Button>}

                                            {!record.enable && <Button type="primary" className='bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-700 px-3 py-1 rounded-md ml-2' icon={<LockOutlined />}
                                                onClick={() => {
                                                        setSelectedUser(record);
                                                        setShowUnlockAccountModal(true);
                                                }}
                                            >
                                                Mở tài khoản
                                            </Button>}
                                        </div>
                                    )}
                                />

                            </Table>


                        </div>
                    </div>
                </div>
            </AdminLayout>
        </ConfigProvider>
    );
};

export default Users; 