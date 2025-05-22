import React, { useState } from 'react';
import { deposit, withdraw } from '../api/api';

const DepositWithdraw = () => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus('');
    try {
      const action = type === 'deposit' ? deposit : withdraw;
      await action({ amount });
      setStatus(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
    } catch (error) {
      setStatus(`Error with ${type}: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Banking</h1>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        min="0"
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default DepositWithdraw;
