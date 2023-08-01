/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAsync, useFetchAndLoad } from '@/hooks';
import {
  getCharactersEndpointModel,
  getCharactersTransformerModel,
} from '@/models';
import { getCharacters } from '@/services';
import { dateTransformer, getCharactersTransformer } from '@/transformers';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

export function TableCharacters() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [characters, setCharacters] =
    useState<getCharactersTransformerModel | null>(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const getApiData = async (page?: number) =>
    await callEndpoint(getCharacters(page));

  useAsync(
    getApiData,
    (data: getCharactersEndpointModel) => {
      const transformedData = getCharactersTransformer(data);
      setCharacters(transformedData);
    },
    () => {},
  );

  const onPaginationModelChange = async (newModel: any) => {
    setPaginationModel(newModel);
    const total = characters?.results.length;

    if (newModel.pageSize * newModel.page + newModel.pageSize === total) {
      const newPage = characters?.info.next?.split('=')[1];
      const newData: any = await getApiData(Number(newPage));
      const transformedData: any = getCharactersTransformer(newData.data);
      setCharacters((prev: any) => ({
        info: transformedData.info,
        results: prev?.results.concat(transformedData.results),
      }));
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'image',
      headerName: 'image',
      renderCell: (params: any) => {
        return <Avatar src={params.value} key={params} />;
      },
    },
    { field: 'status', headerName: 'Status' },
    { field: 'species', headerName: 'Species' },
    { field: 'gender', headerName: 'Gender' },
    {
      field: 'created',
      headerName: 'Created',
      width: 130,
      renderCell: (params: any) => dateTransformer(params.value),
    },
  ];

  return (
    <>
      <DataGrid
        rows={characters?.results ?? []}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        isRowSelectable={() => false}
      />
    </>
  );
}
