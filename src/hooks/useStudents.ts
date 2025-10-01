import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi } from '@/api/studentsAPI';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  deleteStudentMutate: (studentId: number) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['students'],
    queryFn: getStudentsApi,         // короче и чище
    // enabled: false,                // УБРАТЬ — иначе не выполнится
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteStudentMutate } = useMutation({
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];

      // оптимистично помечаем как удалённого
      const updatedStudents = previousStudents.map((s) =>
        s.id === studentId ? { ...s, isDeleted: true } : s
      );

      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
      return { previousStudents };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousStudents) {
        queryClient.setQueryData<StudentInterface[]>(['students'], context.previousStudents);
      }
    },
    onSuccess: (studentId, _variables, context) => {
      const prev = context?.previousStudents ?? [];
      const updated = prev.filter((s) => s.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updated);
    },
    onSettled: () => {
      // на всякий случай синхронизируемся с сервером
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    students: data,
    isLoading,
    isError,
    refetch,
    deleteStudentMutate,
  };
};

export default useStudents;
  