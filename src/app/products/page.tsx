"use client";

import { Button, ButtonGroup, TextField } from "@mui/material";

import Link from "next/link";

import { TableProducts } from "@/components/TableProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent, useState } from "react";
import { getProductsLikeThunk } from "@/store/slice/products/actions";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();
  const handlerChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearch(event.target.value);
  const handlerSearch = () =>
    dispatch(getProductsLikeThunk({ name: search, token }));

  return (
    <div className="flex flex-col gap-4 content-center items-center w-full min-h-[100vh] h-full px-[3%] pt-[100px] pb-4">
      <ButtonGroup className="w-full">
        <Link href={"/products/create"}>
          <Button>Create product</Button>
        </Link>
      </ButtonGroup>
      <div className="flex flex-col w-full">
        <TextField
          onChange={handlerChange}
          value={search}
          label="Products by name"
        ></TextField>
        <Button onClick={handlerSearch} variant="contained">
          Search
        </Button>
      </div>
      <TableProducts></TableProducts>
    </div>
  );
}
