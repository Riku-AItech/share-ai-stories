import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { usePosts } from "@/hooks/use-posts";
import { FormFields } from "./FormFields";
import { ImageUpload } from "./ImageUpload";

const formSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  summary: z.string().min(1, "概要を入力してください"),
  ai_tools: z.string().min(1, "AIツール名を入力してください"),
  tags: z.string().min(1, "タグを入力してください"),
  purpose: z.string().optional(),
  method: z.string().optional(),
  results: z.string().optional(),
});

export type CreatePostFormValues = z.infer<typeof formSchema>;

export function CreatePostForm() {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      ai_tools: "",
      tags: "",
      purpose: "",
      method: "",
      results: "",
    },
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    try {
      // Ensure all required fields are present
      const postData = {
        title: values.title,
        summary: values.summary,
        ai_tools: values.ai_tools,
        tags: values.tags,
        purpose: values.purpose || "",
        method: values.method || "",
        results: values.results || "",
      };
      
      await createPost.mutateAsync(postData);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields control={form.control} />
        <ImageUpload />
        <Button 
          type="submit" 
          className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? '投稿中...' : '投稿する'}
        </Button>
      </form>
    </Form>
  );
}