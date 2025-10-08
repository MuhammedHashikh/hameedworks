import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Users } from 'lucide-react';
import EmployeeForm from '../components/EmployeeForm';

const EmployeesView = ({ employees, addEmployee, updateEmployee, deleteEmployee, editingEmployee, setEditingEmployee, setCurrentView }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-900">Employees Management</h1>
            <button onClick={() => setCurrentView('home')} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Home
            </button>
          </div>
        </div>

        {!showForm && !editingEmployee && (
          <button onClick={() => setShowForm(true)} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center justify-center mb-6 shadow-lg">
            <PlusCircle className="w-5 h-5 mr-2" /> Add New Employee
          </button>
        )}

        {(showForm || editingEmployee) && (
          <EmployeeForm
            employee={editingEmployee}
            onSave={(data) => {
              if (editingEmployee) {
                updateEmployee(editingEmployee.id, data);
              } else {
                addEmployee(data);
              }
              setShowForm(false);
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingEmployee(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map(emp => (
            <div key={emp.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {emp.photo ? (
                    <img src={emp.photo} alt={emp.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{emp.name}</h3>
                    <p className="text-sm text-gray-500">₹{emp.payPerDay.toLocaleString('en-IN')}/day</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setEditingEmployee(emp)} className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center">
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => deleteEmployee(emp.id)} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {employees.length === 0 && !showForm && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No employees added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesView;