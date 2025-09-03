import { useState } from "react";

function App() {
  const [category, setCategory] = useState("Scientific & Nerdy");
  const [twist, setTwist] = useState("");
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call backend
  const generateExcuse = async () => {
    setLoading(true);
    setExcuse("");

    try {
      const response = await fetch("http://localhost:8000/api/generate_excuse/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, twist }),
      });

      const data = await response.json();
      setExcuse(data.excuse);
    } catch (error) {
      console.error("Error fetching excuse:", error);
      setExcuse("⚠️ Error: Could not generate excuse. Check backend.");
    }

    setLoading(false);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(excuse);
    alert("Excuse copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Gym Excuse Generator</h2>
        <p>Generate an absurdly elaborate excuse for skipping the gym.</p>

        {/* Dropdown for category */}
        <label>
          Excuse Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option>Scientific & Nerdy</option>
            <option>Emotional Drama</option>
            <option>Conspiracy Theory</option>
            <option>Random</option>
          </select>
        </label>

        {/* Input for custom twist */}
        <label>
          Add Your Own Twist (Optional):
          <input
            type="text"
            value={twist}
            onChange={(e) => setTwist(e.target.value)}
            placeholder="e.g., having a headache"
            style={styles.input}
          />
        </label>

        {/* Generate button */}
        <button onClick={generateExcuse} style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate Excuse"}
        </button>

        {/* Excuse result */}
        {excuse && (
          <div style={styles.resultBox}>
            <h3>Your Excuse</h3>
            <textarea
              value={excuse}
              readOnly
              rows="6"
              style={styles.textarea}
            />
            <button onClick={copyToClipboard} style={styles.button}>
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline styles 
const styles = {
  container: {
    backgroundColor: "#0a0a23",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  card: {
    backgroundColor: "#1e1e2e",
    padding: "2rem",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  input: {
    display: "block",
    width: "100%",
    marginTop: "8px",
    marginBottom: "16px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #444",
  },
  button: {
    backgroundColor: "#646cff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    textAlign: "left",
  },
  textarea: {
    width: "100%",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
};

export default App;
