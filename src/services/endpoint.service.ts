import { getCharactersEndpointModel } from '@/models/endpoint.model';
import { loadAbort } from '@/utilities';
import axios from 'axios';

export const getCharacters = (page?: number) => {
  const controller = loadAbort();
  return {
    call: axios.get<getCharactersEndpointModel>(
      `https://rickandmortyapi.com/api/character?page=${page ?? 1}`,
      {
        signal: controller.signal,
      },
    ),
    controller,
  };
};
