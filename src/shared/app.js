import React from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                {
                    routes.map(({ path, exact, component: Comp }) => {
                        return <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={(props) => <Comp {...props}/>}
                        />;
                    })
                }
            </Switch>);
    }
}