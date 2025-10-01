import type StudentInterface from '@/types/StudentInterface';

<<<<<<< HEAD
const base = process.env.NEXT_PUBLIC_API?.replace(/\/?$/, '/'); // гарантируем слэш в конце

=======
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${base}students`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
<<<<<<< HEAD
    return (await response.json()) as StudentInterface[];
  } catch (err) {
    console.log('>>> getStudentsApi error', err);
    return [];
=======
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as StudentInterface[];
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${base}students/${studentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return studentId;
  } catch (err) {
    console.log('>>> deleteStudentApi error', err);
=======
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6
    return -1;
  }
};
