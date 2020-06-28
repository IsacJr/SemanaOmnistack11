import 'react-native-gesture-handler';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import Routes from './src/routes';

import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';

import {
  View,
  Text,
} from 'react-native';

export default function App() {
  return (
    <View style={{ flex:1 }}>

      <GeneralStatusBarColor backgroundColor="gray" barStyle="light-content"/>

      <Routes />

    </View>
  )
}
