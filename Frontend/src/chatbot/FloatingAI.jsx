export default function FloatingAI({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "24px",
        background: "#4f46e5",
        color: "white",
        border: "none",
        cursor: "pointer",
        zIndex: 1000
      }}
    >
      🤖
    </button>
  );
}
