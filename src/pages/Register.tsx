import React, { useState } from "react";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                setSuccess("Registration successful. You can now log in.");
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Server error.");
        }
    };

    return (
        <div className="centered-container" style={{ padding: "50px 0" }}>
            <div style={{ maxWidth: 400, margin: "auto", padding: 20, background: "#f9fafb", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                <h2 style={{ textAlign: "center", marginBottom: 24 }}>Register for CloudGames</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        className="input-style"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                    />

                    <label style={{ marginTop: 12 }}>Email</label>
                    <input
                        type="email"
                        className="input-style"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter email"
                    />

                    <label style={{ marginTop: 12 }}>Password</label>
                    <input
                        type="password"
                        className="input-style"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                    />

                    <label style={{ marginTop: 12 }}>Confirm Password</label>
                    <input
                        type="password"
                        className="input-style"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Repeat password"
                    />

                    {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
                    {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}

                    <button
                        type="submit"
                        style={{
                            marginTop: 20,
                            width: "100%",
                            padding: "14px 0",
                            background: "linear-gradient(90deg, #3182ce 0%, #805ad5 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 18,
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
