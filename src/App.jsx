import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

const matches = [
  { id: 1, team1: "CSK", team2: "MI", date: "28 Mar 2027", venue: "MA Chidambaram Stadium, Chennai", price: 1500 },
  { id: 2, team1: "RCB", team2: "KKR", date: "30 Mar 2027", venue: "M. Chinnaswamy Stadium, Bengaluru", price: 1800 },
  { id: 3, team1: "DC", team2: "RR", date: "02 Apr 2027", venue: "Arun Jaitley Stadium, Delhi", price: 1200 },
  { id: 4, team1: "SRH", team2: "GT", date: "05 Apr 2027", venue: "Rajiv Gandhi Stadium, Hyderabad", price: 1000 },
];

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="matches" id="matches">
        <h2>Upcoming Matches</h2>
        <div className="match-list">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
              price={match.price}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;