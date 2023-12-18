import { SocketContext, socket } from "./socket";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function SocketProvider({ children }: Props) {
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
}
