import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import {hashHistory} from 'dva/router';
import {message} from 'antd';


const ERROR_MSG_DURATION = 3;
const app = dva({
    history: hashHistory,
    onError(e){
        message.error(e.message, ERROR_MSG_DURATION);
    }

});
app.use(createLoading());
//动态依赖routes并动态注册model
app.router(require('./router'));

app.start('#root');
