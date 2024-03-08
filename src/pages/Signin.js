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
      <Card sx={{ width: "30vw", height: "30vh", backgroundColor: "#E5EAF2" }}>
        <CardContent>
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
                sx={{ backgroundColor: "#fff" }}
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
                sx={{ backgroundColor: "#fff" }}
              />
            </div>
            {error && <p>{error}</p>}
            <div style={{ marginTop: "15px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                margin="normal"
                sx={{ width: "47%" }}
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
