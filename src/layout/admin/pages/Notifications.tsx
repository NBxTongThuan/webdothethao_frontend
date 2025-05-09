import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect } from "react";
import { useState } from "react";
import { getAllNotifications } from "../../../api/admin/AdminNotificationAPI";
import { NotificationResponse } from "../../../api/interface/Responses";
import { Table, Button } from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";

interface ModalProps {
    onClose: () => void;
}

export const Notifications = (props: ModalProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalSize,setTotalSize] = useState(0);
    const [size,setSize] = useState(4);
    const [listNotifications,setListNotifications] = useState<NotificationResponse[]>([]);

    useEffect(() => {
        getAllNotifications(currentPage - 1, size)
        .then(response => {
            if(response){
                setListNotifications(response.listNotification);
                setTotalSize(response.totalSize);
            }
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });
    }, [currentPage, size]);

        const handlePageChange = (page: number) => {
            setCurrentPage(page);
        }

        const handleSizeChange = (size: number) => {
            setSize(size);
        }


    return (
        <AnimatePresence>
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
        >
            <motion.div
                className="bg-white rounded-xl p-8 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto "
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
           <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
           <Table
            dataSource={listNotifications}
            pagination={{
                current: currentPage,
                total: totalSize,
                pageSize: size,
                onChange: (page) => setCurrentPage(page),
                onShowSizeChange: (current, size) => setSize(size),
                showSizeChanger: true,
                pageSizeOptions: ['4', '8', '12', '16', '20'],
                showTotal: (total) => `Tổng ${total} thông báo`
            }}
            
            >
             <Column
                title="Tiêu đề"
                    dataIndex="title"
                    key="title"
                />
                <Column
                    title="Nội dung"
                    dataIndex="content"
                    key="content"
                />
                <Column
                    title="Ngày tạo"
                    dataIndex="createdDate"
                    key="createdDate"
                    render={(date: string) => dayjs(date).format('DD/MM/YYYY lúc HH:mm')}
                />
            </Table>
            <Button type="primary" onClick={() => props.onClose()}>Đóng</Button>
            </motion.div>
        </motion.div>
        </AnimatePresence>

    )
}

export default Notifications;