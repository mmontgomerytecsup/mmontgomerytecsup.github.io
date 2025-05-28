import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful login (e.g., redirect, store token)
                alert("Login successful!");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <>
        <div className="centered-container" style={{ padding: "50px 0"}}>

        
        <div style={{ maxWidth: 400, margin: "auto", padding: 20, paddingTop: 50, background: "#f9fafb", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Sign in to CloudGames</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333333" }}>
                        Username
                    </label>
                    <input
                        type="email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        autoFocus  
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            border: "1.5px solid #a0aec0",
                            borderRadius: 8,
                            fontSize: 16,
                            outline: "none",
                            transition: "border 0.2s, box-shadow 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            background: "linear-gradient(90deg, #f8fafc 0%, #e2e8f0 100%)"
                        }}
                        onFocus={e => (e.target.style.border = "1.5px solid #3182ce")}
                        onBlur={e => (e.target.style.border = "1.5px solid #a0aec0")}
                        placeholder="Enter your email address"
                    />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            border: "1.5px solid #a0aec0",
                            borderRadius: 8,
                            fontSize: 16,
                            outline: "none",
                            transition: "border 0.2s, box-shadow 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            background: "linear-gradient(90deg, #f8fafc 0%, #e2e8f0 100%)"
                        }}
                        onFocus={e => (e.target.style.border = "1.5px solid #3182ce")}
                        onBlur={e => (e.target.style.border = "1.5px solid #a0aec0")}
                        placeholder="Enter your password"
                    />
                </div>
                {error && (
                    <div style={{ color: "red", marginTop: 10 }}>{error}</div>
                )}
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
                        boxShadow: "0 4px 16px rgba(49,130,206,0.15)",
                        cursor: "pointer",
                        letterSpacing: 1,
                        transition: "transform 0.1s, box-shadow 0.1s, background 0.2s"
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    onFocus={e => (e.currentTarget.style.boxShadow = "0 0 0 3px #90cdf4")}
                    onBlur={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(49,130,206,0.15)")}
                >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <rect width="24" height="24" rx="12" fill="#fff" fillOpacity="0.08"/>
                            <path d="M12 17a1 1 0 0 1-1-1v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 0 1-1 1z" fill="#fff"/>
                        </svg>
                        Login
                    </span>
                </button>
            </form>
        </div>
        </div>
        </>
    );
};

export default Login;