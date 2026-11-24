import { useState } from "react";

function MatchCard({ team1, team2, date, venue, price }) {
  const [booked, setBooked] = useState(false);

  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>
      <p>📅 {date}</p>
      <p>📍 {venue}</p>
      <p>₹{price}</p>
      <button onClick={() => setBooked(!booked)}>
        {booked ? "Booked ✓" : "Book Now"}
      </button>
    </div>
  );
}

export default MatchCard;