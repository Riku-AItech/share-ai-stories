import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { Dog, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePosts } from "@/hooks/use-posts";

export default function Profile() {
  const navigate = useNavigate();
  const session = useSession();
  const { useUserPosts } = usePosts();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: userPosts, isLoading: isLoadingPosts } = useUserPosts(session?.user?.id || '');

  if (isLoadingProfile || isLoadingPosts) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (!profile) {
    return (
      <AuthenticatedLayout>
        <div className="text-center py-8">
          <p>プロフィールが見つかりません</p>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="container max-w-4xl py-8 space-y-8 animate-fade-in">
        {/* User Profile Section */}
        <section className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <Avatar className="h-24 w-24 ring-2 ring-primary/20">
                <AvatarImage src={profile.avatar_url} alt={profile.username} />
                <AvatarFallback>
                  <Dog className="h-12 w-12 text-[#FF6B6B]" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-muted-foreground">{profile.bio || "自己紹介文がありません"}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/edit-profile')}
            >
              <Pencil className="mr-2 h-4 w-4" />
              プロフィールを編集
            </Button>
          </div>
        </section>

        {/* User Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">投稿一覧</h2>
            <div className="text-sm text-muted-foreground">
              全 {userPosts?.length || 0} 件
            </div>
          </div>
          <div className="space-y-6">
            {userPosts?.map((post) => (
              <PostCard
                key={post.id}
                id={post.id.toString()}
                title={post.title}
                author={{
                  name: profile.username || "Unknown",
                  avatar: profile.avatar_url || "/placeholder.svg"
                }}
                likes={post.likesCount}
                comments={post.commentsCount}
                tags={post.tags ? post.tags.split(',') : []}
                showEditControls={true}
                isAuthenticated={true}
              />
            ))}
            {userPosts?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                まだ投稿がありません
              </div>
            )}
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}