"use client";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { RoleItemInterface } from "../../../interfaces/rolesInterfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { delRoleThunk, getRoleThunk } from "@/store/slice/roles/actions";
import { useRouter } from "next/navigation";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
export default function RolePage() {
  const token = useAppSelector((state) => state.users.token);

  const dispatch = useAppDispatch();
  const deleteRoleHandler = (id: string) => () =>
    dispatch(delRoleThunk({ id, token }));
  const router = useRouter();
  const pushRouter = (url: string) => () => router.push(url);
  const roles = useAppSelector((state) => state.roles.list);
  const columns = useMemo<GridColDef<RoleItemInterface>[]>(
    () => [
      { headerName: "Id", field: "id" },
      { headerName: "Name", field: "name" },
      {
        headerName: "Actions",
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            onClick={deleteRoleHandler(params.row.id)}
            icon={<GridDeleteIcon />}
            label="delete"
          />,
          <GridActionsCellItem
            onClick={pushRouter("/roles/" + params.row.id)}
            icon={<ContentPasteSearchIcon />}
            label="delete"
          />,
        ],
      },
    ],
    [deleteRoleHandler, pushRouter]
  );

  useEffect(() => {
    dispatch(getRoleThunk(token));
  }, []);

  return (
    <div className="min-h-[100vh] px-[5%] w-full pt-[100px] flex flex-col gap-4">
      <Link href={"/roles/create"}>
        <Button variant="contained">Create Role </Button>
      </Link>

      <DataGrid className="w-full" columns={columns} rows={roles}></DataGrid>
    </div>
  );
}
