"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deletedCategory, getCategory } from "@/store/slice/category/actions";
import { Button, ButtonGroup } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CategoriesColumns } from "../../../interfaces/categoryInterfaces";

export default function CategoryPage() {
  const [isModalActive, setIsModelActive] = useState(true);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  const handlerDelete = (id: string) => () => dispatch(deletedCategory(id));

  const handleModal = () => setIsModelActive(!isModalActive);

  const columns = useMemo<GridColDef<CategoriesColumns>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
      },
      {
        field: "name",
        headerName: "Name",
      },
      {
        field: "action",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={handlerDelete(`${params.id}`)}
          />,
        ],
      },
    ],
    [handleModal]
  );

  useEffect(() => {
    dispatch(getCategory(""));
  }, []);

  return (
    <div className="pt-[100px] px-[3%] flex flex-col gap-4 w-full  ">
      <ButtonGroup>
        <Link href={"/category/create"}>
          <Button>Create Category</Button>
        </Link>
      </ButtonGroup>

      <DataGrid
        className="min-h-[200px]"
        columns={columns}
        rows={categories.map((item) => {
          return { name: item.name, id: item.id };
        })}
      ></DataGrid>
    </div>
  );
}
