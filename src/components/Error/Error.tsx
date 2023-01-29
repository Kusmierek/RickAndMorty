import { Alert, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { StateType } from '../../store';

export interface StateMessage {
  message: string;
}

const Error = () => {
  const { message } = useSelector<StateType, StateMessage>((state) => {
    return {
      message: state.searchResult.message,
    };
  });
  return (
    <Alert variant="filled" severity="error">
      <Typography variant="h3">Error</Typography>
      <Typography>{message}</Typography>
    </Alert>
  );
};

export default Error;
