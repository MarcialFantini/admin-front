"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCategoriesHome } from "@/store/slice/category/actions";
import { OrdersHomeThunk } from "@/store/slice/orders/actions";
import { useEffect, useMemo } from "react";
import { listLink } from "../../vars/links";
import { Button } from "@mui/material";
import Link from "next/link";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OrderHome } from "../../interfaces/ordersInterface";

export default function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.CategoriesHome);
  const orders = useAppSelector((state) => state.orders.ordersHome);
  const token = useAppSelector((state) => state.users.token);

  const columns = useMemo<GridColDef<OrderHome>[]>(
    () => [
      { field: "id", headerName: "ID" },
      { field: "name_user", headerName: "User" },
      { field: "name_place", headerName: "Place" },
    ],
    []
  );

  useEffect(() => {
    dispatch(getCategoriesHome(token));
    dispatch(OrdersHomeThunk(token));
  }, []);

  return (
    <main className=" py-[100px] flex flex-col ">
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))" }}
        className=" w-[95%] mx-auto grid gap-4 place-items-center p-4"
      >
        {listLink.map((item) => {
          return (
            <Link className="w-full" href={item.link}>
              <Button className="w-full" variant="contained">
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className=" w-[95%] mx-auto grid lg:grid-cols-2 gap-4">
        <div className=" max-h-[400px] flex flex-col items-center justify-center gap-2 p-4 bg-black ">
          <h2 className=" text-4xl text-white">Productos por categorías</h2>
          <PieChart
            series={[
              {
                data: categories.map((item) => {
                  return {
                    id: item.id,
                    label: item.category,
                    value: item.total_products,
                  };
                }),
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={400}
            width={400}
          />
        </div>

        <div className="bg-black flex flex-col gap-4 w-full p-4 ">
          <h2 className=" text-4xl text-white">Ultimas ordenes</h2>
          <DataGrid columns={columns} rows={orders}></DataGrid>
        </div>
      </div>
    </main>
  );
}
