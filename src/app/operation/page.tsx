"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createOperation,
  deleteOperations,
  getOperations,
} from "@/store/slice/operations/actions";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Operation } from "../../../interfaces/operationInterfaces";
import DeleteIcon from "@mui/icons-material/Delete";
export default function OperationsPage() {
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState("");
  const toggleCreate = () => setIsCreate(!isCreate);
  const token = useAppSelector((item) => item.users.token);
  const dispatch = useAppDispatch();
  const handlerChangeName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };
  const handlerCreateOperation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createOperation({ body: { name }, token }));
    toggleCreate();
  };
  const deleteHandler = (idOperation: string) => () =>
    dispatch(deleteOperations({ id: idOperation, token }));
  const rows = useAppSelector((state) => state.operation.list);

  const columns = useMemo<GridColDef<Operation>[]>(
    () => [
      { headerName: "Id", field: "id" },
      { headerName: "Name", field: "name" },
      {
        type: "actions",
        field: "actions",
        headerName: "Actions",
        getActions: (params) => {
          return [
            <GridActionsCellItem
              label="delete operation"
              onClick={deleteHandler(params.row.id)}
              icon={<DeleteIcon />}
            ></GridActionsCellItem>,
          ];
        },
      },
    ],
    [deleteOperations]
  );

  useEffect(() => {
    dispatch(getOperations(token));
  }, []);

  return (
    <div className=" w-[95%] gap-4 m-auto min-h-[100vh] flex flex-col py-[100px] items-start ">
      <Dialog onClose={toggleCreate} open={isCreate}>
        <form
          onSubmit={handlerCreateOperation}
          className="p-4 flex flex-col gap-4"
        >
          <DialogTitle>Create operation</DialogTitle>
          <TextField onChange={handlerChangeName} label="Name"></TextField>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </form>
      </Dialog>

      <Button variant="contained" onClick={toggleCreate}>
        Create Operation
      </Button>
      <DataGrid className="w-full" columns={columns} rows={rows}></DataGrid>
    </div>
  );
}
