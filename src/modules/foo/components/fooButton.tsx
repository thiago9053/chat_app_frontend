type FooButtonProps = {
  buttonType: "minus" | "add";
  handler: () => void;
};

export const FooButton: React.FC<FooButtonProps> = ({
  buttonType,
  handler,
}: FooButtonProps) => {
  return (
    <button
      className="border-2 border-indigo-600 bg-white px-5 py-1"
      onClick={handler}
    >
      {buttonType === "add" ? "+" : "-"}
    </button>
  );
};
