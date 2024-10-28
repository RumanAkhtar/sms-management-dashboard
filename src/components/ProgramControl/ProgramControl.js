import React, { useState } from 'react';
import './ProgramControl.css';
import { startSession, stopSession } from '../../api/api'; // Import your API functions

const ProgramControl = ({ session }) => {
  const [status, setStatus] = useState('inactive');

  const handleStart = async () => {
    const response = await startSession(session);
    if (response.status === 200) {
      setStatus('active');
    }
  };

  const handleStop = async () => {
    const response = await stopSession(session);
    if (response.status === 200) {
      setStatus('inactive');
    }
  };

  return (
    <div className="program-control">
      <h2>{session.name}</h2>
      <p>Status: {status}</p>
      <button onClick={handleStart} disabled={status === 'active'}>
        Start
      </button>
      <button onClick={handleStop} disabled={status === 'inactive'}>
        Stop
      </button>
    </div>
  );
};

export default ProgramControl;
