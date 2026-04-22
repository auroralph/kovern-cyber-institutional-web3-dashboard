import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "@/components/cyber/AppLayout";

// Pathless layout route — wraps all /app/* nested routes
export const Route = createFileRoute("/_app")({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
