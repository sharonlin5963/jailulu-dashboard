import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { UploadImage, Alert } from "components";
import { updateProfile } from "firebase/auth";
import { auth } from "~/firebase/config";
import { uploadToCloudinary } from "~/cloudinary";
interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
}
interface AlertState {
  message: string;
  type?: "error" | "success";
}

const EditProfileDialog = ({ open, onClose }: EditProfileDialogProps) => {
  const currentUser = auth.currentUser;
  const [name, setName] = useState(
    currentUser?.displayName || currentUser?.email || ""
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({ message: "" });

  useEffect(() => {
    if (open && currentUser) {
      setName(currentUser.displayName || currentUser.email || "");
      setSelectedImage(null);
    }
  }, [open]);

  const handleSave = async () => {
    if (!currentUser) {
      return;
    }

    if (!name.trim()) {
      setAlertState({ message: "名字不能為空", type: "error" });
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    try {
      let photoURL = currentUser.photoURL || "";
      if (selectedImage) {
        photoURL = await uploadToCloudinary(selectedImage);
      }

      await updateProfile(currentUser, {
        displayName: name.trim(),
        photoURL,
      });

      setAlertState({ message: "個人資料更新成功", type: "success" });
      setAlertOpen(true);
      onClose();
    } catch (error) {
      setAlertState({ message: "更新失敗，請稍後再試", type: "error" });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>編輯個人資訊</DialogTitle>
        <DialogContent>
          <div className="flex-center flex-col gap-6 p-4">
            <UploadImage
              defaultImage={currentUser?.photoURL || ""}
              onImageSelect={(file) => setSelectedImage(file)}
              sx={{ borderRadius: "100%", maxWidth: "120px" }}
            />
            <TextField
              label="暱稱 / 名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              disabled={loading}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            取消
          </Button>
          <Button variant="contained" onClick={handleSave} loading={loading}>
            儲存
          </Button>
        </DialogActions>
      </Dialog>

      <Alert
        open={alertOpen}
        message={alertState.message}
        severity={alertState.type}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default EditProfileDialog;
