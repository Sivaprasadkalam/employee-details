import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddEmployee = ({ addEmployee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
//   const [updatedAt, setUpdatedAt] = useState(new Date().toISOString());

  const designations = ["HR", "Manager", "Sales", "Engineer", "Accountant"];

  const handleCheckboxChange = (e) => {
    const course = e.target.value;
    if (courses.includes(course)) {
      setCourses(courses.filter((c) => c !== course));
    } else {
      setCourses([...courses, course]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image (JPG or PNG only)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

    const employee = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image: imageUrl,
    };

    addEmployee(employee);
    alert("Employee Added Successfully, Check in the Employee List");
    // Reset form fields
    setName("");
    setEmail("");
    setMobile("");
    setDesignation("");
    setGender("");
    setCourses([]);
    setImage(null);
  };
  reader.readAsDataURL(image);
};
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add Your Expenses
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Mobile Field */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 font-bold">
            Mobile No:
          </label>
          <input
            type="number"
            id="mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Designation Dropdown */}
        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700 font-bold">
            Designation:
          </label>
          <select
            id="designation"
            required
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border rounded w-full py-2 px-3"
          >
            <option value="">Select a designation</option>
            {designations.map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Gender:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        {/* Courses Checkbox */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Courses:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                value="MCA"
                checked={courses.includes("MCA")}
                onChange={handleCheckboxChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                checked={courses.includes("BCA")}
                onChange={handleCheckboxChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                checked={courses.includes("BSC")}
                onChange={handleCheckboxChange}
              />
              BSC
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold">
            Upload Image (JPG or PNG):
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg, .png"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>

        {/* Link to Finance Table */}
        <div className="flex justify-end mt-4">
          <Link
            to="/employees"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Employee List
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
