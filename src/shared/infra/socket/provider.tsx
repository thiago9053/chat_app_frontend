import { SocketContext, socket } from "./socket";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function SocketProvider({ children }: Props) {
  const value = {
    socket: socket,
  };
  return (
    <>
      <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    </>
  );
}
