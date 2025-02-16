import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./usercontext"; // 

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); 
  const { setUser } = useUser();

  useEffect(() => {
    localStorage.setItem("username", "Siva Prasad");
    localStorage.setItem("password", "12345678");
  }, []); 

  const handleLogin = (e) => {
    e.preventDefault();

    const storedusername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedusername && password === storedPassword) {
      setUser("Siva Prasad"); // Update user context
      navigate("/employees");
    } else {
      
      alert("Incorrect credentials");
    }
  };

  
  // if (isLoggedIn) {
  //   navigate("/employees"); 
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-md overflow-hidden shadow-lg">
        <div className="border border-gray-300 bg-white p-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Sign in
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <label htmlFor="username" className="sr-only">
                username address
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                placeholder="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
