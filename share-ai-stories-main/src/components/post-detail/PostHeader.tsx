import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dog } from "lucide-react";
import { format } from "date-fns";

interface PostHeaderProps {
  title: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  aiTool: string;
  tags: string[];
  createdAt: Date;
}

export function PostHeader({ title, author, aiTool, tags, createdAt }: PostHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold gradient-text">{title}</h1>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>
            <Dog className="h-6 w-6 text-[#FF6B6B]" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author.name}</p>
          <p className="text-sm text-muted-foreground">
            {format(createdAt, 'yyyy年MM月dd日')}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-[#FF6B6B]/10 text-[#FF6B6B]">
          {aiTool}
        </Badge>
        {tags.map((tag) => (
          <Badge 
            key={tag}
            variant="secondary"
            className="bg-[#FF6B6B]/10 text-[#FF6B6B]"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}