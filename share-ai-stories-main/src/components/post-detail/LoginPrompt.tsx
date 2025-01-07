import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <div className="bg-card p-6 rounded-lg text-center space-y-4 mt-8">
      <h3 className="text-lg font-semibold">
        コメントやいいねをするにはログインが必要です
      </h3>
      <p className="text-muted-foreground">
        ログインして、AIXのコミュニティに参加しましょう！
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate("/login")}>
          ログイン
        </Button>
        <Button variant="outline" onClick={() => navigate("/register")}>
          新規登録
        </Button>
      </div>
    </div>
  );
}