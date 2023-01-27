import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/UseFetch';
import { TableCharacters } from '../Table';
import { useSearchParams } from 'react-router-dom';
import Input from '../input/Input';

export interface StateProps {
  data: Array<Record<string, any>[]> | Record<string, any>;
  isLoading: boolean;
  page: Record<string, any>;
}

const Characters = () => {
  const { fetchData } = useFetch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '150vh',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Input />
      <TableCharacters />
    </Box>
  );
};

export default Characters;
