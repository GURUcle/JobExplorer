import { Permissions } from 'expo';

export default async () => {
  let { status } = await Permissions.getAsync(Permissions.LOCATION);
  if(status === 'granted') {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
      console.log('loc_perm_err');
      return;
    }
  }
};
