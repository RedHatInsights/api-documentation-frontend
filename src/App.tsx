import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';
import {router} from "./router/AppRouter";
import {RouterProvider} from 'react-router-dom';

const App = () => {
    return <RouterProvider router={ router } />
}

export default App;
