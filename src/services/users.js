/**
 * Created by nalantianyi on 2017/3/16.
 */
import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page = 1}) {
    return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function remove(id) {
    return request(`/api/users/${id}`, {method: 'DELETE'})
}
export function patch(id, values) {
    return request(`/api/users/${id}`, {method: 'PATCH', body: JSON.stringify(values)});
}
