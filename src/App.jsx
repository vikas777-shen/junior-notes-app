import React, { useState } from "react";

const data = {
  "Class 8": {
    Mathematics: {
      Algebra: "Basic identities and simple linear equations.",
    },
  },
  "Class 9": {
    Science: {
      Physics: "Motion and Laws of Motion basics.",
    },
  },
  "Class 10": {
    Mathematics: {
      Trigonometry: "sin²θ + cos²θ = 1",
      Statistics: "Mean = Sum of observations / Total observations",
    },
    Science: {
      Chemistry: "Acids turn blue litmus red.",
    },
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your real Razorpay Key
      amount: 4900, // ₹49 in paise
      currency: "INR",
      name: "Junior Notes App",
      description: "Premium Access",
      handler: function () {
        alert("Payment Successful! Premium Activated.");
        setIsPremium(true);
      },
      prefill: { name: username },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // LOGIN PAGE
  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Login</h2>
        <input
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <button onClick={() => setUser(username)}>Enter</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>📚 Junior Short Notes App</h1>

      {!isPremium ? (
        <button onClick={handlePayment}>Unlock Premium ₹49</button>
      ) : (
        <p style={{ color: "green" }}>Premium Activated ✅</p>
      )}

      <hr /><br />

      {!selectedClass && (
        <div>
          <h3>Select Class:</h3>
          {Object.keys(data).map((cls) => (
            <button key={cls} onClick={() => setSelectedClass(cls)}>
              {cls}
            </button>
          ))}
        </div>
      )}

      {selectedClass && !selectedSubject && (
        <div>
          <button onClick={() => setSelectedClass(null)}>Back</button>
          <h3>Select Subject:</h3>
          {Object.keys(data[selectedClass]).map((subject) => (
            <button key={subject} onClick={() => setSelectedSubject(subject)}>
              {subject}
            </button>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div>
          <button onClick={() => setSelectedSubject(null)}>Back</button>
          <h3>Chapters:</h3>
          {Object.
