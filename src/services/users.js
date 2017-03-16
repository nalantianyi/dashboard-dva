/**
 * Created by nalantianyi on 2017/3/16.
 */
import request from '../utils/request';

export function fetch({ page = 1 }) {
    return request(`/api/users?_page=${page}&_limit=5`);
}
