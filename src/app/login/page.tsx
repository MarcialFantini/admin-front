"use client";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { logInUserThunk } from "@/store/slice/users/actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.users.isLogin);
  const handlerLogIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(logInUserThunk(form));
  };

  const handlerChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [event.target.name]: event.target.value });

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] ">
      <form onSubmit={handlerLogIn} className="flex flex-col gap-2 ">
        <TextField
          onChange={handlerChange}
          name="email"
          label="Email User"
        ></TextField>
        <TextField
          onChange={handlerChange}
          name="password"
          type="password"
          label="Password User"
        ></TextField>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Log in
        </Button>
      </form>
    </div>
  );
}
