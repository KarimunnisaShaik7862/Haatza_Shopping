import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been delivered to HAATZA customer support.', 'success');
  };

  const breadcrumbs = [{ label: 'Help', link: '/help' }, { label: 'Contact Us' }];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          Contact Customer Care
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Have an inquiry, feedback, or delivery question? We're eager to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 space-y-4 shadow-2xs">
            <h3 className="font-bold text-sm text-[#202124] uppercase tracking-wider">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs text-zinc-600">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFEBEE] text-[#E53935] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">Toll Free Support</h4>
                  <p className="text-zinc-500">1800-419-8282 (24 Hours / 7 Days)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFEBEE] text-[#E53935] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">Email Inquiries</h4>
                  <p className="text-zinc-500">care@haatza.in / support@haatza.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFEBEE] text-[#E53935] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">Headquarters</h4>
                  <p className="text-zinc-500">
                    HAATZA Technologies India Pvt. Ltd.<br />
                    Tower B, 7th Floor, BKC One, Bandra Kurla Complex,<br />
                    Mumbai, Maharashtra 400051
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-2xs">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Message Received!</h3>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                  Thank you for reaching out. A customer support representative will get back to you within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-sm text-[#202124] uppercase tracking-wider mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-hidden focus:border-[#E53935]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.in"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-hidden focus:border-[#E53935]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry regarding order HTZ-..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-hidden focus:border-[#E53935]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can assist you..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-hidden focus:border-[#E53935]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
