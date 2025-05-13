export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/src/uploads/coupons/${cleanPath}`;
};
