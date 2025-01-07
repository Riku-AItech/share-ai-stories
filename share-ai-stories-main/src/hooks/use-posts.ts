import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  title: string;
  summary: string;
  ai_tools: string;
  purpose?: string;
  method?: string;
  results?: string;
  tags?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface CreatePostInput {
  title: string;
  summary: string;
  ai_tools: string;
  purpose?: string;
  method?: string;
  results?: string;
  tags?: string;
}

export function usePosts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 投稿一覧の取得
  const useAllPosts = () => {
    return useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Post[];
      },
    });
  };

  // ユーザーの投稿一覧の取得
  const useUserPosts = (userId: string) => {
    return useQuery({
      queryKey: ['user-posts', userId],
      queryFn: async () => {
        const numericUserId = parseInt(userId, 10);
        if (isNaN(numericUserId)) {
          throw new Error('Invalid user ID');
        }

        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            likes (count),
            comments (count)
          `)
          .eq('user_id', numericUserId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(post => ({
          ...post,
          likesCount: post.likes?.[0]?.count || 0,
          commentsCount: post.comments?.[0]?.count || 0
        }));
      },
      enabled: !!userId,
    });
  };

  // 投稿詳細の取得
  const usePost = (postId: string) => {
    return useQuery({
      queryKey: ['posts', postId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) throw error;
        return data as Post;
      },
    });
  };

  // 新規投稿の作成
  const createPost = useMutation({
    mutationFn: async (input: CreatePostInput) => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        throw new Error('Invalid user ID format');
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...input,
          user_id: numericUserId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: '投稿を作成しました',
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Post creation error:', error);
      toast({
        title: '投稿の作成に失敗しました',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  // 投稿の更新
  const updatePost = useMutation({
    mutationFn: async ({ postId, input }: { postId: string; input: Partial<CreatePostInput> }) => {
      const { data, error } = await supabase
        .from('posts')
        .update(input)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] });
      toast({
        title: '投稿を更新しました',
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Post update error:', error);
      toast({
        title: '投稿の更新に失敗しました',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  // 投稿の削除
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: '投稿を削除しました',
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Post deletion error:', error);
      toast({
        title: '投稿の削除に失敗しました',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });

  return {
    useAllPosts,
    useUserPosts,
    usePost,
    createPost,
    updatePost,
    deletePost,
  };
}