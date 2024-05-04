"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { movementsRowGet } from "@/store/slice/moviments/actions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Movements } from "../../../interfaces/movimentsInterfaces";

export default function MovimentsPage() {
  const dispatch = useAppDispatch();

  const rows = useAppSelector((state) => state.movements.list);
  const handlerRefresh = () => dispatch(movementsRowGet());

  const columns = useMemo<GridColDef<Movements>[]>(
    () => [
      { headerName: "Id", field: "id" },
      { headerName: "Place", field: "place_name" },
    ],
    []
  );

  useEffect(() => {
    handlerRefresh();
  }, []);

  return (
    <div className="px-[3%] gap-4 flex flex-col min-h-[100vh] pt-[100px] items-start justify-center">
      <DataGrid className="w-full" columns={columns} rows={rows}></DataGrid>
    </div>
  );
}
