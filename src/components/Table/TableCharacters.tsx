import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../store';
import { Character } from '../../libs/types/Character';
import TablePaginationCustom from '../TablePagination/TablePaginationCustom';
import { Info } from '../../libs/types/info';
import { usePagination } from '../hooks/usePagination';
import useSort from '../hooks/useSort';
import { Link, useSearchParams } from 'react-router-dom';

export interface StateCharacter {
  characters: Character[];
  info: Info;
  pageCurrent: number;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

export const TableCharacters = () => {
  const { characters, info, pageCurrent } = useSelector<
    StateType,
    StateCharacter
  >((state) => {
    return {
      characters: state.searchResult.characters,
      info: state.searchResult.info,
      pageCurrent: state.searchResult.pageCurrent,
    };
  });
  const { setParams } = usePagination();
  const { sortByKey } = useSort();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(true);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      const name = searchParams.get('name');
      if (name != null) {
        setParams(`?page=${newPage}&name=${name}`);
      } else {
        setParams(`?page=${newPage}`);
      }
    },
    [searchParams]
  );

  const resultItems = useMemo(
    () =>
      characters.map((el: Character) => {
        return (
          <TableRow key={el.id}>
            <TableCell align="right">{el.id}</TableCell>
            <TableCell align="right">{el.name}</TableCell>
            <TableCell align="right">{el.status}</TableCell>
            <TableCell align="right">{el.species}</TableCell>
            <TableCell align="right">
              <StyledLink to={`/table/character/${el.id}`} className="nav-el">
                {el.url.toString()}
              </StyledLink>
            </TableCell>
          </TableRow>
        );
      }),
    [characters]
  );

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          borderRadius: 5,
          bgcolor: '#EEEEEE',
          mt: 10,
        }}
      >
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <TableSortLabel
                  onClick={() => {
                    sortByKey('id', characters, sort);
                    setSort(!sort);
                  }}
                  direction={sort ? 'desc' : 'asc'}
                >
                  <Typography variant="h6" gutterBottom>
                    Id
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  onClick={() => {
                    sortByKey('name', characters, sort);
                    setSort(!sort);
                  }}
                  direction={sort ? 'desc' : 'asc'}
                >
                  <Typography variant="h6" gutterBottom>
                    Name
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  onClick={() => {
                    sortByKey('status', characters, sort);
                    setSort(!sort);
                  }}
                  direction={sort ? 'desc' : 'asc'}
                >
                  <Typography variant="h6" gutterBottom>
                    Status
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  onClick={() => {
                    sortByKey('species', characters, sort);
                    setSort(!sort);
                  }}
                  direction={sort ? 'desc' : 'asc'}
                >
                  <Typography variant="h6" gutterBottom>
                    Species
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  Url
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{resultItems}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={-1}
                onPageChange={handleChangePage}
                rowsPerPage={characters.length}
                page={pageCurrent}
                rowsPerPageOptions={[]}
                ActionsComponent={TablePaginationCustom}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
