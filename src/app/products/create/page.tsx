"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
import { ProductFormInterface } from "../../../../interfaces/productInterfaces";
import { createProductThunk } from "@/store/slice/products/actions";
import { getCategory } from "@/store/slice/category/actions";
import { getPlaceThunk } from "@/store/slice/place/actions";

export default function CreateProductPage() {
  const [form, setForm] = useState<ProductFormInterface>({
    name: "",
    description: "",

    stock: 0,
    category_id: "",
    place_id: "",
    price: 0,
  });
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const places = useAppSelector((state) => state.place.list);
  const handlerSelect = (event: SelectChangeEvent) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlerChangeForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handlerCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createProductThunk(form));
  };

  useEffect(() => {
    dispatch(getCategory(""));
    dispatch(getPlaceThunk(""));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-[100vh] h-full w-full">
      <h2 className=" text-white text-2xl ">Create Product</h2>
      <form onSubmit={handlerCreate} className="grid lg:grid-cols-2 gap-4">
        <TextField
          onChange={handlerChangeForm}
          required
          name="name"
          label="Product name: "
          value={form.name}
        ></TextField>
        <TextField
          required
          onChange={handlerChangeForm}
          name="description"
          label="Description: "
          value={form.description}
        ></TextField>

        <TextField
          required
          onChange={handlerChangeForm}
          type="number"
          name="stock"
          label="Product stock: "
          value={form.stock}
        ></TextField>
        <TextField
          required
          onChange={handlerChangeForm}
          type="number"
          name="price"
          label="Price: "
          value={form.price}
        ></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="category_id"
            label="Category"
            onChange={handlerSelect}
            value={form.category_id}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Place</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="place_id"
            label="Place"
            onChange={handlerSelect}
            value={form.place_id}
          >
            {places.map((place) => {
              return (
                <MenuItem value={place.id} key={place.id}>
                  {place.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Create Product
        </Button>
      </form>
    </div>
  );
}
