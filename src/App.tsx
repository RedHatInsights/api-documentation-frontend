import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';
import {router} from "./router/AppRouter";
import {RouterProvider} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";

import './App.scss';

const App = () => {
    return (
        <HelmetProvider>
            <RouterProvider router={ router } />
        </HelmetProvider>
    );
}

export default App;
