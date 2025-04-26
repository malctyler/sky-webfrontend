import { useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await httpClient.get('/api/Customers');
        setCustomers(data);
      } catch (err) {
        setError('Failed to fetch customers');
        console.error(err);
      }
    };
    fetchCustomers();
  }, []);

  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Customers</h2>
      {customers.map((customer: any) => (
        <div key={customer.id}>{customer.name}</div>
      ))}
    </div>
  );
};