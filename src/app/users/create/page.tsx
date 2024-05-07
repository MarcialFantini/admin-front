"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserForm } from "../../../../interfaces/usersInterfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRoleThunk } from "@/store/slice/roles/actions";
import { CreateUserThunk } from "@/store/slice/users/actions";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });
  const roles = useAppSelector((state) => state.roles.list);
  const token = useAppSelector((state) => state.users.token);
  const handlerChange = (
    event:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlerCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(CreateUserThunk({ form, token }));

    router.push("/users");
  };

  useEffect(() => {
    dispatch(getRoleThunk(token));
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-start gap-4 pt-[100px] ">
      <form onSubmit={handlerCreate} className="flex flex-col gap-4">
        <TextField
          onChange={handlerChange}
          label="Name"
          name="name"
          variant="filled"
        />
        <TextField
          onChange={handlerChange}
          label="Email"
          type="email"
          name="email"
          variant="filled"
        />
        <TextField
          onChange={handlerChange}
          label="Password"
          name="password"
          type="password"
          variant="filled"
        />
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            variant="filled"
            onChange={handlerChange}
            name="role_id"
            value={form.role_id}
          >
            {roles.map((rol) => (
              <MenuItem value={rol.id}>{rol.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          {" "}
          Create user
        </Button>
      </form>
    </div>
  );
}
