import { useCallback, useEffect, useState } from "react";
import { fetchWithToken } from "../../helpers/fetch";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const getStudents = useCallback(async () => {
    const { qsssas } = await fetchWithToken("qsssa/my/qsssas");
    setStudents(qsssas.map((qsssa) => qsssa.users).flat());
  }, []);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Students</h4>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(students.map((student) => student._id)))
                .map((id) => ({
                  id: id,
                  name: students.find((student) => student._id === id).name,
                  email: students.find((student) => student._id === id).email,
                }))
                .map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    {student.email ? <td>{student.email}</td> : <td>Guest</td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
