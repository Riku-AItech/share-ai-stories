import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Image, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().min(1, "概要を入力してください"),
  aiTool: z.string().min(1, "AIツール名を入力してください"),
  tags: z.string().min(1, "タグを入力してください"),
  content: z.string().min(1, "本文を入力してください"),
});

// This would come from your API/database in a real application
const MOCK_POST = {
  id: "1",
  title: "ChatGPTを使った自動文章要約ツール",
  description: "長文を自動的に要約するツールを開発しました。",
  aiTool: "ChatGPT",
  tags: "自動要約,文章生成,API活用",
  content: "## 概要\nChatGPTのAPIを使用して、長文を自動的に要約するツールを開発しました。\n\n## 使用したAIツール\n- ChatGPT (GPT-4)\n- OpenAI API",
};

export default function EditPost() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: MOCK_POST.title,
      description: MOCK_POST.description,
      aiTool: MOCK_POST.aiTool,
      tags: MOCK_POST.tags,
      content: MOCK_POST.content,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updated values:", values);
    console.log("Selected image:", selectedImage);
    toast({
      title: "投稿を更新しました",
      description: "投稿の更新に成功しました。",
    });
    navigate(`/posts/${MOCK_POST.id}`);
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">投稿を編集</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/posts/${MOCK_POST.id}`)}
          >
            キャンセル
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="投稿のタイトルを入力" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>概要・説明</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="投稿の概要を入力" 
                      className="h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiTool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AIツール名</FormLabel>
                  <FormControl>
                    <Input placeholder="使用したAIツールの名前" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タグ（カンマ区切りで複数入力可能）</FormLabel>
                  <FormControl>
                    <Input placeholder="例: ChatGPT, 画像生成, 効率化" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>本文</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="投稿の本文を入力" 
                      className="h-48"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>画像</FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="w-full"
                >
                  <Image className="mr-2 h-4 w-4" />
                  画像をアップロード
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {imagePreview && (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
            >
              更新する
            </Button>
          </form>
        </Form>
      </div>
    </AuthenticatedLayout>
  );
}