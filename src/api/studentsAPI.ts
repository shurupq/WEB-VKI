import type SrudentsInterface from '@/types/StudentsInterface';

export const getStudentsApi = async (): Promise<SrudentsInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as SrudentsInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentApi', err);
    return [] as SrudentsInterface[];
  }
};
