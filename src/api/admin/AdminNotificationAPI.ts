import { NotificationResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/notifications';


interface responseData {
    totalPage: number;
    listNotification: NotificationResponse[],
    totalSize: number
}

export const getUnReadNotifications = async (page: number, size: number) => {
    const response = await fetch(`${API_URL}/unreadNotification?page=${page}&size=${size}`, {
        method: "GET",
        credentials: "include",
    });
    const data = await response.json();
    const listNotification = data._embedded?.notificationsResponseList;
    console.log(listNotification);
    if (!listNotification || listNotification.length === 0) {
        return {
            totalPage: 0,
            listNotification: [],
            totalSize: 0
        };
    }
    const notifications: NotificationResponse[] = listNotification.map((notification: NotificationResponse) => ({
        notificationId: notification.notificationId,
        title: notification.title,
        content: notification.content,
        createdDate: notification.createdDate,
        orderId: notification.orderId,
        userId: notification.userId,
        read: notification.read
    }));

    return {
        totalPage: data.page.totalPages,
        listNotification: notifications,
        totalSize: data.page.totalElements
    };
}