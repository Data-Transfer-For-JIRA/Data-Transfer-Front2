import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';


interface MuiProps {
  selectBoxProps?: SelectProps
  item: string[];
}

export default function UnControlledSelectedBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ selectBoxProps, item, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field, fieldState: { error } } = useController(props);
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel id="assignee-select" htmlFor="assignee-select" error={!!error}>{selectBoxProps?.label}</InputLabel>
      <Select
        {...selectBoxProps}
        {...field}
        error={!!error}
      >
        {
          item.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))
        }
      </Select>
      {!!error && (<FormHelperText sx={{ color: '#f44336' }}>{error.message}</FormHelperText>)}
    </FormControl>
  );
}
