
export type ToolCategory = 
  | 'AD_COPY' 
  | 'CLIENT_MANAGEMENT' 
  | 'COPY_IMPROVEMENT' 
  | 'EMAIL_COPY' 
  | 'LONG_FORM' 
  | 'OTHER_FLOWS' 
  | 'PODCAST_TOOLS' 
  | 'SALES_FUNNEL_COPY';

export interface Tool {
  id: string;
  title: string;
  category: ToolCategory;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  tags: ToolCategory[];
}

export type View = 
  | 'dashboard-view' 
  | 'tool-interface-view' 
  | 'all-tools-view'
  | 'all-projects-view' 
  | 'history-view' 
  | 'client-management-view' 
  | 'copy-improvement-view' 
  | 'ad-copy-view' 
  | 'email-copy-view' 
  | 'long-form-view' 
  | 'podcast-tools-view' 
  | 'sales-funnel-copy-view' 
  | 'other-flows-view';

export interface ToolQuestion {
    label: string;
    type: 'input' | 'textarea';
    placeholder: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
  file?: {
    name: string;
    size: number;
  };
}

export interface ChatHistoryItem {
  id: string;
  toolId: string;
  toolTitle: string;
  messages: Message[];
  timestamp: number;
  projectId?: string;
}

export interface ToolScript {
  initialMessage: string;
  questions: string[];
  finalResponseGenerator: (toolTitle: string, answers: string[]) => string;
}