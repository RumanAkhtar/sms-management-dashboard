import React, { useEffect, useState } from 'react';
import './CountryOperatorManagement.css';
import { getCountryOperators, addCountryOperator, updateCountryOperator, deleteCountryOperator } from '../../api/api'; // Your API functions

const CountryOperatorManagement = () => {
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState({ country: '', operator: '' });

  useEffect(() => {
    const fetchOperators = async () => {
      const response = await getCountryOperators();
      setOperators(response.data);
    };
    fetchOperators();
  }, []);

  const handleAdd = async () => {
    await addCountryOperator(newOperator);
    setNewOperator({ country: '', operator: '' });
    // Fetch updated operators
  };

  const handleDelete = async (id) => {
    await deleteCountryOperator(id);
    // Fetch updated operators
  };

  return (
    <div className="country-operator-management">
      <h2>Country Operator Management</h2>
      <input
        type="text"
        placeholder="Country"
        value={newOperator.country}
        onChange={(e) => setNewOperator({ ...newOperator, country: e.target.value })}
      />
      <input
        type="text"
        placeholder="Operator"
        value={newOperator.operator}
        onChange={(e) => setNewOperator({ ...newOperator, operator: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {operators.map((operator) => (
          <li key={operator.id}>
            {operator.country} - {operator.operator}
            <button onClick={() => handleDelete(operator.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryOperatorManagement;
