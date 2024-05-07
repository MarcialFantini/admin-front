"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPlaceThunk } from "@/store/slice/place/actions";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";

export default function CreatePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state) => state.users.token);
  const [place, setPlace] = useState("");
  const handlerPlaceChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlace(event.target.value);
  };
  const handlerCreatePlace = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(createPlaceThunk({ name: place, token }));
    router.push("/place");
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col gap-4 items-center justify-center ">
      <form onSubmit={handlerCreatePlace} className="flex flex-col gap-4">
        <TextField
          label="Name place"
          onChange={handlerPlaceChange}
          value={place}
        ></TextField>

        <Button type="submit" variant="contained">
          Create Place
        </Button>
      </form>
    </div>
  );
}
