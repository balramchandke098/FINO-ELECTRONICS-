
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await adminLogin(email, password);
      if (user) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin password.');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-charcoal-black min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-admin-card p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Fino Admin Panel
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 bg-[#2a2e37] border border-gray-700 placeholder-cool-gray text-white rounded-t-md focus:outline-none focus:ring-royal-purple focus:border-royal-purple focus:z-10 sm:text-sm"
                placeholder="Email address (any email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 bg-[#2a2e37] border border-gray-700 placeholder-cool-gray text-white rounded-b-md focus:outline-none focus:ring-royal-purple focus:border-royal-purple focus:z-10 sm:text-sm"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-error-red">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-royal-purple hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-purple disabled:bg-cool-gray"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
