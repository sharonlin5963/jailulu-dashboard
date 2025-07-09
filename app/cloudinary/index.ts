export const uploadToCloudinary = async (image: File): Promise<string> => {
  const formDataImage = new FormData();
  formDataImage.append("file", image);
  formDataImage.append("upload_preset", "jailulu_product_image_upload");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgtaxvo7h/image/upload",
      { method: "POST", body: formDataImage }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
