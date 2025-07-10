import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { Alert, Header, UploadImage } from "components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase/config";
import { useNavigate, type LoaderFunctionArgs } from "react-router";
import { useParams } from "react-router";
import type { Route } from "./+types/product-edit";
import { uploadToCloudinary } from "~/cloudinary";

interface InitialProduct {
  name: string;
  describe: string;
  group: string;
  price: number;
  isSale: boolean;
  specialPrice: number;
  createdAt: string;
  id: string;
  imageUrl: string;
  status: 0 | 1;
}
interface ProductCreate {
  name: string;
  describe: string;
  group: string;
  price: number;
  isSale: boolean;
  specialPrice: number;
}
export interface Group {
  label: string;
  value: string;
}
export interface AlertState {
  message: string;
  type?: "error" | "success";
}

const schema = yup.object().shape({
  name: yup.string().required("請輸入商品名稱"),
  describe: yup.string().required("請輸入商品描述"),
  group: yup.string().required("請選擇商品分類"),
  price: yup
    .number()
    .typeError("價格必須是數字")
    .required("請輸入價格")
    .positive("價格必須大於 0"),
  isSale: yup.boolean().required(),
  specialPrice: yup
    .number()
    .default(0)
    .typeError("特價價格必須是數字")
    .when("isSale", {
      is: true,
      then: (schema) =>
        schema
          .required("請輸入特價價格")
          .moreThan(0, "特價價格必須大於 0")
          .max(yup.ref("price"), "特價不能高於原價"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const groupSnapshot = await getDocs(collection(db, "groups"));
  const groupData = groupSnapshot.docs.map((doc) => doc.data()) as Group[];

  let product: InitialProduct | null = null;
  if (id) {
    const productSnap = await getDoc(doc(db, "products", id));
    if (productSnap.exists()) {
      const data = productSnap.data();
      product = {
        ...data,
        id: productSnap.id,
        group: data.group?.value ?? "",
      } as InitialProduct;
    }
  }

  return { initialProduct: product, groups: groupData };
};

const productEdit = ({ loaderData }: Route.ComponentProps) => {
  const navigator = useNavigate();
  const { id } = useParams();

  const { initialProduct, groups } = loaderData;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [alertState, setAlertState] = useState<AlertState>({ message: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductCreate>({
    resolver: yupResolver(schema),
    defaultValues: { price: 1, specialPrice: 0, ...initialProduct },
  });

  const isSale = watch("isSale");
  const editable = initialProduct?.status === 0;

  const onSubmit = async (formData: InitialProduct | ProductCreate) => {
    if (!selectedImage && !initialProduct?.imageUrl) {
      setAlertState({ message: "請先選擇圖片", type: "error" });
      setAlertOpen(true);
      return;
    }

    const typeMsg = id ? "編輯" : "新增";

    setLoading(true);
    try {
      let imageUrl = initialProduct?.imageUrl ?? "";
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }
      const selectedGroup = groups.find(
        (group) => group.value === formData.group
      );

      const productData = {
        ...formData,
        group: selectedGroup,
        imageUrl,
        createdAt: Timestamp.now(),
        status: 0,
      };

      if (id) {
        await updateDoc(doc(db, "products", id), productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }

      setAlertState({ message: `商品${typeMsg}成功！`, type: "success" });
      setAlertOpen(true);
      navigator("/products");
    } catch (error) {
      setAlertState({ message: `${typeMsg}失敗，請稍後再試`, type: "error" });
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="wrapper dashboard">
      <Header title={`${id ? "編輯" : "新增"}商品`} />

      <section className="mt-2.5 wrapper-md">
        <Paper
          elevation={3}
          sx={{
            borderRadius: "20px",
          }}
        >
          <Box
            component="form"
            noValidate
            className="flex flex-col gap-6 w-full p-10"
          >
            <UploadImage
              defaultImage={initialProduct?.imageUrl}
              onImageSelect={(file) => setSelectedImage(file)}
              disabled={!editable}
            />

            <TextField
              label="商品名稱"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={!editable}
            />

            <TextField
              label="商品描述"
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              {...register("describe")}
              error={!!errors.describe}
              helperText={errors.describe?.message}
              defaultValue=""
              disabled={!editable}
            />

            <TextField
              select
              label="商品分類"
              variant="outlined"
              fullWidth
              {...register("group")}
              error={!!errors.group}
              helperText={errors.group?.message}
              defaultValue={initialProduct?.group}
              disabled={!editable}
            >
              {groups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="價格"
              variant="outlined"
              fullWidth
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
              type="number"
              disabled={!editable}
            />

            <FormControlLabel
              control={
                <Controller
                  name="isSale"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="特價商品"
              disabled={!editable}
            />

            {isSale && (
              <TextField
                label="特價價格"
                variant="outlined"
                fullWidth
                {...register("specialPrice")}
                error={!!errors.specialPrice}
                helperText={errors.specialPrice?.message}
                type="number"
                disabled={!editable}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={loading}
              loadingPosition="start"
              onClick={handleSubmit(onSubmit)}
              disabled={!editable}
            >
              {id ? "更新商品" : "新增商品"}
            </Button>
          </Box>
        </Paper>
      </section>

      <Alert
        open={alertOpen}
        message={alertState.message}
        severity={alertState.type}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlertOpen(false)}
      />
    </main>
  );
};

export default productEdit;
