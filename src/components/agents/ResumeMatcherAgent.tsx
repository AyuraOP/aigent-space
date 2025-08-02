import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, Upload, Zap, Loader2, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { AgentPanel } from "./AgentPanel";

interface ResumeMatcherAgentProps {
  onClose: () => void;
}

export function ResumeMatcherAgent({ onClose }: ResumeMatcherAgentProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        overallMatch: 78,
        strengths: [
          "Strong experience in React and JavaScript",
          "5+ years of frontend development",
          "Experience with TypeScript and modern frameworks",
          "Previous work with AI/ML projects"
        ],
        gaps: [
          "Missing experience with Python for backend development",
          "No mention of Docker or containerization",
          "Limited experience with cloud platforms (AWS/Azure)"
        ],
        recommendations: [
          "Highlight your React expertise more prominently",
          "Consider adding any Python projects or learning experience",
          "Mention any cloud platform exposure, even if limited",
          "Emphasize your problem-solving and analytical skills"
        ],
        keywordMatch: {
          matched: 15,
          total: 20,
          keywords: ["React", "JavaScript", "TypeScript", "Frontend", "Agile"]
        },
        sections: {
          experience: 85,
          skills: 75,
          education: 70
        }
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <AgentPanel
      agentId="resume-matcher"
      title="Resume Matcher"
      description="Match resumes with job descriptions"
      icon={BrainCircuit}
      onClose={onClose}
    >
      <div className="space-y-8">
        {/* Input Section - Centered */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-2xl space-y-6">
            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume-upload" className="text-foreground text-center block">Upload Resume</Label>
              <div className="relative">
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="glass border-border/30 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/30 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {resumeFile ? resumeFile.name : "Click to upload resume"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-foreground text-center block">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="glass border-border/30 focus:ring-accent min-h-[160px] resize-none"
                required
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !resumeFile || !jobDescription}
              className="w-full bg-gradient-primary hover:shadow-glow py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>
          
          {/* Agent Description */}
          <Card className="glass border-border/30 max-w-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-3 gradient-text">How it works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>🎯 <strong>What it does:</strong> Analyzes your resume against a job description and provides detailed compatibility insights with actionable recommendations.</p>
                <p>📎 <strong>Input required:</strong> Your resume file (PDF, DOC, DOCX) + the target job description text.</p>
                <p>📊 <strong>Output:</strong> Match percentage, section breakdown, keyword analysis, strengths, improvement areas, and specific recommendations.</p>
                <p>💼 <strong>Perfect for:</strong> Job applications, career planning, resume optimization, and interview preparation.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center py-4">
              <div className="text-center space-y-2">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Processing resume and job description...</p>
              </div>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Separator />
            
            {/* Overall Match Score */}
            <Card className="glass border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Overall Match Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{result.overallMatch}%</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.overallMatch >= 70 ? 'bg-success/20 text-success' :
                      result.overallMatch >= 50 ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {result.overallMatch >= 70 ? 'Strong Match' :
                       result.overallMatch >= 50 ? 'Good Match' :
                       'Needs Improvement'}
                    </span>
                  </div>
                  <Progress value={result.overallMatch} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Section Breakdown */}
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(result.sections).map(([section, score]) => (
                <Card key={section} className="glass border-border/30">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium capitalize">{section}</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={Number(score)} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{Number(score)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Keyword Analysis */}
            <Card className="glass border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Keyword Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span>Keywords Found</span>
                  <span className="font-medium">
                    {result.keywordMatch.matched}/{result.keywordMatch.total}
                  </span>
                </div>
                <Progress 
                  value={(result.keywordMatch.matched / result.keywordMatch.total) * 100} 
                  className="mb-3 h-2" 
                />
                <div className="flex flex-wrap gap-2">
                  {result.keywordMatch.keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="glass border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card className="glass border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.gaps.map((gap: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <span>{gap}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="glass border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Zap className="w-5 h-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </AgentPanel>
  );
}