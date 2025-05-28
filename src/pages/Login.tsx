import React, { useState, useEffect } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState<{ username: string } | null>(null);

    // Check localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

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
                if (data.status === "success") {
                    if (data.user.state === 1) {
                        localStorage.setItem("user", JSON.stringify(data.user)); // Save user info
                        //alert(`Welcome, ${data.user.username}!`);
                        window.location.href = "/"; // Redirect to home or dashboard
                    } else {
                        setError(`Account is not active. Current state: ${data.user.state}`);
                    }
                } else {
                    setError(data.message || "Login failed");
                }
            } else {
                setError("Server error during login");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <div className="centered-container" style={{ padding: "50px 0" }}>
            <div style={{
                maxWidth: 400,
                margin: "auto",
                padding: 20,
                paddingTop: 50,
                background: "#f9fafb",
                borderRadius: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
            }}>
                {user ? (
                    <>
                        <h2 style={{ textAlign: "center", marginBottom: 24 }}>
                            Welcome, {user.username}!
                        </h2>
                        <button
                            onClick={handleLogout}
                            style={{
                                width: "100%",
                                padding: "12px 0",
                                background: "#e53e3e",
                                color: "#fff",
                                fontWeight: 700,
                                border: "none",
                                borderRadius: 8,
                                boxShadow: "0 4px 12px rgba(229,62,62,0.2)",
                                cursor: "pointer",
                                transition: "background 0.2s"
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Sign in to CloudGames</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333333" }}>
                                    Username
                                </label>
                                <input className="input-style"
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                    onFocus={e => (e.target.style.border = "1.5px solid #3182ce")}
                                    onBlur={e => (e.target.style.border = "1.5px solid #a0aec0")}
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333" }}>
                                    Password
                                </label>
                                <input className='input-style'
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
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
                            >
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                        <rect width="24" height="24" rx="12" fill="#fff" fillOpacity="0.08" />
                                        <path d="M12 17a1 1 0 0 1-1-1v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 0 1-1 1z" fill="#fff" />
                                    </svg>
                                    Login
                                </span>
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
