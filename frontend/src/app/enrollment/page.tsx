"use client";
import { useState } from "react";
import "@/styles/enrollment-form.css";
import Navbar from "@/components/navbar";

export default function EnrollmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !age || !location || !interest) {
      alert("Please fill all the details");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age: Number(age), location, interest }),
      });
      const data = await res.json();
      console.log(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setAge("");
    setLocation("");
    setInterest("");
    setSubmitted(false);
  };

  return (
    <div className="enroll-wrapper">
      <Navbar/>
      <div className="enroll-card">
        <div className="enroll-top-bar" />
        <div className="enroll-inner">
          {submitted ? (
            <div className="thankyou">
              <div className="thankyou-icon">✓</div>
              <h3>Youre enrolled!</h3>
              <p>
                Thanks for reaching out. Our team will get back to you shortly
                and help you get started on your journey.
              </p>
              <button className="reset-btn" onClick={handleReset}>
                ← Submit another response
              </button>
            </div>
          ) : (
            <>
              <div className="enroll-tag">
                <span />
                Enrollment Open
              </div>
              <h2 className="enroll-title">
                Join the <span>XTRACT</span> ecosystem
              </h2>
              <p className="enroll-sub">
                Fill in your details and well be in touch within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="field-group">
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row-2">
                    <div className="field">
                      <label>Age</label>
                      <input
                        type="number"
                        placeholder="25"
                        value={age}
                        min={1}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Location</label>
                      <input
                        type="text"
                        placeholder="Mumbai, India"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Area of Interest</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Outreach, Lead Generation…"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Submitting…" : "Submit Enrollment →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
