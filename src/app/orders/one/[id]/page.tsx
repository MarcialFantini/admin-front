"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { OrderDetail } from "../../../../../interfaces/ordersInterface";
import {
  deleteOrderThunk,
  getOrderSelectThunk,
  updateOrderPlaceThunk,
} from "@/store/slice/orders/actions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getPlaceThunk } from "@/store/slice/place/actions";
import {
  getOperations,
  setOperationsOrder,
} from "@/store/slice/operations/actions";
import { useRouter } from "next/navigation";
export default function OrderOnePage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const operationsRow = useAppSelector((state) => state.operation.list);
  const orderSelected = useAppSelector((item) => item.orders.orderSelected);
  const placeList = useAppSelector((item) => item.place.list);
  const [placeSelected, setPlaceSelected] = useState("");
  const [expandded, setExpanded] = useState<false | string>(false);
  const handlerExpanded = (panel: string) => () => setExpanded(panel);
  const handlerChangePlace = (event: SelectChangeEvent<string>) =>
    setPlaceSelected(event.target.value);
  const handlerUpdatePlaceOrder = () =>
    dispatch(
      updateOrderPlaceThunk({ order_id: params.id, place_id: placeSelected })
    );
  const [operation, setOperation] = useState(orderSelected.operation_id);

  const handlerSetOperation = (event: SelectChangeEvent<string>) =>
    setOperation(event.target.value);

  const dispatchChangeOperation = () => {
    dispatch(
      setOperationsOrder({ idOrder: params.id, idOperation: operation })
    );
  };

  const deleteOrderHandler = () => {
    dispatch(deleteOrderThunk(params.id));
    router.push("/orders");
  };

  const getOperationsList = () => dispatch(getOperations());
  const columnsOrderDetail = useMemo<GridColDef<OrderDetail>[]>(
    () => [
      { headerName: "Id Detail", field: "id" },
      { headerName: "Name Product", field: "name" },
      { headerName: "Amount", field: "amount" },
      { headerName: "Price", field: "price" },
    ],
    []
  );

  useEffect(() => {
    dispatch(getOrderSelectThunk(params.id));
    dispatch(getPlaceThunk(""));
    getOperationsList();
  }, []);

  return (
    <div className="grid grid-cols-2 min-h-[100vh] p-4 pt-[90px]">
      <div className=" p-4 bg-transparent flex  w-full h-full">
        <div className="flex gap-4 flex-col">
          <p className=" text-white text-2xl">
            Operation:{" "}
            <span className=" text-2xl text-green-300">
              {orderSelected.operation_id}
            </span>
          </p>
          <p className="  text-2xl text-white">
            Place:{" "}
            <span className="text-green-300">{orderSelected?.place}</span>
          </p>
          <div className="text-white">
            <h2 className=" text-2xl flex flex-col">
              Order number:{" "}
              <span className=" text-orange-300"> {orderSelected?.id}</span>
            </h2>
          </div>
          <Accordion
            expanded={expandded === "panel1"}
            onChange={handlerExpanded("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Change Operation
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Operation</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Process"
                  onChange={handlerSetOperation}
                  value={operation}
                >
                  {operationsRow.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <Button onClick={dispatchChangeOperation}> Confirm </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandded === "panel2"}
            onChange={handlerExpanded("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Move Order to new place
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Place"
                  value={placeSelected}
                  onChange={handlerChangePlace}
                >
                  {placeList.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handlerUpdatePlaceOrder}> Confirm </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandded === "panel3"}
            onChange={handlerExpanded("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Delete Order
            </AccordionSummary>
            <AccordionDetails>
              <ButtonGroup
                className="w-full"
                orientation="vertical"
                aria-label="Basic button group"
                variant="outlined"
              >
                <Button onClick={deleteOrderHandler}> Delete Order </Button>
              </ButtonGroup>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <DataGrid
        className=""
        rows={orderSelected ? orderSelected.details : []}
        columns={columnsOrderDetail}
      ></DataGrid>
    </div>
  );
}
