import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./usercontext";
import { useNavigate } from "react-router-dom";

const Employees = ({ employee, setEmployee }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the user context
    navigate("/"); // Redirect to the login page
  };

  const deleteExpense = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (confirmDelete) {
      const updatedExpenses = [...employee];
      updatedExpenses.splice(index, 1);
      setEmployee(updatedExpenses);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Navbar at the top */}
      <div className="flex justify-between items-center mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg">
        <div>
          {user ? `Welcome, ${user}` : "Welcome, Guest"}
        </div>
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="mx-auto border border-gray-300 rounded-lg overflow-hidden max-w-screen-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                <th className="border border-gray-300 px-4 py-2">Designation</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Courses</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{emp.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.email || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.mobile || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.designation || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.gender || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.courses?.join(", ") || "N/A"}</td>
                  <td className="border px-4 py-2">
                    {emp.image ? (
                      <img
                        src={emp.image}
                        alt="Employee"
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/edit-employee/${index}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteExpense(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-4 py-2">
          <Link
            to="/add-employee"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            New Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Employees;
