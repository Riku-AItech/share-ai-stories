import { PostHeader } from "@/components/post-detail/PostHeader";
import { PostContent } from "@/components/post-detail/PostContent";
import { PostActions } from "@/components/post-detail/PostActions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";

// This would come from your API/database
const MOCK_POST = {
  id: "1",
  title: "ChatGPTを使った自動文章要約ツール",
  content: `
    ## 概要
    ChatGPTのAPIを使用して、長文を自動的に要約するツールを開発しました。

    ## 使用したAIツール
    - ChatGPT (GPT-4)
    - OpenAI API

    ## 工夫した点
    1. プロンプトエンジニアリングの最適化
    2. 要約の品質向上のための前処理
    3. ユーザーフィードバックの反映

    ## 結果
    従来の要約ツールと比較して、より自然で正確な要約が可能になりました。
  `,
  author: {
    id: "123",
    name: "AI太郎",
    avatar: "/placeholder.svg"
  },
  aiTool: "ChatGPT",
  tags: ["自動要約", "文章生成", "API活用"],
  createdAt: new Date("2024-02-20"),
  likes: 42,
  comments: []
};

export default function Post1() {
  const navigate = useNavigate();
  const isAuthenticated = true; // Always true for authenticated version
  const currentUserId = "123"; // This would come from your auth system

  const handleBack = () => {
    navigate('/authenticated/home');
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        
        <article className="glass-card rounded-lg p-6 space-y-6 fade-in">
          <PostHeader
            title={MOCK_POST.title}
            author={MOCK_POST.author}
            aiTool={MOCK_POST.aiTool}
            tags={MOCK_POST.tags}
            createdAt={MOCK_POST.createdAt}
          />
          
          <PostContent content={MOCK_POST.content} />
          
          <PostActions
            isAuthenticated={isAuthenticated}
            likesCount={MOCK_POST.likes}
            commentsCount={MOCK_POST.comments.length}
            isAuthor={currentUserId === MOCK_POST.author.id}
            postId={MOCK_POST.id}
          />
        </article>
      </div>
    </AuthenticatedLayout>
  );
}