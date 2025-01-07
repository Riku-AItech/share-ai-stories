import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AuthenticatedHome from "@/pages/AuthenticatedHome";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";
import PostDetail from "@/pages/PostDetail";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "./integrations/supabase/client";

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<AuthenticatedHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/posts/:id" element={<PostDetail isAuthenticated={false} />} />
          <Route path="/authenticated/posts/:id" element={<PostDetail isAuthenticated={true} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;