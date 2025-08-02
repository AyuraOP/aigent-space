import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { YoutubeAgent } from "../agents/YoutubeAgent";
import { PDFAgent } from "../agents/PDFAgent";
import { ResumeMatcherAgent } from "../agents/ResumeMatcherAgent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Plus } from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

const agentComponents = {
  "youtube-summarizer": YoutubeAgent,
  "pdf-qa": PDFAgent,
  "resume-matcher": ResumeMatcherAgent,
};

export function Dashboard({ onLogout }: DashboardProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleSelectAgent = (agentId: string) => {
    if (!selectedAgents.includes(agentId)) {
      setSelectedAgents(prev => [...prev, agentId]);
    }
  };

  const handleCloseAgent = (agentId: string) => {
    setSelectedAgents(prev => prev.filter(id => id !== agentId));
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <div className="relative z-10">
        <Sidebar
          onSelectAgent={handleSelectAgent}
          selectedAgents={selectedAgents}
          onLogout={onLogout}
        />
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-space font-bold gradient-text mb-2">
                  AI Agent Workspace
                </h1>
                <p className="text-muted-foreground">
                  Select and interact with AI agents from the sidebar
                </p>
              </div>
              
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Agent Panels */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {selectedAgents.map((agentId) => {
                const AgentComponent = agentComponents[agentId as keyof typeof agentComponents];
                return AgentComponent ? (
                  <motion.div
                    key={agentId}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AgentComponent onClose={() => handleCloseAgent(agentId)} />
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
          </div>

          {/* Welcome State */}
          {selectedAgents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="glass-panel border-0 max-w-2xl mx-auto">
                <CardContent className="p-12">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
                  >
                    <Sparkles className="w-12 h-12 text-primary-foreground" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-space font-bold gradient-text mb-4">
                    Welcome to Your AI Workspace
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Get started by selecting an AI agent from the sidebar. Each agent is specialized 
                    for different tasks - from analyzing YouTube videos to matching resumes with job descriptions.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 rounded-xl glass border border-border/30"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 text-primary">
                        📹
                      </div>
                      <h3 className="font-semibold mb-1">YouTube Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Extract key points from any video
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-4 rounded-xl glass border border-border/30"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 text-accent">
                        📄
                      </div>
                      <h3 className="font-semibold mb-1">Document Q&A</h3>
                      <p className="text-sm text-muted-foreground">
                        Ask questions about any PDF
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="p-4 rounded-xl glass border border-border/30"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 text-success">
                        🎯
                      </div>
                      <h3 className="font-semibold mb-1">Resume Matching</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze job compatibility
                      </p>
                    </motion.div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    <Plus className="w-4 h-4 inline mr-1" />
                    More agents coming soon!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}