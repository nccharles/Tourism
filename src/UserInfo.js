
import { MYTOKEN,USER_ID, USER_NAME} from '../constants';
export const Info={
    componentDidMount = async () => {
        this.setState({
            token:await AsyncStorage.getItem(MYTOKEN),
            Username: await AsyncStorage.getItem(USER_NAME),
            userId: await AsyncStorage.getItem(USER_ID)
        })
}}