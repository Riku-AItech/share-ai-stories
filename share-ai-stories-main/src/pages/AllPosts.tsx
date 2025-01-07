import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// 仮のデータ（後でAPIから取得するように変更可能）
const SAMPLE_POSTS = [
  {
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
  // さらに投稿を追加
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
  }
];

const AllPosts = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          みんなの投稿一覧
        </h1>
        <ScrollArea className="h-[800px] rounded-md">
          <div className="grid gap-6 pb-8">
            {SAMPLE_POSTS.map((post, index) => (
              <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default AllPosts;