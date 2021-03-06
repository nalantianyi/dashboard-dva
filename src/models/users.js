import * as userService from '../services/users';
export default {
    namespace: 'users',
    state: {
        list: [],
        total: null,
        page: null
    },
    reducers: {
        save(state, {payload: {data:list, total, page}}){
            return {...state, list, total, page};
        }
    },
    effects: {
        *fetch({payload:{page = 1}}, {call, put}){
            const {data, headers}=yield call(userService.fetch, {page});
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10)
                }
            });
        },
        *remove({payload:id}, {call, put, select}){
            var result = yield call(userService.remove, id);

            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});

        },
        *patch({payload:{id, values}}, {call, put, select}){
            yield call(userService.patch, id, values);
            const page = yield select(state => state.users.state);
            yield put({type: 'fetch', payload: {page}});
        }
    },
    subscriptions: {
        setup({dispatch, history}){
            return history.listen(({pathname, query}) => {
                if (pathname === '/users') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        }
    },
};
