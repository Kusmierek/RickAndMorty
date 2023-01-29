import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
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
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        type="text"
        defaultValue={''}
        {...register('name')}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Input;
