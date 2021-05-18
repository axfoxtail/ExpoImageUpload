import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>
      <View style={styles.imageWrapper}>
        {selectedImage && <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />}
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage(null)} style={[styles.button, {backgroundColor: 'red'}]}>
          <Text style={styles.buttonText}>Remove photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 100,
  },
  instructions: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  imageWrapper: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'red',
  },
  thumbnail: {
    flex: 1,
    resizeMode: "cover"
  },
  button: {
    backgroundColor: 'green',
    padding: 5,
    marginTop: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
  }
});
