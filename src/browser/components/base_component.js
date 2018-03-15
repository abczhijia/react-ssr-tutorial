import React from 'react';
import qs from 'qs';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        let prefetch;
        if (typeof window === 'object' && window.window === window) {
            prefetch = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            prefetch = props.staticContext.prefetch;
        }

        this.state = { prefetch };
    }

    componentDidMount() {
        if (typeof this.prefetch === 'function' && !this.state.prefetch) {
            this.prefetch(qs.parse(this.props.location.search.replace(/^\?/, ''))).then(prefetch => {
                this.setState({ prefetch });
            });
        }
    }

    componentWillReceiveProps() {

    }
}