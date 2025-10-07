import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Briefcase } from 'lucide-react';
import OwnerForm from '../components/OwnerForm';

const OwnersView = ({ owners, addOwner, updateOwner, deleteOwner, editingOwner, setEditingOwner, setCurrentView }) => {
  const [showForm, setShowForm] = useState(false);
  const totalAllocation = owners.reduce((sum, own) => sum + own.allocationPercentage, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Owners Management</h1>
              <p className="text-gray-600 mt-1">Total Allocation: {totalAllocation}%</p>
            </div>
            <button onClick={() => setCurrentView('home')} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Home
            </button>
          </div>
        </div>

        {!showForm && !editingOwner && (
          <button onClick={() => setShowForm(true)} className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center justify-center mb-6 shadow-lg">
            <PlusCircle className="w-5 h-5 mr-2" /> Add New Owner
          </button>
        )}

        {(showForm || editingOwner) && (
          <OwnerForm
            owner={editingOwner}
            onSave={(data) => {
              if (editingOwner) {
                updateOwner(editingOwner.id, data);
              } else {
                addOwner(data);
              }
              setShowForm(false);
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingOwner(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {owners.map(own => (
            <div key={own.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {own.photo ? (
                    <img src={own.photo} alt={own.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Briefcase className="w-8 h-8 text-purple-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{own.name}</h3>
                    <p className="text-sm text-gray-500">{own.allocationPercentage}% share</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingOwner(own)} className="flex-1 bg-purple-100 text-purple-600 py-2 rounded-lg hover:bg-purple-200 flex items-center justify-center">
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => deleteOwner(own.id)} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {owners.length === 0 && !showForm && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No owners added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnersView;