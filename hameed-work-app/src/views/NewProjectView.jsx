import React from 'react';
import { PlusCircle, Trash2, Save, Calculator } from 'lucide-react';

const NewProjectView = ({
  employees, owners, editingProject, setEditingProject, currentProject, setCurrentProject, saveProject, calculateProjectProfit, setCurrentView
}) => {
  const addEmployeeWork = () => {
    if (employees.length === 0) {
      alert('Please add employees first!');
      return;
    }
    setCurrentProject({
      ...currentProject,
      employeeWork: [...currentProject.employeeWork, { employeeId: employees[0].id, days: 0, payPerDay: employees[0].payPerDay }]
    });
  };

  const updateEmployeeWork = (index, field, value) => {
    const newWork = [...currentProject.employeeWork];
    if (field === 'employeeId') {
      const emp = employees.find(e => e.id === parseInt(value));
      newWork[index] = { ...newWork[index], employeeId: parseInt(value), payPerDay: emp.payPerDay };
    } else {
      newWork[index][field] = parseFloat(value) || 0;
    }
    setCurrentProject({ ...currentProject, employeeWork: newWork });
  };

  const removeEmployeeWork = (index) => {
    setCurrentProject({
      ...currentProject,
      employeeWork: currentProject.employeeWork.filter((_, i) => i !== index)
    });
  };

  const addExpense = () => {
    setCurrentProject({
      ...currentProject,
      additionalExpenses: [...currentProject.additionalExpenses, { description: '', amount: 0 }]
    });
  };

  const updateExpense = (index, field, value) => {
    const newExpenses = [...currentProject.additionalExpenses];
    newExpenses[index][field] = field === 'amount' ? (parseFloat(value) || 0) : value;
    setCurrentProject({ ...currentProject, additionalExpenses: newExpenses });
  };

  const removeExpense = (index) => {
    setCurrentProject({
      ...currentProject,
      additionalExpenses: currentProject.additionalExpenses.filter((_, i) => i !== index)
    });
  };

  const handleCancel = () => {
    setCurrentView('home');
    setCurrentProject({ title: '', employeeWork: [], additionalExpenses: [], totalRevenue: 0, date: new Date().toISOString().split('T')[0] });
    setEditingProject(null);
  };

  const calculations = calculateProjectProfit(currentProject);
  const ownerShares = owners.map(owner => ({
    ...owner,
    share: (calculations.profit * owner.allocationPercentage) / 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-900">{editingProject ? 'Edit Project' : 'New Project'}</h1>
            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input type="text" value={currentProject.title} onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter project title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" value={currentProject.date} onChange={(e) => setCurrentProject({ ...currentProject, date: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          </div>

          {/* Employee Work */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Employee Work</h2>
              <button onClick={addEmployeeWork} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Employee
              </button>
            </div>
            <div className="space-y-3">
              {currentProject.employeeWork.map((work, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <select value={work.employeeId} onChange={(e) => updateEmployeeWork(index, 'employeeId', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg">
                    {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                  </select>
                  <input type="number" value={work.days} onChange={(e) => updateEmployeeWork(index, 'days', e.target.value)} placeholder="Days" className="w-24 px-3 py-2 border border-gray-300 rounded-lg" />
                  <input type="number" value={work.payPerDay} onChange={(e) => updateEmployeeWork(index, 'payPerDay', e.target.value)} placeholder="₹/day" className="w-32 px-3 py-2 border border-gray-300 rounded-lg" />
                  <span className="w-32 text-right font-semibold text-gray-700">₹{(work.days * work.payPerDay).toLocaleString('en-IN')}</span>
                  <button onClick={() => removeEmployeeWork(index)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              {currentProject.employeeWork.length === 0 && <p className="text-gray-500 text-center py-4">No employees added yet</p>}
            </div>
          </div>

          {/* Additional Expenses */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Additional Expenses</h2>
              <button onClick={addExpense} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Expense
              </button>
            </div>
            <div className="space-y-3">
              {currentProject.additionalExpenses.map((expense, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <input type="text" value={expense.description} onChange={(e) => updateExpense(index, 'description', e.target.value)} placeholder="Description" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                  <input type="number" value={expense.amount} onChange={(e) => updateExpense(index, 'amount', e.target.value)} placeholder="Amount" className="w-40 px-3 py-2 border border-gray-300 rounded-lg" />
                  <button onClick={() => removeExpense(index)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              {currentProject.additionalExpenses.length === 0 && <p className="text-gray-500 text-center py-4">No expenses added yet</p>}
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Total Revenue</h2>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-700 mr-3">₹</span>
              <input type="number" value={currentProject.totalRevenue} onChange={(e) => setCurrentProject({ ...currentProject, totalRevenue: parseFloat(e.target.value) || 0 })} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-xl focus:ring-2 focus:ring-green-500" placeholder="Enter total revenue" />
            </div>
          </div>

          {/* Calculations Summary */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center"><Calculator className="mr-3" /> Financial Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">₹{currentProject.totalRevenue.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Employee Payments</p>
                <p className="text-2xl font-bold">₹{calculations.totalEmployeePay.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Additional Expenses</p>
                <p className="text-2xl font-bold">₹{calculations.totalExpenses.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Total Profit</p>
                <p className={`text-2xl font-bold ${calculations.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>₹{calculations.profit.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {owners.length > 0 && (
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3">Owner Profit Distribution</h3>
                <div className="space-y-2">
                  {ownerShares.map(owner => (
                    <div key={owner.id} className="flex justify-between items-center bg-white bg-opacity-10 rounded p-3">
                      <span className="font-semibold">{owner.name} ({owner.allocationPercentage}%)</span>
                      <span className="text-lg font-bold">₹{owner.share.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => saveProject(setCurrentView)} disabled={!currentProject.title} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center text-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="w-6 h-6 mr-3" /> {editingProject ? 'Update Project' : 'Save Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectView;