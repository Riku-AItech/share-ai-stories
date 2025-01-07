import { Button } from "@/components/ui/button";
import { Dog, Bell, Settings, PlusCircle, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AuthenticatedHeader() {
  const navigate = useNavigate();
  const unreadNotifications = 3; // This would come from your notification system

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
          <Dog className="h-8 w-8 text-[#FF6B6B] animate-pulse" />
          <h1 className="text-2xl font-bold gradient-text">
            AIX
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/home')}
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button 
            variant="default"
            className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
            onClick={() => navigate('/create-post')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            新規投稿
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#FF6B6B] text-[10px] font-medium text-white flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}