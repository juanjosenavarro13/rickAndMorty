import {
  getCharactersEndpointModel,
  getCharactersTransformerModel,
} from '@/models';

export const getCharactersTransformer = (
  data: getCharactersEndpointModel,
): getCharactersTransformerModel => {
  return {
    info: {
      ...data.info,
    },
    results: data.results.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      created: character.created,
      image: character.image,
    })),
  };
};
