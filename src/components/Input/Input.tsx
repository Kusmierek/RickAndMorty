import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, TextField } from '@mui/material';
import { usePagination } from '../hooks/usePagination';

export interface InputType {
  name: string;
}

const validationSchema = yup.object().shape({
  name: yup.string(),
});

const Input = () => {
  const { register, handleSubmit } = useForm<InputType>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const { setParams } = usePagination();

  const onSubmit = (data: InputType) => {
    setParams(`?page=1&name=${data.name}`);
  };

  return (
    <FormControl sx={{ mt: 10 }}>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        type="text"
        defaultValue={''}
        {...register('name')}
      />
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default Input;
