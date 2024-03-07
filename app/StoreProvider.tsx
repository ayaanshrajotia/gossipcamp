"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import SocketClient from "./utils/SocketClient";

export const socket = new SocketClient();

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>{children}</Provider>;
}