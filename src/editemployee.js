import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditEmployee = ({ employee, setEmployee }) => {
  const { index } = useParams();
  const navigate = useNavigate();

  // Initialize form data with default empty values
  const defaultFormData = {
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: "",
  };

  // Set the initial state using the default or existing employee data
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const employeeToEdit = employee[index];

    // If the index is out of bounds or the employee is undefined, navigate away
    if (!employeeToEdit) {
      navigate("/employees"); // Redirect to Employee list
      return; // Exit useEffect to avoid unnecessary re-render
    }

    setFormData({
      name: employeeToEdit.name || "",
      email: employeeToEdit.email || "",
      mobile: employeeToEdit.mobile || "",
      designation: employeeToEdit.designation || "",
      gender: employeeToEdit.gender || "",
      courses: employeeToEdit.courses || [],
      image: employeeToEdit.image || "",
    });
  }, [index, employee, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const course = e.target.value;
    if (formData.courses.includes(course)) {
      setFormData({
        ...formData,
        courses: formData.courses.filter((c) => c !== course),
      });
    } else {
      setFormData({
        ...formData,
        courses: [...formData.courses, course],
      });
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({
        ...formData,
        image: event.target.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = [...employee];
    updatedEmployee[index] = {
      ...formData,
    };

    setEmployee(updatedEmployee);
    alert("Employee updated successfully, Check in the Employee List");
  };

  const designations = ["HR", "Manager", "Sales", "Engineer", "Accountant"];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Form fields */}
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Mobile No:</label>
          <input
            type="number"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Designation:</label>
          <select
            name="designation"
            required
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a designation</option>
            {designations.map((designation, index) => (
              <option key={index} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Radio Buttons */}
        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleInputChange}
              />
              Other
            </label>
          </div>
        </div>

        {/* Courses Checkbox */}
        <div className="mb-4">
          <label className="block mb-2">Courses:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                name="MCA"
                checked={formData.courses.includes("MCA")}
                onChange={handleCheckboxChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="BCA"
                checked={formData.courses.includes("BCA")}
                onChange={handleCheckboxChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="BSC"
                checked={formData.courses.includes("BSC")}
                onChange={handleCheckboxChange}
              />
              BSC
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2">Upload Image (JPG or PNG):</label>
          <input
            type="file"
            accept=".jpg, .png"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <Link to="/employees" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
