"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getProductsLikeThunk,
  getProductsThunk,
} from "@/store/slice/products/actions";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { ProductItemList } from "../../../interfaces/productInterfaces";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addOrder } from "@/store/slice/orders/orders";
import { lessCustom } from "@/store/slice/products/products";

export const TableProductsSelectOrder = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.users.token);
  const products = useAppSelector((state) => state.products.list);
  const [productSelected, setProductSelected] = useState<ProductItemList>({
    id: "",
    name: "",
    description: "",
    stock: 0,
    category_id: "",
    price: 0,
    place_id: "",
  });
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const handlerModalActive = () => setModalActive(!modalActive);

  const handlerSetProductOrder = (idProduct: string) => () => {
    const productToCar = products.find((item) => item.id === idProduct);
    if (typeof productToCar === "undefined") {
      return;
    }
    setProductSelected(productToCar);
    handlerModalActive();
  };

  const handlerChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAmount(Number(event.target.value));

  const handlerAddCard = () => {
    if (amount > productSelected.stock) {
      return;
    }
    dispatch(
      addOrder({
        product_id: productSelected.id,
        amount: amount,
        name: productSelected.name,
      })
    );

    dispatch(
      lessCustom({
        idProduct: productSelected.id,
        amount: productSelected.stock - amount,
      })
    );

    handlerModalActive();
  };

  const handlerChangeSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearch(event.target.value);
  const handlerFindLikeName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getProductsLikeThunk({ token, name: search }));
  };

  const columns = useMemo<GridColDef<ProductItemList>[]>(
    () => [
      { headerName: "Id", field: "id" },
      { headerName: "Name", field: "name" },
      { headerName: "Stock", field: "stock" },
      {
        headerName: "Actions",
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            onClick={handlerSetProductOrder(params.row.id)}
            icon={<AddCircleOutlineIcon />}
            label="Add"
          />,
        ],
      },
    ],
    [handlerModalActive]
  );
  useEffect(() => {
    dispatch(getProductsThunk({ offset: 20, page: 0, token }));
  }, []);
  return (
    <div className="flex flex-col gap-4 px-4">
      <Dialog
        className="flex items-center justify-center"
        onClose={handlerModalActive}
        open={modalActive}
      >
        <DialogTitle>Add Product to new Order</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            onChange={handlerChangeInput}
            required
            label="Number of product"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handlerModalActive}
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={handlerAddCard} variant="contained">
            Add product
          </Button>
        </DialogActions>
      </Dialog>
      <form
        onSubmit={handlerFindLikeName}
        className="flex flex-row items-center justify-center"
      >
        <TextField
          onChange={handlerChangeSearch}
          className="w-full"
        ></TextField>
        <Button type="submit" variant="contained">
          Search Product
        </Button>
      </form>
      <DataGrid
        className="min-h-[200px] w-full"
        columns={columns}
        rows={products}
      ></DataGrid>
    </div>
  );
};
