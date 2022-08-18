import { Button } from 'antd';
import { FC } from 'react';
import style from './login.module.less';
import IMG from '~/assets/images/gmail.png';
const LoginPage: FC = () => {
    return <div className={style.login}>
        <span>{process.env.LOGIN}</span>
        <img src={IMG}/>
        <Button type="primary">button</Button>
    </div>
}

export default LoginPage;