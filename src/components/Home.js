import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Logo from '../components/Logo';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedLogo, setSelectedLogo] = React.useState(null);

  const logos = [
    { id: 1, imageSource: require('../../assets/logo.png'), link: 'https://www.example1.com' },
    { id: 2, imageSource: require('../../assets/logo.png'), link: 'https://www.example2.com' },
    { id: 3, imageSource: require('../../assets/logo.png'), link: 'https://www.example3.com' },
    { id: 4, imageSource: require('../../assets/logo.png'), link: 'https://www.example4.com' },
  ];

  const handleLogoPress = (link) => {
    setSelectedLogo(link);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <View style={styles.logoContainer}>
            {logos.map((logo) => (
              <Logo key={logo.id} imageSource={logo.imageSource} onPress={() => handleLogoPress(logo.link)} />
            ))}
          </View>
          {selectedLogo && (
            <WebView source={{ uri: selectedLogo }} style={styles.webView} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  webView: {
    flex: 1,
  },
});

export default HomeScreen;
