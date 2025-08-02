import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Youtube, 
  FileText, 
  BrainCircuit, 
  Search,
  FileCode,
  Languages,
  Video,
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  available: boolean;
}

interface SidebarProps {
  onSelectAgent: (agentId: string) => void;
  selectedAgents: string[];
  onLogout: () => void;
}

const agents: Agent[] = [
  {
    id: "youtube-summarizer",
    name: "YouTube Summarizer",
    description: "Extract key insights from any YouTube video",
    icon: Youtube,
    available: true
  },
  {
    id: "pdf-qa",
    name: "Ask from PDF",
    description: "Query any PDF document instantly",
    icon: FileText,
    available: true
  },
  {
    id: "resume-matcher",
    name: "Resume Matcher",
    description: "Match resumes with job descriptions",
    icon: BrainCircuit,
    available: true
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "AI-powered research and analysis",
    icon: Search,
    available: false
  },
  {
    id: "code-explainer",
    name: "Code Explainer",
    description: "Understand complex code instantly",
    icon: FileCode,
    available: false
  },
  {
    id: "translator",
    name: "Document Translator",
    description: "Translate documents across languages",
    icon: Languages,
    available: false
  },
  {
    id: "video-chapters",
    name: "Video Chapter Generator",
    description: "Auto-generate video chapters",
    icon: Video,
    available: false
  }
];

export function Sidebar({ onSelectAgent, selectedAgents, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`relative h-full glass-panel border-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 z-10 rounded-full w-6 h-6 p-0 glass border border-border/30"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>

      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className={`mb-6 ${isCollapsed ? "text-center" : ""}`}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-space font-bold gradient-text">AI Agents</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose your tools</p>
            </motion.div>
          )}
        </div>

        {/* Available Agents */}
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {!isCollapsed && (
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Available Now</h3>
            )}
            
            {agents.filter(agent => agent.available).map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedAgents.includes(agent.id) ? "default" : "ghost"}
                  className={`w-full ${isCollapsed ? "p-2" : "p-4"} h-auto flex ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-3 hover-lift group ${
                    selectedAgents.includes(agent.id) 
                      ? "bg-primary/20 border-primary/30" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => onSelectAgent(agent.id)}
                >
                  <agent.icon className={`${isCollapsed ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`} />
                  {!isCollapsed && (
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{agent.description}</div>
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}

            {!isCollapsed && (
              <>
                <Separator className="my-4" />
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Coming Soon</h3>
              </>
            )}
            
            {agents.filter(agent => !agent.available).map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (agents.filter(a => a.available).length + index) * 0.1 }}
              >
                <Button
                  variant="ghost"
                  disabled
                  className={`w-full ${isCollapsed ? "p-2" : "p-4"} h-auto flex ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } gap-3 opacity-50 cursor-not-allowed`}
                >
                  <agent.icon className={`${isCollapsed ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`} />
                  {!isCollapsed && (
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{agent.description}</div>
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <Button
            variant="outline"
            onClick={onLogout}
            className={`w-full glass border-border/30 hover:bg-destructive/10 hover:border-destructive/30 ${
              isCollapsed ? "p-2" : "p-3"
            }`}
          >
            <LogOut className={`${isCollapsed ? "w-4 h-4" : "w-4 h-4 mr-2"}`} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}