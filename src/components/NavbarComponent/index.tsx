"use client";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "next/link";

const listLink: { name: string; link: string }[] = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Category", link: "/category" },
  { name: "Places", link: "/place" },
  { name: "Roles", link: "/roles" },
  { name: "Users", link: "/users" },
  { name: "Orders", link: "/orders" },
  { name: "Operation", link: "/operation" },
  // { name: "Moviments", link: "/moviments" },
];

export const NavbarComponent = () => {
  const [open, setOpen] = useState(false);

  const handlerToggleOpen = () => setOpen(!open);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handlerToggleOpen}
            onKeyDown={() => setOpen(false)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link href={"/login"}>
            {" "}
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer onClick={handlerToggleOpen} open={open} anchor="left">
        <div className=" h-full w-[250px] flex flex-col gap-2 items-center justify-center">
          {listLink.map((item, index) => {
            return (
              <ListItem key={item.name + index} disablePadding>
                <Link className="w-full" href={item.link}>
                  <ListItemButton>{item.name}</ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};
