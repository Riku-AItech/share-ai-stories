import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Users, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_POSTS = [
  {
    id: "1",
    title: "ChatGPTを使った自動文章要約ツール",
    author: {
      name: "AI太郎",
      avatar: "/placeholder.svg"
    },
    likes: 42,
    comments: 5,
    tags: ["ChatGPT", "NLP"]
  },
  {
    title: "画像生成AIで製品デザインの効率化",
    author: {
      name: "デザイン花子",
      avatar: "/placeholder.svg"
    },
    likes: 38,
    comments: 7,
    tags: ["Midjourney", "製品デザイン"]
  },
  {
    title: "音声認識AIを活用したリアルタイム議事録作成",
    author: {
      name: "効率化次郎",
      avatar: "/placeholder.svg"
    },
    likes: 56,
    comments: 12,
    tags: ["音声認識", "Whisper"]
  },
  {
    title: "AIを活用した顧客サポートの自動化",
    author: {
      name: "サポート太郎",
      avatar: "/placeholder.svg"
    },
    likes: 45,
    comments: 8,
    tags: ["カスタマーサポート", "AI"]
  },
  {
    title: "機械学習モデルを使った売上予測",
    author: {
      name: "分析花子",
      avatar: "/placeholder.svg"
    },
    likes: 62,
    comments: 15,
    tags: ["機械学習", "予測分析"]
  },
  {
    title: "自然言語処理による感情分析システム",
    author: {
      name: "NLP次郎",
      avatar: "/placeholder.svg"
    },
    likes: 33,
    comments: 9,
    tags: ["NLP", "感情分析"]
  }
];

const POSTS_PER_PAGE = 3;

const Index = () => {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, ALL_POSTS.length));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          AI活用事例を共有して、学びを深めよう
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          AIXは、最新のAI技術の活用事例を共有し、ユーザー同士で学び合えるプラットフォームです。
        </p>
        <Button 
          size="lg"
          className="bg-white text-[#FF6B6B] hover:bg-white/90"
          onClick={() => navigate('/login')}
        >
          ログインしてスタート
        </Button>
      </section>

      {/* Recent Posts Section */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            みんなの投稿
          </h2>
          {visiblePosts < ALL_POSTS.length && (
            <Button 
              variant="link" 
              className="text-white"
              onClick={handleLoadMore}
            >
              もっと見る <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_POSTS.slice(0, visiblePosts).map((post, index) => (
            <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          AIXの特徴
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-lg text-center">
            <div className="bg-[#FF6B6B]/10 p-3 rounded-full w-fit mx-auto mb-4">
              <Share2 className="h-6 w-6 text-[#FF6B6B]" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI活用事例を投稿する</h3>
            <p className="text-gray-600">
              あなたのAI活用経験を共有して、みんなで知見を深めましょう
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center">
            <div className="bg-[#FF6B6B]/10 p-3 rounded-full w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-[#FF6B6B]" />
            </div>
            <h3 className="text-xl font-bold mb-2">いいねやコメントで交流</h3>
            <p className="text-gray-600">
              投稿にいいねやコメントをして、ユーザー同士で交流を深めましょう
            </p>
          </div>
          <div className="glass-card p-6 rounded-lg text-center">
            <div className="bg-[#FF6B6B]/10 p-3 rounded-full w-fit mx-auto mb-4">
              <Lightbulb className="h-6 w-6 text-[#FF6B6B]" />
            </div>
            <h3 className="text-xl font-bold mb-2">新しい知見を得る</h3>
            <p className="text-gray-600">
              他のユーザーの活用事例から、新しいアイデアやヒントを得られます
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;