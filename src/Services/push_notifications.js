import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  // Check if a token exists
  let previousToken = await AsyncStorage.getItem('pushtoken');
  //console.log(previousToken);
  // token = ExponentPushToken[pR1evWNT57bF3F4GChT8H9]

  if(previousToken) {
    return;
  } else {
    // Get permisson from user to use push Notifications
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if(status !== 'granted') {
      return;
    }

    // Generate token
    let token = await Notifications.getExponentPushTokenAsync();
    // Save token to server (Stepens Server)
    await axios.post(PUSH_ENDPOINT, { token: { token } }); // notice  necessary nested object
    // Save token to device
    AsyncStorage.setItem('pushtoken', token);



  }
};
