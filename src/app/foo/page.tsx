"use client";

import { Foo } from "@/modules/foo";
import { useSocketContext } from "@/shared/infra/socket/socket";

const FooPage = () => {
  const { socket } = useSocketContext();
  return (
    <div className="w-screen h-screen">
      <button
        onClick={() => {
          socket.emit("foo", "aaa");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default FooPage;
