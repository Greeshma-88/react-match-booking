import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import MatchCard from "./components/MatchCard";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch error:", error.message);
      setError(error.message);
    } else {
      setMatches(data);
      setError(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMatches();

    // Realtime: refetch whenever the matches table changes
    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        () => fetchMatches()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      <div className="matches">
        {loading && <p>Loading matches...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading &&
          !error &&
          matches.map((m) => (
            <MatchCard key={m.id} match={m} onBooked={fetchMatches} />
          ))}
      </div>

      <Footer />
    </div>
  );
}