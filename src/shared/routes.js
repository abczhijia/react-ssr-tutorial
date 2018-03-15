import ProjectList from '../browser/pages/project_list';
import ProjectDetail from '../browser/pages/project_detail';
import NotFound from '../browser/pages/404';

const routes = [
    {
        path: '/',
        exact: true,
        component: ProjectList,
    },
    {
        path: '/project/detail',
        exact: true,
        component: ProjectDetail,
    },
    {
        path: '*',
        component: NotFound,
    },
];

export default routes;