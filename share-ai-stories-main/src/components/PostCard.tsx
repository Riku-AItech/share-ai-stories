import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Dog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  id?: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  tags: string[];
  showEditControls?: boolean;
  isAuthenticated?: boolean;
}

export function PostCard({ 
  id = "1", 
  title, 
  author, 
  likes, 
  comments, 
  tags, 
  showEditControls,
  isAuthenticated = false
}: PostCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      navigate(`/authenticated/posts/${id}`);
    } else {
      navigate(`/posts/${id}`);
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 glass-card hover:scale-[1.02] japanese-pattern">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 border-2 border-[#FF6B6B]/20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>
              <Dog className="h-5 w-5 text-[#FF6B6B] animate-pulse" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[#4A5568]">{author.name}</span>
        </div>
        <h2 className="text-xl font-bold mb-4 line-clamp-2 gradient-text">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="rounded-full bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 transition-colors text-[#FF6B6B]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-[#FF6B6B]/10 pt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">👍</span>
            <span className="text-sm text-muted-foreground">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{comments}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm hover:bg-[#FF6B6B]/10 text-[#FF6B6B]"
          onClick={handleViewDetails}
        >
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
}