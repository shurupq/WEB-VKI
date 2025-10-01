'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
<<<<<<< HEAD
import { useEffect } from 'react';

const Students = (): React.ReactElement => {
  const { students, isLoading, isError, refetch, deleteStudentMutate } = useStudents();

  // если хочешь инициировать загрузку явно (когда раньше стоял enabled:false)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const onDeleteHandler = (id: number) => {
    deleteStudentMutate(id);
  };

  if (isLoading) return <div className={styles.Student}>Загрузка…</div>;
  if (isError)   return <div className={styles.Student}>Ошибка загрузки студентов</div>;
=======

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();
  
const onDeleteHandler = (id: number) => {
  console.log(id);
  deleteStudentMutate(id);
  
}
 
>>>>>>> dc1f74f63f03d6ddd41095fe0849c89c0d708ac6

  return (
    <div className={styles.Student}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
      {students.length === 0 && <div>Студентов нет</div>}
    </div>
  );
};

export default Students;
