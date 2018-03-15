import React from 'react';
import BaseComponent from '../components/base_component';
import { getProjectDetail } from '../../shared/api';

export default class ProjectDetail extends BaseComponent {
    prefetch(params, query) {
        return getProjectDetail(params.id);
    }

    render() {
        if (this.prefetch && !this.state.prefetch) {
            return <div>Loading ...</div>;
        }
        const { project = {} } = this.state.prefetch;
        return <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>;
    }
}