import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, MessageSquare, Share2, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface PostActionsProps {
  isAuthenticated: boolean;
  likesCount: number;
  commentsCount: number;
  isAuthor?: boolean;
  postId: string;
}

export function PostActions({ 
  isAuthenticated, 
  likesCount, 
  commentsCount, 
  isAuthor,
  postId 
}: PostActionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isAuthenticated) {
      handleAuthRequired();
      return;
    }
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "いいねを取り消しました" : "いいねしました",
      duration: 2000,
    });
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: "コメントを投稿しました",
      duration: 2000,
    });
    setComment("");
  };

  const handleAuthRequired = () => {
    toast({
      title: "ログインが必要です",
      description: "この機能を使用するにはログインしてください",
      duration: 3000,
    });
    navigate("/login");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "URLをコピーしました",
      duration: 2000,
    });
  };

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDelete = () => {
    toast({
      title: "投稿を削除しました",
      duration: 2000,
    });
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 py-4">
        <Button
          variant={isLiked ? "default" : "ghost"}
          className={`gap-2 ${isLiked ? "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90" : ""}`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-5 w-5" />
          {likesCount + (isLiked ? 1 : 0)}
        </Button>
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => {
            if (!isAuthenticated) handleAuthRequired();
          }}
        >
          <MessageSquare className="h-5 w-5" />
          {commentsCount}
        </Button>
        <Button variant="ghost" className="gap-2" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
          共有
        </Button>
        {isAuthor && (
          <>
            <Button variant="ghost" className="gap-2" onClick={handleEdit}>
              <Edit className="h-5 w-5" />
              編集
            </Button>
            <Button variant="ghost" className="gap-2 text-red-500 hover:text-red-600" onClick={handleDelete}>
              <Trash2 className="h-5 w-5" />
              削除
            </Button>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="space-y-4">
          <Textarea
            placeholder="コメントを入力..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleComment}
            className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
            disabled={!comment.trim()}
          >
            コメントを投稿
          </Button>
        </div>
      )}
    </div>
  );
}