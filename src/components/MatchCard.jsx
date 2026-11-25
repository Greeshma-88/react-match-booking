import { supabase } from "../supabase";

export default function MatchCard({ match, onBooked }) {
  async function handleBook() {
    const tickets = 1;
    const pricePerTicket = match.price ?? 500; // change to your price column if it has another name

    if (match.available_seats < tickets) {
      alert("Sold out!");
      return;
    }

    // 1. Insert the booking
    const { error: insertError } = await supabase.from("bookings").insert([
      {
        match_id: match.id,
        user_name: "Greeshma V",
        match_title: `${match.team1} vs ${match.team2}`,
        tickets: tickets,
        total_price: pricePerTicket * tickets,
      },
    ]);

    if (insertError) {
      alert("Booking failed: " + insertError.message);
      return;
    }

    // 2. Reduce available seats
    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: match.available_seats - tickets })
      .eq("id", match.id)
      .gte("available_seats", tickets);

    if (updateError) {
      alert("Seat update failed: " + updateError.message);
      return;
    }

    alert("Ticket booked!");
    if (onBooked) onBooked();
  }

  return (
    <div className="match-card">
      <h3>
        {match.team1} vs {match.team2}
      </h3>
      <p>
        {match.date} · {match.venue}
      </p>
      <p>Seats left: {match.available_seats}</p>
      <button onClick={handleBook} disabled={match.available_seats <= 0}>
        {match.available_seats <= 0 ? "Sold Out" : "Book Ticket"}
      </button>
    </div>
  );
}