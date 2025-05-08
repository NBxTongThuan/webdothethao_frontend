import React, { useState } from 'react';
import { NotificationResponse } from "../../../api/interface/Responses";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from 'antd';
import OrderDetailAdmin from './OrderDetailAdmin';

interface NotificationPropProps {
    notification: NotificationResponse;
    setNotificationFlag: () => void;
}

export const NotificationProp: React.FC<NotificationPropProps> = ({ notification, setNotificationFlag }) => {

    const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);



    const getNotificationIcon = () => {
        if (notification.orderId) {
            return <i className="fas fa-shopping-cart text-blue-500"></i>;
        } else if (notification.userId) {
            return <i className="fas fa-user text-purple-500"></i>;
        } else {
            return <i className="fas fa-bell text-gray-500"></i>;
        }
    };

    const handleIsRead = async () => {
       const url = `http://localhost:8080/api/admin/notifications/set-read?notificationId=${notification.notificationId}`;
       const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
       });
       if (response.ok === true) {
        setNotificationFlag();
       }
    }

    const getNotificationColor = () => {
        if (notification.orderId) {
            return 'bg-blue-50 hover:bg-blue-100';
        } else if (notification.userId) {
            return 'bg-purple-50 hover:bg-purple-100';
        } else {
            return 'bg-gray-50 hover:bg-gray-100';
        }
    };

    return (

        <div className={`p-4 border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${getNotificationColor()}`}>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm">
                        {getNotificationIcon()}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {format(new Date(notification.createdDate), 'HH:mm dd/MM/yyyy', { locale: vi })}
                        </span>
                    </div>
                    {notification.content && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notification.content}
                        </p>
                    )}
                </div>
            </div>
            <Button type="primary" onClick={() => {
                setShowOrderDetail(true);
            }}>
                Xem chi tiết
            </Button>
            {showOrderDetail &&
                (<OrderDetailAdmin
                    orderId={notification.orderId}
                    onClose={() => {
                        handleIsRead();
                        setShowOrderDetail(false);
                    }}
                    setFlag={() => setFlag(!flag)}
                />)}
        </div>

    );
};
