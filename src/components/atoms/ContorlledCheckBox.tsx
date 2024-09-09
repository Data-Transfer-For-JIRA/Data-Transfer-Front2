import { Checkbox, FormControlLabel } from "@mui/material";

type ControlledCheckBoxType = {
  label : string
}

export default function ControlledCheckBox({label}:ControlledCheckBoxType){
  return (
    <FormControlLabel control={<Checkbox />} label={label}/>
  );
}