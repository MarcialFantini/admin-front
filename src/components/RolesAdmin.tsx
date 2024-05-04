"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSectionsOffRole,
  getAllSectionsOffRole,
} from "@/store/slice/roles/actions";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useEffect } from "react";

export const RolesAdmin = (props: { id: string }) => {
  const sections = useAppSelector((state) => state.roles.sectionsByRole);
  const dispatch = useAppDispatch();
  const handlerDelete = (idRole: string) => () => {
    dispatch(deleteSectionsOffRole(idRole));
  };
  useEffect(() => {
    dispatch(getAllSectionsOffRole(props.id));
  }, [dispatch]);
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <h2 className="text-white text-center">
        All Category can use this role{" "}
      </h2>
      <List className="text-white">
        {sections.map((item) => {
          return (
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={handlerDelete(item.id)}
                  edge="end"
                  aria-label="DeleteIcon"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.section} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
