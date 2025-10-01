import type StudentInterface from '@/types/StudentInterface';

const base = process.env.NEXT_PUBLIC_API?.replace(/\/?$/, '/'); // гарантируем слэш в конце

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${base}students`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as StudentInterface[];
  } catch (err) {
    console.log('>>> getStudentsApi error', err);
    return [];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${base}students/${studentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return studentId;
  } catch (err) {
    console.log('>>> deleteStudentApi error', err);
    return -1;
  }
};
