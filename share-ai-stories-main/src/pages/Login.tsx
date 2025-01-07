import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        let errorMessage = "ログインに失敗しました";
        
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "メールアドレスまたはパスワードが正しくありません";
        }
        
        throw new Error(errorMessage);
      }

      toast({
        title: "ログイン成功",
        description: "ようこそ戻ってきました！",
      });
      
      navigate('/home');
    } catch (error: any) {
      toast({
        title: "エラー",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-md mx-auto py-16">
        <div className="glass-card p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-8">ログイン</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  {...register('email', { required: true })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                パスワード
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register('password', { required: true })}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white hover:opacity-90"
            >
              ログイン
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は
              <Button
                variant="link"
                className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 p-0 ml-1"
                onClick={() => navigate('/register')}
              >
                新規登録
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;