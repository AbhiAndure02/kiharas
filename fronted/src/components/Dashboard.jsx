import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData); // Access the `registerData` array from the response
        setFilteredData(response.data.registerData); // Initialize filteredData
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data.'); // Set error message
      } finally {
        setLoading(false); // Set loading state to false
      }
    };
    registerData();
  }, []);

  const handleSearch = (term) => {
    if (term === '') {
      setFilteredData(data); // Reset to all data if search term is empty
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) || 
        item.applicationId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  return (
    <div className='p-4 w-full bg-slate-100'>
      <Header onSearch={handleSearch} />

      {filteredData.map((item) => (
        <div key={item._id} className='flex flex-col gap-5 mb-2 w-full'>
          <Link to={`register/${item.slug}`}>
            <div className='bg-white shadow-sm rounded-md mt-2 shadow-black w-full flex justify-between p-2'>
              <div className='px-2'>
                <h1>{item.name}</h1>
                <p>{item.lAmount}</p>
              </div>
              <div className='px-2'>
                <p className='text-green-500 p-2'>{item.lAmount}</p>
                <p className='text-green-500 p-2'>{item.rNumber}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
