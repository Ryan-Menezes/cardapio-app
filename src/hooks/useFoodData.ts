import axios, { AxiosPromise } from 'axios'
import { Food } from '../interfaces/Food';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<Food[]> => {
  const response = await axios.get<Food[]>(`${API_URL}/food`)
  return response;
}

export function useFoodData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['foods'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data
  }
}
