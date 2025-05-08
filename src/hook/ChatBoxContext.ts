import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = "http://localhost:8080/ws";

export default function useChatSocket(onMessage: (msg: any) => void) {
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      onConnect: () => {
        client.subscribe("/user/queue/messages", (message) => {
          const body = JSON.parse(message.body);
          onMessage(body);
        });
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (content: string) => {
    stompClient.current?.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({ content }),
    });
  };

  return { sendMessage };
}