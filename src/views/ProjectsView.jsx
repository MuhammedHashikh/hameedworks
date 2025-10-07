import React from 'react';
import { Edit2, Trash2, FileText } from 'lucide-react';

const ProjectsView = ({ projects, owners, employees, deleteProject, editProject, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-orange-900">All Projects</h1>
            <button onClick={() => setCurrentView('home')} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Back to Home
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map(project => {
            const ownerShares = owners.map(owner => ({
              ...owner,
              share: (project.profit * owner.allocationPercentage) / 100
            }));

            return (
              <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                    <p className="text-gray-500">{project.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => editProject(project, setCurrentView)} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 flex items-center">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Revenue</p>
                    <p className="text-xl font-bold text-blue-600">₹{project.totalRevenue.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Employee Pay</p>
                    <p className="text-xl font-bold text-orange-600">₹{project.totalEmployeePay.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Expenses</p>
                    <p className="text-xl font-bold text-red-600">₹{project.totalExpenses.toLocaleString('en-IN')}</p>
                  </div>
                  <div className={`rounded-lg p-4 ${project.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm text-gray-600 mb-1">Profit</p>
                    <p className={`text-xl font-bold ${project.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{project.profit.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {project.employeeWork.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Employee Work:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.employeeWork.map((work, idx) => {
                        const emp = employees.find(e => e.id === work.employeeId);
                        return (
                          <div key={idx} className="bg-gray-50 rounded p-3 text-sm">
                            <span className="font-semibold">{emp?.name || 'Unknown'}</span>
                            <span className="text-gray-600"> - {work.days} days × ₹{work.payPerDay.toLocaleString('en-IN')} = </span>
                            <span className="font-semibold">₹{(work.days * work.payPerDay).toLocaleString('en-IN')}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {project.additionalExpenses.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Additional Expenses:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.additionalExpenses.map((exp, idx) => (
                        <div key={idx} className="bg-gray-50 rounded p-3 text-sm">
                          <span className="font-semibold">{exp.description}</span>
                          <span className="text-gray-600"> - ₹{exp.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {owners.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Owner Profit Distribution:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {ownerShares.map(owner => (
                        <div key={owner.id} className="bg-purple-50 rounded p-3">
                          <p className="font-semibold text-purple-900">{owner.name}</p>
                          <p className="text-sm text-purple-600">{owner.allocationPercentage}% = ₹{owner.share.toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No projects created yet</p>
            <button onClick={() => setCurrentView('newProject')} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsView;