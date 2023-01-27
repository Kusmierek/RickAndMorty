import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePagination() {
  const navigate = useNavigate();
  

  const setParams = useCallback(
    (value: string) => {
      navigate({
        pathname: '/table',
        search: value,
      });
    },
    [navigate]
  );

  return { setParams };
}
