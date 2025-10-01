'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();
  
const onDeleteHandler = (id: number) => {
  console.log(id);
  deleteStudentMutate(id);
  
}
 

  return (
    <div className={styles.Student}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default Students;
