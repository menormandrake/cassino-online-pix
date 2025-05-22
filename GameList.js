import React, { useEffect, useState } from 'react';
import { getGames } from '../api/api';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGames()
      .then(response => setGames(response.data))
      .catch(err => {
        console.error("Error fetching games:", err);
        setError("Failed to load games. Please try again later.");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Available Games</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
