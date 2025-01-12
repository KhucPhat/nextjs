export const getExpiresToken = (expiresIn?: number | null | undefined) => {
  if (!expiresIn) return expiresIn;
  return Date.now() + expiresIn * 1000;
};
