import { useCallback, useEffect, useState } from "react";
import { fetchWithoutToken } from "../../helpers/fetch";

export const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const getTeachers = useCallback(async () => {
    const { teachers } = await fetchWithoutToken("admin/teachers");
    setTeachers(teachers);
  }, []);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Teachers</h4>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
