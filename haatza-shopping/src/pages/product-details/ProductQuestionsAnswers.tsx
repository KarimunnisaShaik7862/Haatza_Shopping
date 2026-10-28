import React, { useState } from 'react';
import { HelpCircle, Search, ThumbsUp, X, Check, MessageCircleQuestion, ChevronDown } from 'lucide-react';
import { Product } from '../../types';
import { getProductQuestions, QuestionAnswerItem } from './productDetailHelper';

interface ProductQuestionsAnswersProps {
  product: Product;
}

export const ProductQuestionsAnswers: React.FC<ProductQuestionsAnswersProps> = ({ product }) => {
  const baseQuestions = getProductQuestions(product);
  const [questions, setQuestions] = useState<QuestionAnswerItem[]>(baseQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpvote = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQA: QuestionAnswerItem = {
      id: `qa-${Date.now()}`,
      question: newQuestionText.trim(),
      answer: 'Thank you for your question. The seller or an authorized representative will post an answer shortly.',
      author: 'HAATZA Support Team',
      date: 'Just now',
      isSellerAnswer: true,
      upvotes: 0,
    };

    setQuestions([newQA, ...questions]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsAskModalOpen(false);
      setNewQuestionText('');
    }, 1500);
  };

  return (
    <div className="border-t border-slate-200 pt-5 sm:pt-6 space-y-4">
      {/* Header with Down Arrow Accordion Trigger */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 text-left group cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#2962FF]" />
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#2962FF] transition-colors">
              Questions & Answers ({questions.length})
            </h3>
            <p className="text-xs text-slate-500 font-body">
              {isExpanded ? 'Click to collapse' : 'Click to view answers from sellers & shoppers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#2962FF] hidden sm:inline">
            {isExpanded ? 'Hide Q&A' : 'View Q&A'}
          </span>
          <span className={`p-1.5 rounded-lg border border-slate-200 bg-white group-hover:border-[#2962FF] transition-all ${isExpanded ? 'bg-[#EEF3FF] border-[#2962FF]' : ''}`}>
            <ChevronDown className={`w-4 h-4 text-[#2962FF] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </button>

      {/* Expandable Q&A Content */}
      {isExpanded && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <span className="text-xs text-slate-500 font-body">
              Verified answers from sellers and shoppers
            </span>
            <button
              type="button"
              onClick={() => setIsAskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF3FF] hover:bg-[#DBEAFE] text-[#2962FF] font-bold text-xs transition-colors cursor-pointer font-heading"
            >
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span>Ask a Question</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords (e.g. warranty, fit, wash, battery)..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#2962FF] focus:outline-none"
            />
          </div>

          {/* Questions List */}
          <div className="space-y-3.5 divide-y divide-slate-100 pt-1">
        {filteredQuestions.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center font-body">
            No matching questions found for "{searchQuery}". You can be the first to ask!
          </p>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="pt-3.5 first:pt-0 space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="font-black text-[#2962FF] text-xs font-heading shrink-0 mt-0.5">
                  Q:
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                  {q.question}
                </h5>
              </div>

              <div className="flex items-start gap-2 pl-4">
                <span className="font-bold text-emerald-600 text-xs font-heading shrink-0 mt-0.5">
                  A:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-body">
                  {q.answer}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pl-4 pt-1">
                <span className="font-medium text-slate-500">
                  Answered by <strong className="text-slate-700">{q.author}</strong> on {q.date}
                </span>

                <button
                  type="button"
                  onClick={() => handleUpvote(q.id)}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-[#2962FF] cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({q.upvotes})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )}

      {/* Ask Question Modal */}
      {isAskModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsAskModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Ask a Question about this Product
              </h3>
              <button
                type="button"
                onClick={() => setIsAskModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Question Submitted!
                </h4>
                <p className="text-xs text-slate-500 font-body">
                  Your question has been forwarded to the verified seller and community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 font-body">
                  Ask regarding specifications, sizing, compatibility, delivery, or warranty.
                </p>
                <textarea
                  rows={4}
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Type your question here (e.g. Is this fabric see-through? / Is charger included?)..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-[#2962FF] focus:outline-none"
                />
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAskModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 font-heading cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl text-xs transition-colors font-heading shadow-xs cursor-pointer"
                  >
                    Post Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
