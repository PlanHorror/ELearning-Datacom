export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  console.log("Check part frontend side: ", cleanPath)
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/coupons/${cleanPath}`;
};
