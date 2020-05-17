import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { axios } from '../services/firebase';
import firebase from 'firebase';

const SignInForm = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/verifyOneTimePassword', {
        phone,
        code,
      });

      firebase.auth().signInWithCustomToken(data.token);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Text>Enter Phone Number</Text>
        <Input onChangeText={(phone) => setPhone(phone)} value={phone} />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text>Enter Code</Text>
        <Input onChangeText={(code) => setCode(code)} value={code} />
      </View>

      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
};

export default SignInForm;
