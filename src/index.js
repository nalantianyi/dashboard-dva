import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { message } from 'antd';


const ERROR_MSG_DURATION = 3;
const app = dva({
    history:browserHistory,
    onError(e){
        message.error(e.message,ERROR_MSG_DURATION);
    }

});
app.use(createLoading());
app.model(require("./models/users"));


app.router(require('./router'));

app.start('#root');
