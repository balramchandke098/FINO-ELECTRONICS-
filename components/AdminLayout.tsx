
import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar: React.FC = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    }

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-royal-purple text-white'
                : 'text-cool-gray hover:bg-admin-card hover:text-white'
        }`;

    return (
        <aside className="w-64 bg-charcoal-black flex flex-col p-4 border-r border-gray-800">
            <div className="flex items-center mb-10 px-2">
                <h1 className="text-2xl font-bold text-white">Fino <span className="text-royal-purple">Admin</span></h1>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/admin/dashboard" className={navLinkClasses}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products" className={navLinkClasses}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className={navLinkClasses}>Orders</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto">
                <div className="px-4 py-3 text-cool-gray">
                    <p className="font-semibold text-white">{currentUser?.name}</p>
                    <p className="text-sm">{currentUser?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-3 rounded-lg text-cool-gray hover:bg-admin-card hover:text-white transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-charcoal-black text-white font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-[#111318]">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
