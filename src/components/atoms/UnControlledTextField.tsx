import { TextField, TextFieldProps } from '@mui/material';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';


interface MuiProps {
  textFieldProps?: TextFieldProps;
}

export default function UnControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ textFieldProps, ...props }: MuiProps & UseControllerProps<TFieldValues, TName>) {

  const { field, fieldState: { error } } = useController(props);

  return (
    <TextField
      {...textFieldProps}
      {...field}
      error={!!error}
      helperText={!!error && error.message}
      disabled={textFieldProps?.disabled}
    />
  )
}

//https://velog.io/@syoo970/react-hook-form%EA%B3%BC-MUI%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9E%AC%EC%82%AC%EC%9A%A9%EC%84%B1-%EC%9E%88%EB%8A%94-Input-%EA%B3%B5%ED%86%B5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0TypeScript
