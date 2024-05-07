"use client";

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { PlaceItemInterface } from "../../../interfaces/placeInterfaces";
import { Button } from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deletePlaceThunk, getPlaceThunk } from "@/store/slice/place/actions";

export default function PlacePage() {
  const list = useAppSelector((state) => state.place.list);
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();
  const handlerDeleted = (id: string) => () => {
    dispatch(deletePlaceThunk({ id, token }));
  };
  const column = useMemo<GridColDef<PlaceItemInterface>[]>(
    () => [
      { headerName: "Id", field: "id" },
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Actions",
        field: "action",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={handlerDeleted(params.row.id)}
          ></GridActionsCellItem>,
        ],
      },
    ],
    [handlerDeleted]
  );

  useEffect(() => {
    dispatch(getPlaceThunk(token));
  }, []);

  return (
    <div className=" w-full py-[100px] px-4 min-h-[100vh] flex flex-col items-start justify-start gap-4">
      <Link href={"/place/create"}>
        <Button variant="contained">Create place</Button>
      </Link>
      <DataGrid className="w-full" rows={list} columns={column}></DataGrid>
    </div>
  );
}
