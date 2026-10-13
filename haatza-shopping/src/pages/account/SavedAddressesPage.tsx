import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Address } from '../../types';
import { AddressForm } from '../../components/forms/AddressForm';
import { Modal } from '../../components/common/Modal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

export const SavedAddressesPage: React.FC = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);

  const breadcrumbs = [
    { label: 'My Account', link: '/account' },
    { label: 'Saved Addresses' },
  ];

  const handleOpenAdd = () => {
    setEditingAddress(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<Address, 'id'>) => {
    if (editingAddress) {
      updateAddress({ ...data, id: editingAddress.id });
    } else {
      addAddress(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-[#E5EAF3]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your delivery destinations for fast one-tap checkout
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold transition-all shadow-soft-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl border-2 transition-all bg-white relative ${
              addr.isDefault ? 'border-[#2962FF] shadow-soft-sm bg-[#F5F7FF]/30' : 'border-[#E5EAF3] hover:border-[#DBEAFE]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#172033]">{addr.fullName}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F7FF] text-[#64748B] border border-[#E5EAF3]">
                  {addr.addressType}
                </span>
              </div>
              {addr.isDefault && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2962FF] bg-[#EEF3FF] border border-[#DBEAFE] px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
                </span>
              )}
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}
              {addr.landmark ? `Near ${addr.landmark}, ` : ''}
              {addr.city}, {addr.state} - <strong className="text-[#172033]">{addr.pincode}</strong>
            </p>

            <p className="text-xs text-[#64748B] font-medium mt-3">
              Contact: {addr.phone} {addr.altPhone ? `(Alt: ${addr.altPhone})` : ''}
            </p>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E5EAF3] text-xs">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  className="font-bold text-[#2962FF] hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-[11px] text-[#64748B]">Primary Delivery Point</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="p-1.5 text-[#64748B] hover:text-[#2962FF] hover:bg-[#EEF3FF] rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteAddress(addr.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Address Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAddress ? 'Edit Delivery Address' : 'Add New Delivery Address'}
        maxWidth="lg"
      >
        <AddressForm
          initialValues={editingAddress}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
