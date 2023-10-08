type ValueProps = {
  value: number | string;
};

export const Value: React.FC<ValueProps> = ({ value }: ValueProps) => {
  return (
    <div className="text-red-500 text-[22px] font-bold w-[50px]">{value}</div>
  );
};
