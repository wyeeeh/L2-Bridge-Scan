import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 处理登录逻辑
    console.log('Username:', username);
    console.log('Password:', password);

    // 模拟登录成功
    if (username === 'admin' && password === 'password') {
        navigate('/dashboard');
        } else {
        alert('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black font-medium mb-2">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-medium mb-2">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white text-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;