import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Youtube, Send, Loader2, Clock, Eye, ThumbsUp } from "lucide-react";
import { AgentPanel } from "./AgentPanel";

interface YoutubeAgentProps {
  onClose: () => void;
}

export function YoutubeAgent({ onClose }: YoutubeAgentProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        title: "How to Build AI Applications with React",
        duration: "12:34",
        views: "45.2K",
        likes: "1.2K",
        summary: {
          keyPoints: [
            "Introduction to modern AI development frameworks",
            "Setting up React with AI libraries",
            "Building your first AI-powered component",
            "Best practices for production deployment"
          ],
          mainTopics: [
            "React Integration",
            "AI Libraries",
            "Component Architecture",
            "Production Tips"
          ],
          conclusion: "This video provides a comprehensive guide to integrating AI capabilities into React applications, covering everything from setup to deployment."
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AgentPanel
      agentId="youtube-summarizer"
      title="YouTube Video Summarizer"
      description="Extract key insights from any YouTube video"
      icon={Youtube}
      onClose={onClose}
    >
      <div className="space-y-8">
        {/* Input Section - Centered */}
        <div className="flex flex-col items-center space-y-6">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url" className="text-foreground text-center block">YouTube URL</Label>
              <div className="flex gap-2">
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="glass border-border/30 focus:ring-accent text-center"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !url}
                  className="bg-gradient-accent hover:shadow-accent px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
          
          {/* Agent Description */}
          <Card className="glass border-border/30 max-w-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-3 gradient-text">How it works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>🎯 <strong>What it does:</strong> Analyzes any YouTube video and extracts key insights, main topics, and provides a comprehensive summary.</p>
                <p>📝 <strong>Input required:</strong> Simply paste a valid YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)</p>
                <p>⚡ <strong>Output:</strong> Video metadata, key points, main topics, and an AI-generated summary of the content.</p>
                <p>💡 <strong>Perfect for:</strong> Research, learning, content analysis, and quickly understanding video content without watching.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center py-8"
          >
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-accent" />
              <p className="text-muted-foreground">Analyzing video content...</p>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Separator />
            
            {/* Video Info */}
            <Card className="glass border-border/30">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3">{result.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {result.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {result.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {result.likes}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Key Points</h4>
              <ul className="space-y-2">
                {result.summary.keyPoints.map((point: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              <h4 className="font-semibold text-foreground pt-4">Main Topics</h4>
              <div className="flex flex-wrap gap-2">
                {result.summary.mainTopics.map((topic: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-medium"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>

              <h4 className="font-semibold text-foreground pt-4">Summary</h4>
              <Card className="glass border-border/30">
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed">{result.summary.conclusion}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </AgentPanel>
  );
}