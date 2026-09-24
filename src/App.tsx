import { ProjectProvider } from './context/ProjectContext';
import { AppRouter } from './routes/AppRouter';

export function App() {
  return (
    <ProjectProvider>
      <AppRouter />
    </ProjectProvider>
  );
}

export default App;
