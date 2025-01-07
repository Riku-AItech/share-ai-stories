import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ALL_SAMPLE_POSTS = [
  {
    title: "ChatGPTを使った自動文章要約ツール",
    author: {
      name: "AI太郎",
      avatar: "/placeholder.svg"
    },
    likes: 42,
    comments: 5,
    tags: ["ChatGPT", "NLP", "文章要約"]
  },
  {
    title: "Midjourney V6で製品デザインの効率化に成功",
    author: {
      name: "デザイン花子",
      avatar: "/placeholder.svg"
    },
    likes: 38,
    comments: 7,
    tags: ["Midjourney", "製品デザイン", "AI画像生成"]
  },
  {
    title: "WhisperとDeepLで海外動画の自動文字起こし＆翻訳を実現",
    author: {
      name: "効率化次郎",
      avatar: "/placeholder.svg"
    },
    likes: 56,
    comments: 12,
    tags: ["Whisper", "DeepL", "動画翻訳"]
  },
  {
    title: "AIを活用した新しい教育方法の提案",
    author: {
      name: "教育子",
      avatar: "/placeholder.svg"
    },
    likes: 45,
    comments: 8,
    tags: ["AI", "教育", "EdTech"]
  },
  {
    title: "自然言語処理による感情分析システムの構築",
    author: {
      name: "分析郎",
      avatar: "/placeholder.svg"
    },
    likes: 33,
    comments: 6,
    tags: ["NLP", "感情分析", "機械学習"]
  },
  {
    title: "AIアートを活用したブランディングの成功事例",
    author: {
      name: "クリエイト子",
      avatar: "/placeholder.svg"
    },
    likes: 62,
    comments: 15,
    tags: ["AIアート", "ブランディング", "デザイン"]
  }
];

const NOTIFICATIONS = [
  "あなたの投稿「ChatGPTを使った自動文章要約ツール」に3件のいいねがありました",
  "「Midjourney V6で製品デザインの効率化に成功」に新しいコメントがあります",
  "本日のAI活用のTIPSが投稿されました！"
];

export default function AuthenticatedHome() {
  return (
    <AuthenticatedLayout>
      {/* Notifications Section */}
      <section className="mb-8">
        <div className="bg-card rounded-lg p-4 space-y-2">
          <h2 className="text-lg font-semibold mb-3">最新の通知</h2>
          {NOTIFICATIONS.map((notification, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 text-sm p-2 hover:bg-accent rounded-md cursor-pointer"
            >
              <div className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
              {notification}
            </div>
          ))}
        </div>
      </section>

      {/* Latest AI Use Cases Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最新のAI活用事例</h2>
        </div>
        <div className="relative max-w-[80%] mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {ALL_SAMPLE_POSTS.map((post, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <PostCard {...post} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-16" />
            <CarouselNext className="-right-16" />
          </Carousel>
        </div>
      </section>

      {/* Featured AI Use Cases Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">注目のAI活用事例</h2>
          <Button variant="link">
            もっと見る <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="relative max-w-[80%] mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {ALL_SAMPLE_POSTS.slice(0, 4).map((post, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <PostCard {...post} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-16" />
            <CarouselNext className="-right-16" />
          </Carousel>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
