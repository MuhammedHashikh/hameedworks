import { useState, useEffect } from 'react';

const useAppData = () => {
  const [employees, setEmployees] = useState([]);
  const [owners, setOwners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingOwner, setEditingOwner] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    employeeWork: [],
    additionalExpenses: [],
    totalRevenue: 0,
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedOwners = JSON.parse(localStorage.getItem('owners') || '[]');
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setEmployees(savedEmployees);
    setOwners(savedOwners);
    setProjects(savedProjects);
  }, []);

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addEmployee = (employee) => {
    const newEmployees = [...employees, { ...employee, id: Date.now() }];
    setEmployees(newEmployees);
    saveToStorage('employees', newEmployees);
  };

  const updateEmployee = (id, updatedEmployee) => {
    const newEmployees = employees.map(emp => emp.id === id ? { ...updatedEmployee, id } : emp);
    setEmployees(newEmployees);
    saveToStorage('employees', newEmployees);
    setEditingEmployee(null);
  };

  const deleteEmployee = (id) => {
    const newEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(newEmployees);
    saveToStorage('employees', newEmployees);
  };

  const addOwner = (owner) => {
    const newOwners = [...owners, { ...owner, id: Date.now() }];
    setOwners(newOwners);
    saveToStorage('owners', newOwners);
  };

  const updateOwner = (id, updatedOwner) => {
    const newOwners = owners.map(own => own.id === id ? { ...updatedOwner, id } : own);
    setOwners(newOwners);
    saveToStorage('owners', newOwners);
    setEditingOwner(null);
  };

  const deleteOwner = (id) => {
    const newOwners = owners.filter(own => own.id !== id);
    setOwners(newOwners);
    saveToStorage('owners', newOwners);
  };

  const calculateProjectProfit = (project) => {
    const totalEmployeePay = project.employeeWork.reduce((sum, work) => sum + (work.days * work.payPerDay), 0);
    const totalExpenses = project.additionalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const profit = project.totalRevenue - totalEmployeePay - totalExpenses;
    return { totalEmployeePay, totalExpenses, profit };
  };

  const saveProject = (setCurrentView) => {
    const projectWithCalc = {
      ...currentProject,
      id: editingProject ? editingProject.id : Date.now(),
      ...calculateProjectProfit(currentProject)
    };

    let newProjects;
    if (editingProject) {
      newProjects = projects.map(p => p.id === editingProject.id ? projectWithCalc : p);
    } else {
      newProjects = [...projects, projectWithCalc];
    }

    setProjects(newProjects);
    saveToStorage('projects', newProjects);
    setCurrentProject({
      title: '', employeeWork: [], additionalExpenses: [], totalRevenue: 0, date: new Date().toISOString().split('T')[0]
    });
    setEditingProject(null);
    setCurrentView('projects');
  };

  const deleteProject = (id) => {
    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);
    saveToStorage('projects', newProjects);
  };

  const editProject = (project, setCurrentView) => {
    setCurrentProject(project);
    setEditingProject(project);
    setCurrentView('newProject');
  };

  return {
    employees, addEmployee, updateEmployee, deleteEmployee, editingEmployee, setEditingEmployee,
    owners, addOwner, updateOwner, deleteOwner, editingOwner, setEditingOwner,
    projects, saveProject, deleteProject, editProject, editingProject, setEditingProject,
    currentProject, setCurrentProject, calculateProjectProfit
  };
};

export default useAppData;