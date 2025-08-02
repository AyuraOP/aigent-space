import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Upload, Send, Loader2, File, MessageSquare } from "lucide-react";
import { AgentPanel } from "./AgentPanel";

interface PDFAgentProps {
  onClose: () => void;
}

export function PDFAgent({ onClose }: PDFAgentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    content: string;
  }>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !query) return;

    const userMessage = { type: 'user' as const, content: query };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuery("");

    // Simulate API call
    setTimeout(() => {
      const assistantMessage = {
        type: 'assistant' as const,
        content: `Based on the PDF "${file.name}", here's what I found regarding your question: "${userMessage.content}"\n\nThe document discusses this topic in detail on pages 3-5. Here are the key points:\n\n• The main concept is explained with practical examples\n• There are several implementation strategies mentioned\n• The author provides best practices for optimal results\n\nWould you like me to elaborate on any specific aspect or search for additional information in the document?`
      };
      setConversation(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AgentPanel
      agentId="pdf-qa"
      title="Ask from PDF"
      description="Query any PDF document instantly"
      icon={FileText}
      onClose={onClose}
    >
      <div className="space-y-8">
        {/* Input Section - Centered */}
        <div className="flex flex-col items-center space-y-6">
          {/* File Upload */}
          <div className="w-full max-w-2xl space-y-2">
            <Label htmlFor="pdf-upload" className="text-foreground text-center block">Upload PDF Document</Label>
            <div className="relative">
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="glass border-border/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
              />
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <File className="w-4 h-4" />
                  <span>{file.name}</span>
                  <span className="text-xs">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Agent Description */}
          <Card className="glass border-border/30 max-w-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-3 gradient-text">How it works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>📄 <strong>What it does:</strong> Upload any PDF document and ask questions about its content. Get instant, accurate answers based on the document.</p>
                <p>📎 <strong>Input required:</strong> A PDF file (any size) + your questions about the content.</p>
                <p>💬 <strong>Output:</strong> Conversational Q&A interface with detailed answers, page references, and contextual information.</p>
                <p>🎯 <strong>Perfect for:</strong> Research papers, contracts, manuals, reports, books, and any document analysis.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation */}
        {conversation.length > 0 && (
          <div className="space-y-4">
            <Separator />
            <div className="max-h-64 overflow-y-auto space-y-3">
              {conversation.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card className={`max-w-[80%] glass border-border/30 ${
                    message.type === 'user' 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-accent/10 border-accent/20'
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        {message.type === 'assistant' && (
                          <MessageSquare className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing document...</span>
          </motion.div>
        )}

        {/* Query Input - Centered */}
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query" className="text-foreground text-center block">Ask a Question</Label>
              <div className="flex gap-2">
                <Textarea
                  id="query"
                  placeholder="What would you like to know about this document?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="glass border-border/30 focus:ring-accent resize-none"
                  rows={2}
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !file || !query}
                  className="bg-gradient-accent hover:shadow-accent px-6 self-end"
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
        </div>

        {!file && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              Upload a PDF document to start asking questions
            </p>
          </motion.div>
        )}
      </div>
    </AgentPanel>
  );
}