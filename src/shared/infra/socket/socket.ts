import { io } from "socket.io-client";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type socketContextTyoe = {
  socket: Socket;
};

export const socket = io(process.env.API_BASE_URL as string);

const socketContextDefaultValues: socketContextTyoe = {
  socket: socket,
};

export const SocketContext = createContext<socketContextTyoe>(
  socketContextDefaultValues
);

export const useSocketContext = () => {
  return useContext(SocketContext);
};
