export const calculateDiscountedPrice = (point: number, discountRate: number | null): number => {
  if (!discountRate) return point;
  return point - point * (discountRate / 100);
};
