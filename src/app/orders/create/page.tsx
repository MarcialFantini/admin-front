"use client";
import { TableProductsSelectOrder } from "@/components/TableProductsSelectOrder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { deleteOrder, reset } from "@/store/slice/orders/orders";
import { createOrderThunk } from "@/store/slice/orders/actions";
import {
  normalIdUser,
  OrdersCar,
} from "../../../../interfaces/ordersInterface";
import { useEffect, useState } from "react";
import { getPlaceThunk } from "@/store/slice/place/actions";
export default function CreateOrderPage() {
  const dispatch = useAppDispatch();
  const place = useAppSelector((item) => item.place.list);
  const resume = useAppSelector((state) => state.orders.newOrder);
  const [placeSelected, setPlaceSelected] = useState("");
  const deleteOrderNew = (id: string) => () => {
    dispatch(deleteOrder(id));
  };

  const createOrder = () => {
    const ordersDeatailToCreate: OrdersCar[] = resume.map((item) => {
      return { product_id: item.product_id, amount: item.amount };
    });
    console.log(normalIdUser);
    dispatch(
      createOrderThunk({
        idUser: normalIdUser,
        orders: ordersDeatailToCreate,
        place_id: placeSelected,
      })
    );

    dispatch(reset());
  };

  useEffect(() => {
    dispatch(getPlaceThunk(""));
  }, []);

  return (
    <div className="grid lg:grid-cols-2 w-full min-h-[100vh] pt-[80px]">
      <TableProductsSelectOrder></TableProductsSelectOrder>
      <div className="flex flex-col p-4 bg-[rgb(18,18,18)]">
        <h2 className="text-white text-center text-2xl font-bold">
          New order:
        </h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Place initial</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Place initial"
            value={placeSelected}
            onChange={(event) => setPlaceSelected(event.target.value)}
          >
            {place.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <List className="text-white w-auto ">
          {resume.map((item) => {
            return (
              <ListItem key={item.product_id + "- car buy"} className=" gap-4">
                <Avatar>
                  <InventoryIcon></InventoryIcon>
                </Avatar>
                <ListItemText
                  primary={item.name}
                  secondary={"Count " + item.amount + " elements"}
                ></ListItemText>
                <IconButton
                  onClick={deleteOrderNew(item.product_id)}
                  edge="end"
                  aria-label="delete"
                >
                  <GridDeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Button onClick={createOrder}>Create Order</Button>
      </div>
    </div>
  );
}
