import MatchCard from "./MatchCard";

const matches = [
  { id: 1, team1: "MI", team2: "CSK", date: "12 Apr 2026", venue: "Wankhede, Mumbai", price: 1500 },
  { id: 2, team1: "RCB", team2: "KKR", date: "14 Apr 2026", venue: "Chinnaswamy, Bengaluru", price: 1200 },
  { id: 3, team1: "DC", team2: "SRH", date: "16 Apr 2026", venue: "Arun Jaitley, Delhi", price: 1000 },
];

function Booking() {
  return (
    <div className="match-list">
      {matches.map((m) => (
        <MatchCard
          key={m.id}
          team1={m.team1}
          team2={m.team2}
          date={m.date}
          venue={m.venue}
          price={m.price}
        />
      ))}
    </div>
  );
}

export default Booking;