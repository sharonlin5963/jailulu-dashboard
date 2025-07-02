import { TextField, Button, Box, Paper, Snackbar, Alert } from "@mui/material";
import { Logo } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { redirect, useNavigate } from "react-router";
import { auth } from "~/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getCurrentUser } from "~/firebase/auth";
import { useState } from "react";

interface SignInFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("請輸入有效的 Email").required("Email 為必填"),
  password: yup.string().min(6, "密碼至少 6 碼").required("密碼為必填"),
});

export async function clientLoader() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return redirect("/");
  }
}

const signIn = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAuthError = (errorCode: string) => {
    const errorMap = {
      "auth/invalid-email": "Email 格式不正確",
      "auth/invalid-credential": "信箱或密碼錯誤",
    };

    const errMessage = errorMap[errorCode as keyof typeof errorMap];
    if (errMessage) {
      setErrorMessage(errMessage);
    } else {
      setErrorMessage("登入失敗，請稍後再試");
    }
    setShowErrorMessage(true);
  };

  const onSubmit = async ({ email, password }: SignInFormValues) => {
    setErrorMessage("");
    setShowErrorMessage(false);
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      handleAuthError(error.code);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="w-full h-screen flex bg-[url(/assets/images/auth-img.png)] bg-cover bg-no-repeat bg-center">
      <section className="size-full bg-white/20 backdrop-filter-[blur(2px)] flex-center">
        <Paper
          elevation={3}
          sx={{
            borderRadius: "20px",
            maxWidth: { sm: "420px" },
            width: "100%",
          }}
          className="flex flex-col items-center gap-9 p-10"
        >
          <Logo />

          <Box
            component="form"
            noValidate
            className="flex flex-col gap-4 w-full"
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="密碼"
              variant="outlined"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={isLoading}
            loadingPosition="start"
            onClick={handleSubmit(onSubmit)}
          >
            登入
          </Button>
        </Paper>
      </section>

      <Snackbar
        open={showErrorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </main>
  );
};

export default signIn;
