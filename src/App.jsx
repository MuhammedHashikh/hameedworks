import React, { useState } from 'react';
import useAppData from './hooks/useAppData';
import HomeView from './views/HomeView';
import EmployeesView from './views/EmployeesView';
import OwnersView from './views/OwnersView';
import NewProjectView from './views/NewProjectView';
import ProjectsView from './views/ProjectsView';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const appData = useAppData();

  const renderView = () => {
    switch (currentView) {
      case 'employees':
        return <EmployeesView {...appData} setCurrentView={setCurrentView} />;
      case 'owners':
        return <OwnersView {...appData} setCurrentView={setCurrentView} />;
      case 'newProject':
        return <NewProjectView {...appData} setCurrentView={setCurrentView} />;
      case 'projects':
        return <ProjectsView {...appData} setCurrentView={setCurrentView} />;
      case 'home':
      default:
        return <HomeView {...appData} setCurrentView={setCurrentView} />;
    }
  };

  return <div>{renderView()}</div>;
};

export default App;