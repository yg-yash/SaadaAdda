import * as React from 'react';

// NavigationConatiner is refered here - Check NavigationStack
export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}
function resetRoot() {
  navigationRef.current?.resetRoot();
}

export default {
  navigate,
  goBack,
  resetRoot,
};
