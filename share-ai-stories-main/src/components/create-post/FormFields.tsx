import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { CreatePostFormValues } from "./CreatePostForm";

interface FormFieldsProps {
  control: Control<CreatePostFormValues>;
}

export function FormFields({ control }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
        name="summary"
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
        control={control}
        name="ai_tools"
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
        control={control}
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
        control={control}
        name="purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>目的</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="AIツールを使用した目的" 
                className="h-24"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>方法</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="AIツールの使用方法" 
                className="h-24"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="results"
        render={({ field }) => (
          <FormItem>
            <FormLabel>結果</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="得られた結果や効果" 
                className="h-24"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}