import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";

export default function AdminHeader() {
    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        {/* Kiri: Judul + Search Bar */}
        <div className="flex items-center space-x-6 w-1/2">

            {/* Search Bar */}
            <form className="hidden md:flex items-center flex-1">
            <input
                type="text"
                placeholder="Search for..."
                className="w-full border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
            >
                <FaSearch />
            </button>
            </form>
        </div>

        {/* Kanan: Notifikasi + User */}
        <div className="flex items-center space-x-6">
            {/* Notifikasi */}
            <div className="relative cursor-pointer">
            <FaBell className="text-gray-500 text-lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                3
            </span>
            </div>

            {/* Pesan */}
            <div className="relative cursor-pointer">
            <FaEnvelope className="text-gray-500 text-lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                7
            </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Halo, Admin 👋</span>
            <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="rounded-full w-10 h-10"
            />
            </div>
        </div>
        </header>
    );
}