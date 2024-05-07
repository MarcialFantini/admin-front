"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { OrdersInterface } from "../../../interfaces/ordersInterface";
import { getOrderThunk } from "@/store/slice/orders/actions";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const token = useAppSelector((state) => state.users.token);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const row = useAppSelector((state) => state.orders.list);

  const redirectToDetails = (id: string) => () => {
    router.push("/orders/one/" + id);
  };

  const columnsGrid = useMemo<GridColDef<OrdersInterface>[]>(
    () => [
      {
        headerName: "ID",
        field: "id",
      },
      {
        headerName: "Client",
        field: "client_id",
      },
      {
        headerName: "Status",
        field: "status",
      },

      {
        headerName: "Actions",
        field: "actions",
        type: "actions",
        getActions: (params) => {
          return [
            <GridActionsCellItem
              label="Search"
              onClick={redirectToDetails(params.row.id)}
              icon={<SearchIcon />}
            />,
            <GridActionsCellItem label="Delete" icon={<GridDeleteIcon />} />,
          ];
        },
      },
    ],
    [redirectToDetails, router]
  );

  useEffect(() => {
    dispatch(getOrderThunk({ page: 0, limit: 20, token }));
  }, []);

  return (
    <div className="pt-[100px] px-[5%] min-h-[100vh] w-full flex flex-col gap-4 items-start justify-center ">
      <Link href={"/orders/create"}>
        <Button variant="contained">Create order</Button>
      </Link>
      <DataGrid className="w-full" columns={columnsGrid} rows={row}></DataGrid>
    </div>
  );
}
