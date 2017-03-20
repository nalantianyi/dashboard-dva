import React from 'react';
import styles from  './Users.css';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import {routerRedux} from 'dva/router';
import {PAGE_SIZE} from '../../constants';
import UserModal from './UserModal';

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

    pageChangeHandler = (dispatch, page) => {
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
        const {dispatch, list:dataSource, loading, total, page:current}=this.props;

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
                title: 'Website',
                dataIndex: 'website',
                key: 'website'
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    <span className={styles.operation}>
                        <UserModal record={record} onOk={this.editHandler.bind(null, dispatch, record.id)}>
                            <a>Edit</a>
                        </UserModal>
                        <Popconfirm title="Confirm to delete?"
                                    onConfirm={this.deleteHandle.bind(null, dispatch, record.id)}>
                            <a>Delete</a>
                        </Popconfirm>

                    </span>
                }
            }
        ];
        return (
            <div className={styles.normal}>
                <div>
                    <div className={styles.create}>
                        <UserModal record={{}}
                                   onOk={this.createHandler.bind(null, dispatch)}>
                            <Button type="primary">Create User</Button>
                        </UserModal>
                    </div>
                    <Table columns={columns}
                           dataSource={dataSource}
                           loading={loading}
                           rowKey={record => {
                               record.id
                           }}
                           pagination={false}
                    ></Table>
                    <Pagination className="ant-table-pagination"
                                total={total}
                                current={current}
                                pageSize={PAGE_SIZE}
                                onChange={this.pageChangeHandler.bind(null, dispatch)}
                    ></Pagination>
                </div>
            </div>);


    }
}
function mapStateToProps(state) {
    const {list, total, page}=state.users;
    return {
        loading: state.loading.models.users,
        list,
        total,
        page
    };
}

export default connect(mapStateToProps)(Users);
