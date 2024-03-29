import React, { useState } from "react";
import { Container, TextField, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(null);
    const { error } = await props.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card sx={{ width: "40%", height: "40%", p: 1 }}>
        <CardContent>
          Welcome
          <form onSubmit={handleSignIn}>
            <div>
              <TextField
                id="email"
                label="Username"
                type="email"
                variant="outlined"
                margin="normal"
                size="small"
                onChange={(event) => setEmail(event.target.value)}
                sx={{ backgroundColor: "#fff", width: "70%" }}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                size="small"
                onChange={(event) => setPassword(event.target.value)}
                sx={{ backgroundColor: "#fff", width: "70%" }}
              />
            </div>
            {error && <p>{error}</p>}
            <div style={{ marginTop: "15px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                margin="normal"
                sx={{ width: "70%" }}
              >
                SignIn
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
