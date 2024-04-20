import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] ">
      <form className="flex flex-col gap-2 ">
        <TextField name="name" label="Name User"></TextField>
        <TextField
          name="name"
          type="password"
          label="Password User"
        ></TextField>
        <Button variant="contained" endIcon={<SendIcon />}>
          Log in
        </Button>
      </form>
    </div>
  );
}
