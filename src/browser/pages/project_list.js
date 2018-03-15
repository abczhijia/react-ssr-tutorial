import React from 'react';
import { getProjectList } from '../../shared/api';

export default class ProjectList extends React.Component {
    static prefetch() {
        return getProjectList();
    }

    constructor(props) {
        super(props);

        let data;

        if (typeof window === 'object' && window.window === window) {
            data = window.__INITIAL_DATA__;
        } else {
            data = props.staticContext.data;
        }

        this.state = { data };
    }

    render() {
        const { projects = [] } = this.state.data;

        return <div>{
            projects.map(item => {
                return <ul key={item.id} style={{ marginTop: '20px' }}>
                    <li>{item.id}</li>
                    <li><a href={`/project/${item.id}`}>{item.name}</a></li>
                    <li>{item.description}</li>
                </ul>;
            })
        }
        </div>;
    }
}