export type HaatzaSection = 'shopping' | 'lite' | 'nest';

export interface HaatzaSectionMeta {
  id: HaatzaSection;
  name: string;
  shortName: string;
  tagline: string;
  primaryColor: string;
  accentBg: string;
  accentText: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sectionContext?: HaatzaSection;
  isError?: boolean;
}

export interface ChatRequestPayload {
  message: string;
  section: HaatzaSection;
  route: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface ChatResponsePayload {
  reply: string;
  suggestions?: string[];
  section?: HaatzaSection;
  timestamp?: number;
}

export interface AIAssistantState {
  isOpen: boolean;
  isMinimized: boolean;
  showWelcomeTooltip: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  isDemoMode: boolean;
}
