import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

type MuiDatePickerType = {
  datePickerProps?: Omit<DatePickerProps<Date>, 'error'> & React.RefAttributes<HTMLDivElement>;
}

export default function UnControlledDataPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    { datePickerProps, ...props }: MuiDatePickerType & UseControllerProps<TFieldValues, TName>
  ) {
  const { field, fieldState: { error } } = useController(props);
  const formatDateToString = (date: Date | null) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          {...datePickerProps}
          onChange={(date) => field.onChange(formatDateToString(date))}
          onError={(err) => {
            if (err) {
              // Handle error here
            }
          }}
        />
        {error && (
          <div style={{ color: 'red' }}>
            {error.message}
          </div>
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
