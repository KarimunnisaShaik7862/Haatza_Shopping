import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Send, AlertCircle } from 'lucide-react';
import { HaatzaAILogo } from './HaatzaAILogo';
import { ChatMessage, HaatzaSection, ChatRequestPayload } from '../../types/ai';
import { sendChatMessage } from '../../services/haatzaAIService';

export function getSectionFromPath(pathname: string): HaatzaSection {
  const path = pathname.toLowerCase();
  if (
    path.startsWith('/nest') ||
    path.startsWith('/next') ||
    path.startsWith('/services') ||
    path.startsWith('/bookings')
  ) {
    return 'nest';
  }
  if (
    path.startsWith('/lite') ||
    path.startsWith('/light') ||
    path.startsWith('/categories')
  ) {
    return 'lite';
  }
  return 'shopping';
}

export interface SectionColorTheme {
  primary: string;
  hover: string;
  sparkle: string;
  glow: string;
  focusRing: string;
}

export const SECTION_COLOR_THEMES: Record<HaatzaSection, SectionColorTheme> = {
  // 1. Haatza Shopping: Blue with White
  shopping: {
    primary: '#2962FF',
    hover: '#1E50D8',
    sparkle: '#FFFFFF',
    glow: '0 0 22px rgba(41, 98, 255, 0.55)',
    focusRing: 'focus-within:ring-[#2962FF]/30 focus-within:border-[#2962FF]',
  },
  // 2. Haatza Lite: Green and White
  lite: {
    primary: '#00C451',
    hover: '#00AC47',
    sparkle: '#FFFFFF',
    glow: '0 0 22px rgba(0, 200, 83, 0.55)',
    focusRing: 'focus-within:ring-[#00C451]/30 focus-within:border-[#00C451]',
  },
  // 3. Haatza Nest: Purple and White
  nest: {
    primary: '#7C3AED',
    hover: '#6D28D9',
    sparkle: '#FFFFFF',
    glow: '0 0 22px rgba(124, 58, 237, 0.55)',
    focusRing: 'focus-within:ring-[#7C3AED]/30 focus-within:border-[#7C3AED]',
  },
};

const STARTER_PROMPTS = [
  'Explore Haatza Nest',
  'Explore Haatza Lite',
  'Explore Haatza Shopping',
];

const WELCOME_TEXT = "Hi! I'm Haatza AI. How can I help you today?";

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'assistant',
  content: WELCOME_TEXT,
  timestamp: Date.now(),
  sectionContext: 'shopping',
};

