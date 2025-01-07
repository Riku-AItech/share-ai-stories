import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<RegisterFormData>();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "エラー",
        description: "パスワードが一致しません",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          }
        }
      });

      if (signUpError) {
        let errorMessage = "登録中にエラーが発生しました";
        
        if (signUpError.message.includes("User already registered")) {
          errorMessage = "このメールアドレスは既に登録されています";
        }

        toast({
          title: "エラー",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Registration successful
      toast({
        title: "登録成功",
        description: "アカウントが作成されました。ログインしてください。",
      });
      
      navigate('/login');
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
          <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                ユーザー名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="ユーザー名"
                  className="pl-10"
                  {...register('username', { required: true })}
                />
              </div>
            </div>
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                パスワード（確認）
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register('confirmPassword', { required: true })}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white hover:opacity-90"
            >
              登録する
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちの方は
              <Button
                variant="link"
                className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 p-0 ml-1"
                onClick={() => navigate('/login')}
              >
                ログイン
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;