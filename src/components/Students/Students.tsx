'use client';

import useStudents from '@/hooks/useStudents';
import type StudentsInterface from '@/types/StudentsInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div className={styles.Student}>
      {students.map((student: StudentsInterface) => (
        <h2 key={student.first_name}>
          {student.first_name}
          {student.last_name}
          {student.middle_name}
          {student.groupId}
        </h2>
      ))}
    </div>
  );
};

export default Students;
