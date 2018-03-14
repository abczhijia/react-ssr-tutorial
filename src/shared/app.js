import React from 'react';
import Projects from './projects';

export default class App extends React.Component {
    render() {
        return (<div>
            React SSR App
            <Projects data={this.props.data}/>
        </div>);
    }
}