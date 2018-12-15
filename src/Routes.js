import { createStackNavigator } from 'react-navigation';

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Details from './components/Details';

export default createStackNavigator({
    Main,
    Login,
    Register,
    Details
}, 
{
navigationOptions:{
    headerStyle: {
        backgroundColor: "#fff"
    },
    headerTintColor: '#222'
},

});