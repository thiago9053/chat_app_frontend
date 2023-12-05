export const diffInVariantFields = (obj1: any, obj2: any) => {
  const diffInFields = Object.entries(obj2).filter(
    ([field, obj2Value]) => obj1[field] !== obj2Value
  );
  return diffInFields;
};
