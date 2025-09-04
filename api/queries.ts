import { useQuery } from '@tanstack/react-query';
import api from './api';

export const useReports = (token: string, id: string) =>
  useQuery({
    queryKey: ['reports', id],
    queryFn: async () => await api.reports.fetchReports(token, id),
    // only fetch when a token and id is available
    enabled: Boolean(token) && !!id,
    retry: false,
    refetchInterval: 300000, // refetch every 5 minutes
  });

export default { useReports };
