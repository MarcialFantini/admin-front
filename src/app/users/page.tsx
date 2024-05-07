"use client";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { UserItem } from "../../../interfaces/usersInterfaces";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteUsersThunk,
  GetUsersPageThunk,
} from "@/store/slice/users/actions";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.users.token);
  const users = useAppSelector((state) => state.users.list);
  const deleteUser = (id: string, tokenParam: string) => () =>
    dispatch(deleteUsersThunk({ id, token: tokenParam }));
  const columns = useMemo<GridColDef<UserItem>[]>(
    () => [
      { field: "id", headerName: "Id" },
      { field: "name", headerName: "Name" },
      { field: "email", headerName: "Email" },
      { field: "role_id", headerName: "Role" },
      {
        type: "actions",
        field: "action",
        headerName: "Actions",
        getActions(params) {
          return [
            <GridActionsCellItem
              onClick={deleteUser(params.row.id, token)}
              icon={<Delete></Delete>}
              label="Delete"
            />,
          ];
        },
      },
    ],
    [deleteUser]
  );

  useEffect(() => {
    dispatch(GetUsersPageThunk({ page: 0, offset: 20, token }));
  }, [token]);

  return (
    <div className="w-[95%] m-auto min-h-[100vh] pt-[100px] flex flex-col gap-4">
      <Link href={"/users/create"}>
        <Button variant="contained">Create user</Button>
      </Link>
      <DataGrid
        className=" min-h-[250px]"
        columns={columns}
        rows={users}
      ></DataGrid>
    </div>
  );
}
