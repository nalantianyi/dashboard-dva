import React from 'react';
import './Users.css';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import {routerRedux} from 'dva/router';
import {PAGE_SIZE} from '../../constants';

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteHandle = (dispatch, id) => {
        dispatch({
            type: 'users/remove',
            payload: id
        });
    };

    pageChangeHandle = (dispatch, page) => {
        dispatch(routerRedux.push({
            pathname: 'users',
            query: {page}
        }));
    };

    editHandler = (dispatch, id, values) => {
        dispatch({
            type: 'users/patch',
            payload: {
                id, values
            }
        });
    };
    createHandler = (dispatch, values) => {
        dispatch({
            type: 'user/create',
            payload: values
        });
    };

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="">{text}</a>
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title:'Website',
                dataIndex:'website',
                key:'website'
            },
            {
                title:'Operation',
                dataIndex:'operation',
                render:(text,record)=>{
                    <span className="operation">

                    </span>
                }
            }
        ];
        const {dispatch, list:dataSource, loading, total, page:current}=this.props;

    }
}

export default Users;
