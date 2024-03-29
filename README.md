
# @nghinv/react-native-alert

A custom alert component with react-native-reanimated

---

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]][all-contributors]


<img src="./assets/example.gif" height="600"/>

# Installation

## Installing the package

* Use yarn

```sh
yarn add @nghinv/react-native-alert
```

* Use npm

```sh
npm install @nghinv/react-native-alert
```

```sh
yarn add react-native-gesture-handler react-native-reanimated
```

# How to use

1. Wrapper `AlertService` in the `Root Component`

```javascript
  import { AlertService } from '@nghinv/react-native-alert';

  ...
  return (
    <AlertService>
      <RootComponent />
    </AlertService>
  );
  ...
```

2. Use `Alert.alert()` and `Alert.close()`

```javascript
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { AlertService, Alert, AlertView, AlertTitle } from '@nghinv/react-native-alert';

export default function Example() {
  const onPress = () => {
    Alert.alert(
      title: 'Thông báo',
      message: 'Lỗi kết nối mạng vui lòng thử lại sau',
        actions: [
        { 
          text: 'Cancel', 
          titleColor: 'orange', 
          autoDismiss: false, 
          onPress: () => {} 
        },
        { text: 'Next', disabled: true },
        { text: 'OK', autoDismiss: false },
      ],
    );
  };

  return (
    <AlertService>
      <View style={styles.container}>
        <Button title='Show alert' onPress={onPress} />
      </View>
    </AlertService>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  }
});
```

---
## Credits

- [@Nghi-NV](https://github.com/Nghi-NV)

[version-badge]: https://img.shields.io/npm/v/@nghinv/react-native-alert.svg?style=flat-square
[package]: https://www.npmjs.com/package/@nghinv/react-native-alert
[license-badge]: https://img.shields.io/npm/l/@nghinv/react-native-alert.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
[all-contributors]: #contributors