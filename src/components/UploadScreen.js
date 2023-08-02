import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

import { firebase } from '../../config';

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);

  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
      },
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri }; // Update this line
        console.log(source);
        setImage(source);
      }
    });
  };
  

  const uploadImage = async () => {
    const { uri } = image;
    setUpload(true);
    try {
      const response = await fetch(uri);
  
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
  
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    //   const blob = await response.blob();
    //   const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    //   const ref = firebase.storage().ref().child(filename);
    //   const snapshot = await ref.put(blob);
  
    //   // Get the image URL after uploading
    //   const imageUrl = await snapshot.ref.getDownloadURL();
  
      setUpload(false);
      Alert.alert('Photo uploaded..!!');
      
      // Depending on your requirements, you might want to do something with the imageUrl
      // For example, you can set it in your state or perform any other necessary action
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
      setUpload(false);
      Alert.alert('An error occurred while uploading the photo.' + error);
    }
  };
  
  
  

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
        {image && (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default UploadScreen;
