"use client";

import { FooButton } from "@/modules/foo/components/fooButton";
import { increment, decrement } from "./slices";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import { Value } from "@/modules/foo/components/value";

export const Foo = () => {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  return (
    <div className="flex space-x-4">
      <FooButton
        buttonType="minus"
        handler={() => {
          dispatch(decrement());
        }}
      ></FooButton>
      <Value value={count} />
      <FooButton
        buttonType="add"
        handler={() => {
          dispatch(increment());
        }}
      ></FooButton>
    </div>
  );
};
