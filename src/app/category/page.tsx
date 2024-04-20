"use clien";
import { useAppDispatch } from "@/store/hooks";
import { getCategory } from "@/store/slice/category/actions";
import { Button, ButtonGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect } from "react";

const colGrid: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  { field: "name", headerName: "name" },
];

export default function CategoryPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategory(""));
  }, []);

  return (
    <div className="pt-[100px] px-[3%] flex flex-col gap-4 ">
      <ButtonGroup>
        <Link href={"/category/create"}>
          <Button>Create Category</Button>
        </Link>
      </ButtonGroup>
      <DataGrid
        className="min-h-[200px]"
        columns={colGrid}
        rows={[]}
      ></DataGrid>
    </div>
  );
}
