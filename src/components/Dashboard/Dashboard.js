import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getMetrics } from '../../api/api';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ smsSent: 0, successRate: 0 });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [proxy, setProxy] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryOperatorPairs, setCountryOperatorPairs] = useState([]);
  const [newPair, setNewPair] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getMetrics();
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSendSMS = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost/sms-api/send_sms.php', {
        phone_number: phoneNumber,
        proxy: proxy,
      });

      if (response.data.success) {
        setMessage('SMS sent successfully!');
      } else {
        setMessage('Failed to send SMS.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      setMessage('Error sending SMS. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCountryOperator = (e) => {
    e.preventDefault();
    if (newPair) {
      setCountryOperatorPairs((prev) => [...prev, newPair]);
      setNewPair('');
      console.log(`Added country-operator pair: ${newPair}`);
    }
  };

  const handleProgramAction = async (pair, action) => {
    try {
      const response = await axios.post('http://localhost/sms-api/program_control.php', {
        action: action,
        pair: pair,
      });
      if (response.data.success) {
        setAlert(`${action.charAt(0).toUpperCase() + action.slice(1)} program for ${pair} successfully.`);
      } else {
        setAlert(`Failed to ${action} program for ${pair}.`);
      }
    } catch (error) {
      console.error(`Error ${action} program for ${pair}:`, error);
      setAlert(`Error ${action} program for ${pair}.`);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>SMS Management Dashboard</h1>
      </header>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>SMS Sent</h3>
          <p>{metrics.smsSent}</p>
        </div>
        <div className="metric-card">
          <h3>Success Rate</h3>
          <p>{metrics.successRate}%</p>
        </div>
      </div>

      {/* SMS Sending Form */}
      <section className="sms-form">
        <h2>Send SMS</h2>
        <form onSubmit={handleSendSMS}>
          <input
            type="text"
            className="input-field"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Proxy (optional)"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send SMS'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>

      {/* Program Control Section */}
      <section className="program-control">
        <h2>Program Control</h2>
        {countryOperatorPairs.map((pair) => (
          <div key={pair} className="program-control-item">
            <span>{pair}</span>
            <button onClick={() => handleProgramAction(pair, 'start')}>Start</button>
            <button onClick={() => handleProgramAction(pair, 'stop')}>Stop</button>
            <button onClick={() => handleProgramAction(pair, 'restart')}>Restart</button>
          </div>
        ))}
      </section>

      {/* Country-Operator Management Section */}
      <section className="country-operator-management">
        <h2>Country-Operator Management</h2>
        <form onSubmit={handleAddCountryOperator}>
          <input
            type="text"
            className="input-field"
            placeholder="Add Country-Operator Pair"
            value={newPair}
            onChange={(e) => setNewPair(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Add</button>
        </form>
        <ul>
          {countryOperatorPairs.map((pair) => (
            <li key={pair}>{pair}</li>
          ))}
        </ul>
      </section>

      {/* Alerts Section */}
      <section className="alerts">
        <h2>Alerts</h2>
        {alert && <p className="alert">{alert}</p>}
      </section>
    </div>
  );
};

export default Dashboard;
