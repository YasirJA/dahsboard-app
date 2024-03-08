import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { supabase } from "./auth/supabaseClient";
import Menu from "./components/Menu";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  // Redirect to sign-in page if user is not signed in
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Menu supabase={supabase} session={session} />
        <Routes>
          <Route
            path="/"
            element={
              session ? (
                <Dashboard supabase={supabase} session={session} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/signin"
            element={<Signin supabase={supabase} session={session} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
