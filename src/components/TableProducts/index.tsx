"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  delProductsThunk,
  getProductsThunk,
} from "@/store/slice/products/actions";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { ProductItemList } from "../../../interfaces/productInterfaces";

export const TableProducts = () => {
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.list);
  const handlerDelProduct = (id: string) => () => {
    dispatch(delProductsThunk({ idProduct: id, token }));
  };
  const columns = useMemo<GridColDef<ProductItemList>[]>(
    () => [
      { headerName: "Id", field: "id" },
      { headerName: "Name", field: "name" },
      { headerName: "Description", field: "description" },

      { headerName: "Stock", field: "stock" },
      { headerName: "Category", field: "category_id" },
      { headerName: "Place", field: "place_id" },
      {
        type: "actions",
        field: "action",
        headerName: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            onClick={handlerDelProduct(params.row.id)}
            label="Delete"
          />,
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getProductsThunk({ offset: 20, page: 0, token }));
  }, []);
  return (
    <DataGrid
      className="min-h-[200px] w-full"
      columns={columns}
      rows={products}
    ></DataGrid>
  );
};
