import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { axios } from '../services/firebase';

const SignUpForm = () => {
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/createUser', {
        phone,
      });

      await axios.post('/requestOneTimePassword', {
        phone,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text>Enter Phone Number</Text>
      <Input onChangeText={(phone) => setPhone(phone)} value={phone} />
      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
};

export default SignUpForm;
