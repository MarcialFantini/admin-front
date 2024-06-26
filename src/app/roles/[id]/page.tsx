"use client";
import { RolesAdmin } from "@/components/RolesAdmin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createSectionRole,
  getAllSections,
  getAllSectionsOffRole,
} from "@/store/slice/roles/actions";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ViewRolePage(params: { params: { id: string } }) {
  const sections = useAppSelector((item) => item.roles.sections);
  const sectionsCategory = useAppSelector((item) => item.roles.sectionsByRole);
  const token = useAppSelector((state) => state.users.token);

  const [sectionSelected, setSectionSelected] = useState("");
  const [sectionsFilters, setSectionsFilter] = useState<
    {
      id: string;
      section: string;
    }[]
  >([]);
  const dispatch = useAppDispatch();
  const handlerSection = (event: SelectChangeEvent) =>
    setSectionSelected(event.target.value);

  const handlerCreateRoleSection = () => {
    dispatch(
      createSectionRole({
        roleSectionCreate: {
          role_id: params.params.id,
          section: sectionSelected,
        },
        token,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllSections(token));
    dispatch(getAllSectionsOffRole({ token, idRole: params.params.id }));
  }, []);

  useEffect(() => {
    const newArr = sections.filter((item) => {
      const sectionsRole = sectionsCategory.map(
        (sectionRole) => sectionRole.section
      );
      return !sectionsRole.includes(item.section);
    });
    setSectionsFilter(newArr);
  }, [sectionsCategory, sections]);

  return (
    <div className="pt-[100px] grid lg:grid-cols-2 min-h-[100vh]">
      <form className="flex flex-col w-full gap-4 p-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sections</InputLabel>
          <Select
            onChange={handlerSection}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sections"
          >
            {sectionsFilters.map((item) => {
              return <MenuItem value={item.id}>{item.section}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button onClick={handlerCreateRoleSection} variant="contained">
          Add section to this role
        </Button>
      </form>
      <RolesAdmin id={params.params.id} />
    </div>
  );
}
