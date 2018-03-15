import React from 'react';
import BaseComponent from '../components/base_component';
import { getProjectList } from '../../shared/api';
import { Link } from 'react-router-dom';

export default class ProjectList extends BaseComponent {
    prefetch() {
        return getProjectList();
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log('thisstate: ', this.state);
        if (this.prefetch && !this.state.prefetch) {
            return <div>Loading</div>;
        }
        const { projects = [] } = this.state.prefetch;

        return <div>{
            projects.map(item => {
                return <ul key={item.id} style={{ marginTop: '20px' }}>
                    <li>{item.id}</li>
                    <li><Link to={`/project/detail?id=${item.id}`}>{item.name}</Link></li>
                    <li>{item.description}</li>
                </ul>;
            })
        }
        </div>;
    }
}