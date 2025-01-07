import { useState } from "react";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Dog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This would come from your auth system in a real app
const MOCK_USER = {
  name: "AI太郎",
  avatar: "/placeholder.svg",
  bio: "AIツールの活用方法を日々研究しています。特にテキスト生成と画像生成に興味があります。"
};

export default function EditProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    bio: MOCK_USER.bio,
    avatar: MOCK_USER.avatar
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to update the user profile
    toast({
      title: "プロフィールを更新しました",
      description: "変更内容が保存されました。",
    });
    navigate('/profile');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      toast({
        title: "アバター画像をアップロードしました",
        description: "新しいアバター画像が設定されました。",
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container max-w-2xl py-8 space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">プロフィール編集</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 ring-2 ring-primary/20">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>
                <Dog className="h-12 w-12 text-[#FF6B6B]" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full max-w-xs"
              />
              <span className="text-sm text-muted-foreground">
                JPG, PNG形式の画像をアップロード
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              ユーザー名
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ユーザー名を入力"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              自己紹介
            </label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="自己紹介を入力"
              className="min-h-[150px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              キャンセル
            </Button>
            <Button 
              type="submit"
              className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
            >
              保存
            </Button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}