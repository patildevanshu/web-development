import TicketNum from "./TicketNum";

export default function Ticket({ ticket }) {
  return (
    <div style={{ border: "1px solid white", borderRadius: "14px" , width : "300px"}}>
        <p>Ticket</p>
      {ticket.map((num, idx) => (
        <TicketNum key={idx} num={num} />
      ))}
    </div>
  );
}
