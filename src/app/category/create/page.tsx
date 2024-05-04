"use client";
import { useAppDispatch } from "@/store/hooks";
import { createCategory } from "@/store/slice/category/actions";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateCategoryPage() {
  const [category, setCategory] = useState("");
  const router = useRouter();
  const handlerChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory(event.target.value);
  };

  const dispatch = useAppDispatch();
  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(createCategory(category));
    router.push("/category");
  };

  return (
    <div className="pt-[100px] px-[3%] flex flex-col gap-4 items-center justify-center min-h-[100vh]">
      <form
        onSubmit={handlerSubmit}
        className=" flex flex-col min-h-[200px] gap-2"
      >
        <TextField
          onChange={handlerChange}
          name="name"
          label={"name category"}
        ></TextField>
        <Button variant="contained" type="submit">
          Crete category
        </Button>
      </form>
    </div>
  );
}
