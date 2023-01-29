import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/UseFetch';
import { TableCharacters } from '../Table';
import { useSearchParams } from 'react-router-dom';
import Input from '../Input/Input';
import { StateType } from '../../store';
import Error from '../Error/Error';

export interface StateProps {
  isLoading: boolean;
  isFailed: boolean;
}

const Characters = () => {
  const { fetchData } = useFetch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, isFailed } = useSelector<StateType, StateProps>(
    (state) => {
      return {
        isLoading: state.searchResult.isLoading,
        isFailed: state.searchResult.isFailed,
      };
    }
  );

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  if (isFailed) {
    return <Error />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Input />
      {isLoading ? <CircularProgress /> : <TableCharacters />}
    </Box>
  );
};

export default Characters;
