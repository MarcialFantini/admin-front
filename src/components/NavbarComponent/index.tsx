"use client";
import {
  AppBar,
  Box,
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
  { name: "Products", link: "/products" },
  { name: "Category", link: "/category" },
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer onClick={handlerToggleOpen} open={open} anchor="left">
        <div className=" h-full w-[250px] flex flex-col gap-2 items-center justify-center">
          {listLink.map((item, index) => {
            return (
              <ListItem disablePadding>
                <Link
                  className="w-full"
                  href={item.link}
                  key={item.name + index}
                >
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
