import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import type { SxProps, Theme } from "@mui/material/styles";

interface UploadImageProps {
  onImageSelect: (file: File) => void;
  defaultImage?: string;
  sx?: SxProps<Theme>;
}

const UploadImage = ({
  onImageSelect,
  defaultImage,
  sx = {},
}: UploadImageProps) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    }
  }, [defaultImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    onImageSelect(file);
  };

  return (
    <Button
      component="label"
      variant="outlined"
      sx={{
        width: "100%",
        aspectRatio: "1 / 1",
        maxWidth: "350px",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        padding: 0,
        overflow: "hidden",
        margin: "auto",
        ...sx,
      }}
    >
      {image ? (
        <img
          src={image}
          alt="預覽圖片"
          className="w-full h-full object-cover aspect-square"
        />
      ) : (
        <div className="text-gray-100 flex flex-col items-center gap-1">
          <ImageIcon sx={{ fontSize: 32 }} />
          <span className="text-base font-normal">上傳圖片</span>
        </div>
      )}
      <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
    </Button>
  );
};

export default UploadImage;
