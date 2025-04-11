import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form>
        {/* Your form fields for login */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your email" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Enter your password" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
