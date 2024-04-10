import { io, Socket } from "socket.io-client";
import { refreshUserToken } from "./axios";

class SocketClient {
    socket: Socket | null;

    constructor() {
        this.socket = null;
    }

    connect() {
        if (this.socket !== null) {
            return;
        }

        this.socket = io(process.env.NEXT_PUBLIC_SOCKET_ORIGIN!, {
            auth: {
                token: localStorage.getItem("accessToken") || "",
            },
        });

        return new Promise((resolve, reject) => {
            this.socket?.on("connect", () => {
                resolve("connected");
            });
            this.socket?.on("connect_error", async (error) => {
                try {
                    await refreshUserToken();
                    this.connect();
                } catch (err: any) {
                    console.log(err);
                    reject(error);
                }
                reject(error);
            });
        });
    }

    disconnect() {
        if (this.socket === null) {
            console.error("Socket is not connected");
            return;
        }

        return new Promise((resolve, reject) => {
            this.socket?.disconnect();
            this.socket?.on("disconnect", () => {
                resolve("disconnected");
            });
        });
    }

    on(event: any, callback: any) {
        if (this.socket === null) {
            console.error("Socket is not connected");
            return;
        }

        this.socket?.on(event, callback);
    }

    emit(event: any, data?: any) {
        if (this.socket === null) {
            console.error("Socket is not connected");
            return;
        }

        this.socket?.emit(event, data);
    }

    sendMessage(roomId: string, message: any) {
        if (this.socket === null) {
            console.error("Socket is not connected");
            return;
        }

        // this.socket.to(roomId).emit("message", message);
    }

    off(event: any) {
        if (this.socket === null) {
            console.error("Socket is not connected");
            return;
        }

        this.socket?.off(event);
    }
}

export default SocketClient;
