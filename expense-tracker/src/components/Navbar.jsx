import axios from 'axios';

function Navbar({ user, setUser }) {
  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/users/logout');
      alert(res.data.message);
      setUser(null);
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      {user && <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>}
    </nav>
  );
}

export default Navbar;
