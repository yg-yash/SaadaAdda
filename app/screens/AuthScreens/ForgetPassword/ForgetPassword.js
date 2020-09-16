import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const {
    loginReducer: { forgotPasswordError },
    loadingReducer: { isForgotPasswordLoading },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email Is Required');
      return true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailError('email is invalid');
      return true;
    } else {
      setEmailError(null);
      return false;
    }
  };

  const onSubmit = () => {
    if (validateEmail()) {
      return;
    }
    dispatch(loginActions.requestForgotPassword(email));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.primaryGradient} />
        <View style={styles.logoContainer}>
          <View style={styles.backButtonContainer}>
            <Button
              type="clear"
              title="Back"
              titleStyle={styles.backText}
              buttonStyle={styles.backButton}
              onPress={() => navigation.goBack()}
              icon={
                <BackIcon
                  name="ios-arrow-back"
                  color="#999999"
                  style={{ marginHorizontal: 10, marginTop: 2 }}
                />
              }
            />
          </View>
          <Image
            source={require('app/assets/images/icon.jpg')}
            style={styles.logoImage}
            resizeMode={'center'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.signInText}>Forget your password?</Text>
          <Text style={styles.secondaryText}>
            No worries,Please enter your registered email address.We will send
            you an email.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="mail" size={18} style={styles.inputLogo} />
            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardType="email-address"
              onEndEditing={validateEmail}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {forgotPasswordError ? (
            <Text
              style={[
                styles.errorText,
                { alignSelf: 'center', marginTop: 10, marginLeft: 0 },
              ]}>
              {forgotPasswordError}
            </Text>
          ) : null}
          <TouchableWithoutFeedback onPress={onSubmit}>
            <LinearGradient
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 0 }}
              colors={[Colors.primaryGradient, Colors.secondaryGradient]}
              style={styles.gradient}>
              {isForgotPasswordLoading ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Text style={styles.btnText}>SEND OTP </Text>
              )}
            </LinearGradient>
          </TouchableWithoutFeedback>
          <View style={styles.joinContainer}>
            <Text style={styles.joinText}>Password remembered?</Text>
            <Button
              title="Sign in"
              type="clear"
              titleStyle={styles.signUpBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#999999',
    fontSize: 12,
  },
  secondaryText: { width: '80%', fontSize: 16 },
  backButton: {},
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
  },
  logoImage: {
    width: '50%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: '10%',
    marginVertical: '10%',
  },
  gradient: {
    width: '90%',
    height: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  form: {
    flex: 2,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 21,
    width: '89%',
  },
  inputLogo: {
    marginLeft: '10%',
    color: '#999999',
  },
  input: {
    marginLeft: '5%',
    color: '#999999',
    flex: 1,
  },
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 0,
  },
  passwordIcon: { marginRight: 10 },

  titleStyle: {
    textAlign: 'center',
    color: 'white',
    letterSpacing: 3,
  },
  circleGradient: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  visit: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#008f68',
    fontSize: 12,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    right: '10%',
    marginBottom: 10,
  },
  forgotText: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 15,
  },
  orContainer: {
    marginVertical: 15,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialMediaLogosContainer: {
    marginLeft: 5,
    width: 24,
    height: 24,
    flexDirection: 'row',
  },
  socialMediaLogos: {
    width: '100%',
    height: '100%',
    marginHorizontal: 4,
  },
  socialText: {
    fontSize: 14,
    lineHeight: 18,
  },
  joinContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
  },
  joinText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  signUpBtn: {
    color: Colors.primaryGradient,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Poppins-Regular',
    color: 'red',
    marginVertical: 10,
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
});

export default ForgetPasswordScreen;
