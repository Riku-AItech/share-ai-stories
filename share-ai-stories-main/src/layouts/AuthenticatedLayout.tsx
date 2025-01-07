import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { AppSidebar } from "@/components/AppSidebar";

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <AuthenticatedHeader />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}