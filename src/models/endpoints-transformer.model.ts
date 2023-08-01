export type getCharactersTransformerModel = {
  info: info;
  results: character[];
};

type info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type character = {
  id: number;
  name: string;
  status: status;
  species: species;
  gender: gender;
  image: string;
  created: string;
};

type status = 'Alive' | 'Dead' | 'unknown';

type species = 'Human' | 'Alien' | 'Humanoid' | 'unknown';

type gender = 'Male' | 'Female';
