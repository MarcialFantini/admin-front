"use client";
import { useAppDispatch } from "@/store/hooks";
import { createRolesThunk } from "@/store/slice/roles/actions";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RolesCreatePage() {
  const [role, setRole] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handlerOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setRole(event.target.value);

  const handlerDispatchForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(createRolesThunk(role));
    router.push("/roles");
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <form onSubmit={handlerDispatchForm} className="flex flex-col gap-4">
        <TextField
          onChange={handlerOnChange}
          name="name"
          label="Name Role"
        ></TextField>
        <Button type="submit" variant="contained">
          Create Role
        </Button>
      </form>
    </div>
  );
}
