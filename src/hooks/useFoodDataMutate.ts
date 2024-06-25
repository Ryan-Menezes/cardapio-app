import axios, { AxiosPromise } from 'axios'
import { Food } from '../interfaces/Food';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080';

const postData = async (data: Food): AxiosPromise<unknown> => {
  const response = await axios.post<Food[]>(`${API_URL}/food`, data)
  return response;
}

export function useFoodDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['foods'],
      });
    },
  });

  return mutate;
}
