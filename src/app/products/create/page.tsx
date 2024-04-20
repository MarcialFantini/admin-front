import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-[100vh] h-full w-full">
      <h2 className=" text-white text-2xl ">Create Product</h2>
      <form className="flex flex-col gap-4">
        <TextField required label="Product name: "></TextField>
        <TextField required label="Description: "></TextField>
        <TextField required type="number" label="Amount: "></TextField>
        <TextField required type="number" label="Product stock: "></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Create Product
        </Button>
      </form>
    </div>
  );
}
