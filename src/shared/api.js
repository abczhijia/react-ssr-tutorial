import fetch from 'isomorphic-fetch';

export function get(path) {
    return fetch(`http://localhost:3000/api${path}`);
}

export function getProjectList() {
    return get('/projects.json');
}