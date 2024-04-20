"use client";
import { Button, ButtonGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "col1", headerName: "Id" },
  { field: "col2", headerName: "Name" },
  { field: "col3", headerName: "Price" },
  { field: "col3", headerName: "Category" },
  { field: "col3", headerName: "Stock" },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4 content-center items-center w-full min-h-[100vh] h-full px-[3%] pt-[100px] pb-4">
      <ButtonGroup className="w-full">
        <Link href={"/products/create"}>
          <Button>Create product</Button>
        </Link>
      </ButtonGroup>
      <DataGrid
        className="min-h-[200px] w-full"
        columns={columns}
        rows={[]}
      ></DataGrid>
    </div>
  );
}
