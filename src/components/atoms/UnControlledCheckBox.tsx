import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';


interface MuiProps {
  checkBoxProps?: CheckboxProps;
  label : string;
}

export default function UnControlledCheckBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ checkBoxProps, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field } = useController(props);

  return (
    <FormControlLabel control={
      <Checkbox
        {...checkBoxProps}
        {...field}
      />}
      label={props.label} />
  )
}

