const CLOUDINARY_PRODUCT_TRANSFORM = "w_800,q_auto,f_auto";
const CLOUDINARY_AVATAR_TRANSFORM = "w_150,h_150,c_thumb,g_face,q_auto,f_auto";

type ImageType = "product" | "avatar";

export const uploadToCloudinary = async (
  image: File,
  type: ImageType = "product"
): Promise<string> => {
  const formDataImage = new FormData();
  formDataImage.append("file", image);
  formDataImage.append("upload_preset", "jailulu_product_image_upload");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgtaxvo7h/image/upload",
      { method: "POST", body: formDataImage }
    );

    const data = await response.json();

    const transform =
      type === "avatar"
        ? CLOUDINARY_AVATAR_TRANSFORM
        : CLOUDINARY_PRODUCT_TRANSFORM;

    const optimizedUrl = data.secure_url.replace(
      "/upload/",
      `/upload/${transform}/`
    );
    return optimizedUrl;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
