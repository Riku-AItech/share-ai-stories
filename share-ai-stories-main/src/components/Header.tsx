import { Button } from "@/components/ui/button";
import { Dog, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Dog className="h-8 w-8 text-[#FF6B6B] animate-pulse" />
          <h1 className="text-2xl font-bold gradient-text">
            AIX
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="bg-white/80 hover:bg-white/90"
            onClick={() => navigate('/login')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            ログイン
          </Button>
          <Button 
            variant="outline"
            className="bg-white/80 hover:bg-white/90"
            onClick={() => navigate('/register')}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            新規登録
          </Button>
        </div>
      </div>
    </header>
  );
}