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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 space-y-8 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 border-b border-[#E5EAF3]">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Contact Customer Care
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Have an inquiry, feedback, or delivery question? We're eager to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-[#E5EAF3] space-y-4 shadow-soft">
            <h3 className="font-bold text-sm text-[#172033] uppercase tracking-wider">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs text-[#64748B]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172033]">Toll Free Support</h4>
                  <p className="text-[#64748B]">1800-419-8282 (24 Hours / 7 Days)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172033]">Email Inquiries</h4>
                  <p className="text-[#64748B]">care@haatza.in / support@haatza.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#172033]">Headquarters</h4>
                  <p className="text-[#64748B]">
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
          <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 sm:p-8 shadow-soft">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-[#172033]">Message Received!</h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  Thank you for reaching out. A customer support representative will get back to you within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#2962FF] hover:bg-[#1E4ED8] text-white rounded-xl text-xs font-bold transition-colors shadow-soft-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-sm text-[#172033] uppercase tracking-wider mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.in"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry regarding order HTZ-..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can assist you..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold rounded-xl transition-all shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2"
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
