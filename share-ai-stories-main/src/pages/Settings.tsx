import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/database.types";

interface SettingsFormData extends Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'avatar_url'> {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SettingsFormData>({
    username: "",
    bio: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notification_likes: true,
    notification_comments: true,
    notification_follows: true,
    email_frequency: "daily",
    profile_visibility: "public",
    timezone: "Asia/Tokyo",
    language: "ja",
    theme: "light"
  });

  // プロフィール情報を取得
  const fetchProfile = async () => {
    if (!session?.user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        username: data.username || "",
        bio: data.bio || "",
        notification_likes: (data as Profile).notification_likes ?? true,
        notification_comments: (data as Profile).notification_comments ?? true,
        notification_follows: (data as Profile).notification_follows ?? true,
        email_frequency: (data as Profile).email_frequency || "daily",
        profile_visibility: (data as Profile).profile_visibility || "public",
        timezone: (data as Profile).timezone || "Asia/Tokyo",
        language: (data as Profile).language || "ja",
        theme: (data as Profile).theme || "light"
      }));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session?.user?.id]);

  // 設定の保存
  const handleSave = async () => {
    if (!session?.user?.id) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          bio: formData.bio,
          notification_likes: formData.notification_likes,
          notification_comments: formData.notification_comments,
          notification_follows: formData.notification_follows,
          email_frequency: formData.email_frequency,
          profile_visibility: formData.profile_visibility,
          timezone: formData.timezone,
          language: formData.language,
          theme: formData.theme
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "設定を保存しました",
        description: "変更内容が反映されました。",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "エラー",
        description: "設定の保存に失敗しました。",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // アカウントの削除
  const handleDeleteAccount = async () => {
    if (!window.confirm("本当にアカウントを削除しますか？この操作は取り消せません。")) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(session?.user?.id || "");
      if (error) throw error;

      toast({
        title: "アカウントを削除しました",
        description: "ご利用ありがとうございました。",
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "エラー",
        description: "アカウントの削除に失敗しました。",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container max-w-4xl py-8 space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">設定</h1>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="account">アカウント</TabsTrigger>
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
            <TabsTrigger value="privacy">プライバシー</TabsTrigger>
            <TabsTrigger value="display">表示</TabsTrigger>
          </TabsList>

          {/* アカウント設定 */}
          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">パスワード変更</h2>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="現在のパスワード"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="新しいパスワード"
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="新しいパスワード（確認）"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">メールアドレス変更</h2>
              <Input
                type="email"
                placeholder="新しいメールアドレス"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-red-500">アカウントの削除</h2>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                アカウントを削除する
              </Button>
            </div>
          </TabsContent>

          {/* プロフィール設定 */}
          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">基本情報</h2>
              <div className="space-y-4">
                <Input
                  placeholder="ユーザー名"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                />
                <Textarea
                  placeholder="自己紹介"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">プロフィール画像</h2>
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  画像をアップロード
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* 通知設定 */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">通知設定</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label>いいね通知</label>
                  <Switch
                    checked={formData.notification_likes}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notification_likes: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>コメント通知</label>
                  <Switch
                    checked={formData.notification_comments}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notification_comments: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>フォロー通知</label>
                  <Switch
                    checked={formData.notification_follows}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notification_follows: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">メール通知</h2>
              <Select
                value={formData.email_frequency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, email_frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="通知頻度を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">通知しない</SelectItem>
                  <SelectItem value="daily">毎日</SelectItem>
                  <SelectItem value="weekly">週1回</SelectItem>
                  <SelectItem value="monthly">月1回</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* プライバシー設定 */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">公開設定</h2>
              <Select
                value={formData.profile_visibility}
                onValueChange={(value) => setFormData(prev => ({ ...prev, profile_visibility: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="公開範囲を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">全員に公開</SelectItem>
                  <SelectItem value="followers">フォロワーのみ</SelectItem>
                  <SelectItem value="private">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* 表示設定 */}
          <TabsContent value="display" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">テーマ設定</h2>
              <Select
                value={formData.theme}
                onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="テーマを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ライトモード</SelectItem>
                  <SelectItem value="dark">ダークモード</SelectItem>
                  <SelectItem value="system">システム設定に従う</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">言語設定</h2>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="言語を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">タイムゾーン</h2>
              <Select
                value={formData.timezone}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="タイムゾーンを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Tokyo">日本時間 (UTC+9)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/Los_Angeles">太平洋時間 (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
          >
            {isLoading ? "保存中..." : "保存"}
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}