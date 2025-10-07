import React, { useState } from 'react';
import { Save, X, Image as ImageIcon } from 'lucide-react';

const OwnerForm = ({ owner, onSave, onCancel }) => {
  const [formData, setFormData] = useState(owner || { name: '', allocationPercentage: 0, photo: '' });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h3 className="text-xl font-bold mb-4">{owner ? 'Edit Owner' : 'Add New Owner'}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Owner name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profit Allocation (%)</label>
          <input
            type="number"
            value={formData.allocationPercentage}
            onChange={(e) => setFormData({ ...formData, allocationPercentage: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Percentage" max="100" min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
          <div className="flex items-center space-x-4">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="ownerPhoto" />
            <label htmlFor="ownerPhoto" className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <ImageIcon className="w-5 h-5 mr-2" /> Upload Photo
            </label>
            {formData.photo && <img src={formData.photo} alt="Owner" className="w-16 h-16 rounded-full object-cover" />}
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => onSave(formData)} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center">
            <Save className="w-5 h-5 mr-2" /> Save
          </button>
          <button onClick={onCancel} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 flex items-center justify-center">
            <X className="w-5 h-5 mr-2" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerForm;