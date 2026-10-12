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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            Saved Delivery Addresses
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Manage your delivery destinations for fast one-tap checkout
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
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
              addr.isDefault ? 'border-[#E53935] shadow-xs' : 'border-zinc-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900">{addr.fullName}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                  {addr.addressType}
                </span>
              </div>
              {addr.isDefault && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E53935] bg-[#FFEBEE] px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}
              {addr.landmark ? `Near ${addr.landmark}, ` : ''}
              {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
            </p>

            <p className="text-xs text-zinc-500 font-medium mt-3">
              Contact: {addr.phone} {addr.altPhone ? `(Alt: ${addr.altPhone})` : ''}
            </p>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 text-xs">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  className="font-bold text-[#E53935] hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-[11px] text-zinc-400">Primary Delivery Point</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-1"
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
