import React from 'react';
import { Users, Briefcase, PlusCircle, FileText, TrendingUp } from 'lucide-react';

const HomeView = ({ employees, owners, projects, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Profit Management System</h1>
          <p className="text-gray-600">Manage employees, owners, and project profitability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button onClick={() => setCurrentView('employees')} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <Users className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Employees</h3>
            <p className="text-blue-100">{employees.length} registered</p>
          </button>
          <button onClick={() => setCurrentView('owners')} className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <Briefcase className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Owners</h3>
            <p className="text-purple-100">{owners.length} registered</p>
          </button>
          <button onClick={() => setCurrentView('newProject')} className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <PlusCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">New Project</h3>
            <p className="text-green-100">Create project</p>
          </button>
          <button onClick={() => setCurrentView('projects')} className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <FileText className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Projects</h3>
            <p className="text-orange-100">{projects.length} completed</p>
          </button>
        </div>

        {projects.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2" /> Recent Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.slice(-4).reverse().map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{project.date}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue: ₹{project.totalRevenue.toLocaleString('en-IN')}</span>
                    <span className={`font-bold ${project.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Profit: ₹{project.profit.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;