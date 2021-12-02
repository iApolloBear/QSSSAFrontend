import { useCallback, useEffect, useState } from "react";
import { fetchWithToken } from "../../helpers/fetch";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const getStudents = useCallback(async () => {
    const { students } = await fetchWithToken("teacher/students");
    setStudents(students);
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
              {students.map(({ user }) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  {user.email ? <td>{user.email}</td> : <td>Guest</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
