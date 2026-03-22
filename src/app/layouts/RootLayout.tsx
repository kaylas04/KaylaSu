import { Outlet, ScrollRestoration } from "react-router";
import { CustomCursor } from "../components/CustomCursor";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#F0F8FF] text-[#0A192F] font-sans selection:bg-[#0A192F] selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
