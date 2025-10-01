import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
<<<<<<< HEAD
import { deleteStudentApi, getStudentsApi } from '@/api/studentsAPI';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
=======
import { deleteStudentApi, getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import isServer from '@/utils/isServer';

interface StudentsHookInterface {
  students: StudentInterface[];
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
  deleteStudentMutate: (studentId: number) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

<<<<<<< HEAD
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
=======
  const { data, refetch } = useQuery({
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
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

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  return {
<<<<<<< HEAD
    students: data,
    isLoading,
    isError,
    refetch,
    deleteStudentMutate,
=======
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
  };
};

export default useStudents;
  