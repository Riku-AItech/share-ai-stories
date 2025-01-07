import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dog, BookOpen, Calendar, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const navigate = useNavigate();
  const session = useSession();

  const { data: profile } = useQuery({
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

  const quickLinks = [
    { title: "AIツール一覧", icon: BookOpen, url: "/tools" },
    { title: "イベント情報", icon: Calendar, url: "/events" },
    { title: "利用ガイド", icon: BookOpen, url: "/guide" },
  ];

  const popularTags = [
    "#ChatGPT",
    "#Midjourney",
    "#Whisper",
    "#DeepL",
    "#StableDiffusion"
  ];

  return (
    <Sidebar>
      <SidebarContent>
        {/* User Profile Card */}
        <SidebarGroup>
          <div className="p-4">
            <div className="rounded-lg bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                  <AvatarFallback>
                    <Dog className="h-6 w-6 text-[#FF6B6B]" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{profile?.username || "ユーザー"}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span>プロフィールを編集</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/profile')}
              >
                マイページへ
              </Button>
            </div>
          </div>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarGroupLabel>クイックリンク</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Popular AI Tools Tags */}
        <SidebarGroup>
          <SidebarGroupLabel>人気のAIツール</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 space-y-2">
              {popularTags.map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => window.location.href = `/tags/${tag.slice(1)}`}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  {tag}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}