export const HaatzaAIAssistant: React.FC = () => {
  const location = useLocation();
  const currentSection = getSectionFromPath(location.pathname);
  const theme = SECTION_COLOR_THEMES[currentSection];

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Show welcome tooltip once per session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('haatza_ai_tooltip_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowTooltip(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage access safety
    }
  }, []);

  const handleDismissTooltip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowTooltip(false);
    try {
      sessionStorage.setItem('haatza_ai_tooltip_dismissed', 'true');
    } catch {
      // Storage access safety
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    handleDismissTooltip();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading, isOpen]);

  // Prevent background scroll on mobile when chat is open
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      sectionContext: currentSection,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const payload: ChatRequestPayload = {
      message: text,
      section: currentSection,
      route: location.pathname,
      conversationHistory: messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
    };

    try {
      const response = await sendChatMessage(payload);

      startTransition(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.reply,
          timestamp: response.timestamp || Date.now(),
          sectionContext: response.section || currentSection,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to connect. Please try again.';
      setErrorNotice(errorMsg);
      setIsLoading(false);

      const errorFallbackMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: errorMsg,
        timestamp: Date.now(),
        sectionContext: currentSection,
        isError: true,
      };

      setMessages((prev) => [...prev, errorFallbackMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Escape') {
      handleCloseChat();
    }
  };

  const formatMessageText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-semibold text-zinc-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
      const isNumbered = /^\d+\.\s/.test(line.trim());

      return (
        <span
          key={lineIdx}
          className={`block ${
            isBullet || isNumbered ? 'pl-2 my-0.5 text-zinc-800' : line === '' ? 'h-2' : ''
          }`}
        >
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <aside
      aria-label="Haatza AI Assistant"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
    >
      {/* =========================================================================
          1. WELCOME TOOLTIP
          ========================================================================= */}
      {showTooltip && !isOpen && (
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-auto fixed right-4 sm:right-6 max-w-[290px] bg-white text-zinc-900 border border-zinc-200/90 rounded-2xl p-3 shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${
            currentSection === 'shopping' ? 'bottom-32 sm:bottom-22' : 'bottom-20 sm:bottom-22'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs transition-colors duration-300"
              style={{ backgroundColor: theme.primary }}
            >
              <HaatzaAILogo size={16} color="#FFFFFF" sparkleColor={theme.sparkle} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-800 leading-snug">
                Hi! 👋 Welcome to Haatza. I'm your AI assistant. How can I help you today?
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenChat}
                  className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-md transition-all duration-300 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: theme.primary }}
                >
                  Chat with AI
                </button>
                <button
                  type="button"
                  onClick={handleDismissTooltip}
                  className="text-[11px] font-medium text-zinc-500 hover:text-zinc-800 px-1 py-1"
                >
                  Dismiss
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismissTooltip}
              aria-label="Dismiss greeting tooltip"
              className="text-zinc-400 hover:text-zinc-700 p-0.5 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-zinc-200 rotate-45" />
        </div>
      )}

      {/* Mobile Backdrop Overlay (Tap to Dismiss) */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={handleCloseChat}
          className="pointer-events-auto fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[124] sm:hidden animate-in fade-in duration-200"
        />
      )}

      {/* =========================================================================
          2. FLOATING LAUNCHER (Dynamic section-based color: Shopping=Blue, Lite=Green, Nest=Purple)
          ========================================================================= */}
      <div
        className={`pointer-events-auto fixed z-[121] transition-all duration-300 ${
          isOpen
            ? 'hidden sm:flex sm:bottom-6 sm:right-6'
            : currentSection === 'shopping'
            ? 'bottom-18 sm:bottom-6 right-4 sm:right-6'
            : 'bottom-5 sm:bottom-6 right-4 sm:right-6'
        }`}
      >
        <button
          type="button"
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? 'Close Haatza AI chat' : 'Open Haatza AI assistant'}
          className={`flex items-center justify-center w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
            currentSection === 'lite' && !isOpen
              ? 'shadow-[0_0_24px_rgba(0,200,83,0.65),0_0_45px_rgba(0,230,118,0.35)] animate-pulse'
              : ''
          }`}
          style={{
            backgroundColor: theme.primary,
            boxShadow:
              currentSection === 'lite' && !isOpen
                ? '0 0 24px rgba(0, 196, 81, 0.65), 0 0 45px rgba(0, 196, 81, 0.35)'
                : theme.glow,
          }}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white transition-transform duration-200" />
          ) : (
            <HaatzaAILogo size={26} color="#FFFFFF" sparkleColor={theme.sparkle} />
          )}
        </button>
      </div>

      {/* =========================================================================
          3. RESPONSIVE CHAT WINDOW (Mobile Native Bottom-Sheet / Desktop Compact Panel)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="haatza-ai-heading"
          className="pointer-events-auto fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-[125] w-full sm:w-[385px] h-[85dvh] sm:h-[520px] max-h-[85dvh] sm:max-h-[calc(100vh-80px)] bg-white border-t sm:border border-zinc-200/90 rounded-t-[26px] sm:rounded-[22px] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-6 duration-200"
        >
          {/* Section Dynamic Header */}
          <div
            className="flex flex-col px-4 pt-2.5 pb-3 sm:py-3 text-white shrink-0 transition-colors duration-300"
            style={{ backgroundColor: theme.primary }}
          >
            {/* Mobile Sheet Drag Indicator */}
            <div className="w-10 h-1 rounded-full bg-white/40 mx-auto mb-2 sm:hidden shrink-0" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <HaatzaAILogo size={18} color="#FFFFFF" sparkleColor={theme.sparkle} />
                </div>
                <div>
                  <h2
                    id="haatza-ai-heading"
                    className="font-bold text-sm sm:text-base text-white tracking-tight leading-none"
                  >
                    Haatza AI
                  </h2>
                  <p className="text-[11px] text-white/80 leading-none mt-1 font-normal">
                    Your personal assistant
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseChat}
                aria-label="Close chat"
                className="p-1.5 text-white/85 hover:text-white hover:bg-white/15 rounded-lg transition-colors active:scale-95"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>

          {/* Conversation History Area */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3 bg-white scrollbar-thin scrollbar-thumb-zinc-200"
            tabIndex={0}
            aria-label="Conversation history"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const bubbleTheme = SECTION_COLOR_THEMES[msg.sectionContext || currentSection];
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed transition-colors duration-300 ${
                      isUser
                        ? 'text-white rounded-tr-sm font-normal'
                        : msg.isError
                        ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-sm'
                        : 'bg-zinc-100/80 text-zinc-800 rounded-tl-sm'
                    }`}
                    style={isUser ? { backgroundColor: bubbleTheme.primary } : undefined}
                  >
                    {formatMessageText(msg.content)}
                  </div>
                </div>
              );
            })}

            {/* Small Loading Indicator */}
            {isLoading && (
              <div className="flex items-center">
                <div className="bg-zinc-100/80 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (Horizontal Carousel on Mobile, Wrapped on Desktop) */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-3.5 sm:px-4 pb-2 pt-1 bg-white flex sm:flex-wrap flex-nowrap overflow-x-auto no-scrollbar gap-1.5 shrink-0">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="text-xs whitespace-nowrap sm:whitespace-normal bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-full border border-zinc-200/90 transition-colors font-medium shrink-0 text-left active:scale-95"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Friendly Error Notice */}
          {errorNotice && (
            <div className="px-3.5 py-1.5 bg-red-50 text-red-800 text-xs border-t border-red-100 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-1.5 truncate">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                {errorNotice}
              </span>
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="underline font-semibold ml-2 text-xs hover:text-red-950 shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Single Clean Input Area (Safe-Area Aware & No iOS Auto-Zoom) */}
          <div className="p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-white border-t border-zinc-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className={`flex items-center gap-2 bg-zinc-50 border border-zinc-200/90 rounded-xl px-2.5 py-1.5 focus-within:ring-2 ${theme.focusRing} transition-all`}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                aria-label="Ask me anything"
                disabled={isLoading}
                className="flex-1 max-h-24 bg-transparent text-[16px] sm:text-xs text-zinc-900 placeholder:text-zinc-400 resize-none outline-none px-1 py-1 leading-normal"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-white transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed shrink-0 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: theme.primary }}
              >
                <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};

export default HaatzaAIAssistant;
