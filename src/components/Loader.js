import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.loaderImage} />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Loader;
