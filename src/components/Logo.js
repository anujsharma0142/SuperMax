import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Logo = ({ onPress, imageSource }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.logoImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
});

export default Logo;
