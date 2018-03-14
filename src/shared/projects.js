import React from 'react';

export default class Projects extends React.Component {
    render() {
        const { projects = [] } = this.props.data;

        return <div>
            {
                projects.map(item => {
                    return <ul key={item.id} style={{ marginTop: '20px' }}>
                        <li>{item.id}</li>
                        <li><a href={`/projects/${item.id}`}>{item.name}</a></li>
                        <li>{item.description}</li>
                    </ul>;
                })
            }
        </div>;
    }
}