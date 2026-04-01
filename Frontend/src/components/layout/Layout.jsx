import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { BackgroundEffects } from "./BackgroundEffects";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname") || "사용자";

  useEffect(() => {
    const onboarded = localStorage.getItem("onboarded");
    if (!onboarded) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0a2e] to-[#16001e] relative overflow-hidden">
      <BackgroundEffects />
      <Header nickname={nickname} />
      <Navigation />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
