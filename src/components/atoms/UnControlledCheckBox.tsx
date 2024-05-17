import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';


interface MuiProps {
  checkBoxProps?: CheckboxProps;
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
      label="인력배정 보드 추가 생성" />
  )
}

