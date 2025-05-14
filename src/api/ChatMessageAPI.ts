import { ChatMessageResponse } from "./interface/Responses";

interface responseData{
    totalPage: number;
    listMessage: ChatMessageResponse[],
    totalSize:number
}

export const getChatMessage = async (page:number,size:number): Promise<responseData> => {
    const response = await fetch(`http://localhost:8080/api/chat/history?page=${page}&size=${size}`, {
        credentials: 'include',
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
    }

    const data  = await response.json();

    const listMessage = data._embedded?.chatMessageResponseList;

    if (!listMessage || listMessage.length === 0) {
        return {
            totalPage: 0,
            listMessage: [],
            totalSize: 0
        };
    }

    const messages: ChatMessageResponse[] = listMessage.map((message: ChatMessageResponse) => ({
        sender: message.sender,
        receiver: message.receiver,
        content: message.content,
        createdAt: message.createdAt
    }));

    return {
        totalPage: data.page.totalPages,
        listMessage: messages,
        totalSize: data.page.totalElements
    };

};

