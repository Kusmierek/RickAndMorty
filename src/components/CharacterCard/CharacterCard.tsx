import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../libs/types/Character';
import { ActionFailed } from '../../slices/SearchResult';

const CharacterCard = () => {
  const { characterid } = useParams();
  const URL = `https://rickandmortyapi.com/api/character/${characterid}`;
  const [character, setCharacter] = useState<Character>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSingleCharacter = useCallback(async () => {
    try {
      const response = await axios.get(URL);
      setCharacter(response.data);
    } catch (error: any) {
      dispatch(ActionFailed(error.message));
    }
  }, []);

  useEffect(() => {
    getSingleCharacter();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '90vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card sx={{ width: 345, height: 550 }}>
        <CardMedia component="img" height="300" image={`${character?.image}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {character?.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {character?.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Species: {character?.species}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {character?.location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created at: {character?.created}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of episodes: {character?.episode.length}
          </Typography>
          <Button
            variant="contained"
            sx={{ color: '#FFFF' }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CharacterCard;
