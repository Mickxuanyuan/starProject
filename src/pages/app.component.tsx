import { HashRouter } from 'react-router-dom';
import { RoutesService } from '~/utils/routes/routes.service';
import { appRoutes } from './app.routes';

const App = () => {
  return (
    <HashRouter>{RoutesService.renderRoutes(appRoutes)}</HashRouter>
  );
};

export default App;
