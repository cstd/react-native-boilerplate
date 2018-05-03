
import { NavigationActions } from 'react-navigation';

export function goBack() {
  return NavigationActions.back();
}

export function navigate(route) {
  return (dispatch, getState) => {
    const nav = getState().nav;
    if (!(nav.routes && nav.routes.length && nav.routes[nav.routes.length-1].routeName === route.routeName)) {
      dispatch(NavigationActions.navigate(route));
    }
  }
}

export function resetRoute(routeName) {
  return (dispatch, getState) => {
    const nav = getState().nav;
    dispatch(NavigationActions.reset({
      index: 0, 
      key: null,
      actions: [
        NavigationActions.navigate({routeName})
      ]
    }));
  };
}
