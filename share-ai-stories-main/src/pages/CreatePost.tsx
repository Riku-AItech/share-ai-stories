import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { CreatePostForm } from "@/components/create-post/CreatePostForm";

export default function CreatePost() {
  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">新規投稿作成</h1>
        <CreatePostForm />
      </div>
    </AuthenticatedLayout>
  );
}