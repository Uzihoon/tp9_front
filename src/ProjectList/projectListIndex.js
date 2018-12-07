/**
 * @description project list index function
 */

import projectListEvent from './projectListEvent';
import { server, projectList } from '../lib/url';
import { get } from '../lib/ajax';

const projectListIndex = () => {
    const url = server+projectList;

    get(url)
        .then(result => projectListEvent(result))
        .catch(error => console.error(error));
};

export default projectListIndex;