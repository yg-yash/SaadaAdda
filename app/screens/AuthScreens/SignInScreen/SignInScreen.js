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
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import PasswordIcon from 'react-native-vector-icons/SimpleLineIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import * as loginActions from 'app/actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const showPasswordHandler = () => setShowPassword(value => !value);

  const dispatch = useDispatch();
  const {
    loginReducer: { loginError },
    loadingReducer: { isLoginLoading },
  } = useSelector(state => state);

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

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password Is Required');
      return true;
    }
    let reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
    if (reg.test(password) === false) {
      setPasswordError(
        'Password must be 8 words and must have 1 uppercase,1 lowercase and 1 special character',
      );
      return true;
    } else {
      setPasswordError('');
      return false;
    }
  };

  const onLogin = () => {
    if (validateEmail() || validatePassword()) {
      return;
    }
    dispatch(loginActions.requestLogin(email, password));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
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
          <View style={{ flex: 2 }}>
            <View style={styles.textContainer}>
              <Text style={styles.signInText}>Sign In</Text>
              <Text style={styles.secondaryText}>
                with your current account
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
              <View style={styles.inputContainer}>
                <PasswordIcon name="lock" size={18} style={styles.inputLogo} />
                <TextInput
                  value={password}
                  placeholder="Password"
                  onChangeText={text => setPassword(text)}
                  style={[styles.input, { flex: 1 }]}
                  secureTextEntry={!showPassword}
                  onEndEditing={validatePassword}
                  minLength={8}
                />

                {showPassword ? (
                  <Icon
                    name="eye-off"
                    type="feather"
                    size={20}
                    color="#999999"
                    style={styles.passwordIcon}
                    onPress={showPasswordHandler}
                  />
                ) : (
                  <Icon
                    name="eye"
                    type="feather"
                    size={20}
                    color="#999999"
                    style={styles.passwordIcon}
                    onPress={showPasswordHandler}
                  />
                )}
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <View style={styles.forgotPasswordContainer}>
                <Text
                  style={styles.forgotText}
                  onPress={() => navigation.navigate('Forget')}>
                  Forgot Password?
                </Text>
              </View>

              {loginError ? (
                <Text
                  style={[
                    styles.errorText,
                    { alignSelf: 'center', marginVertical: 10 },
                  ]}>
                  {loginError}
                </Text>
              ) : null}
              <TouchableWithoutFeedback onPress={onLogin}>
                <LinearGradient
                  start={{ x: 0.5, y: 0.5 }}
                  end={{ x: 1, y: 0 }}
                  colors={[Colors.primaryGradient, Colors.secondaryGradient]}
                  style={styles.gradient}>
                  {isLoginLoading ? (
                    <ActivityIndicator size={25} color="white" />
                  ) : (
                    <Text style={styles.btnText}>Here We Go !</Text>
                  )}
                </LinearGradient>
              </TouchableWithoutFeedback>

              <View style={styles.orContainer}>
                <Text>OR</Text>
              </View>
              <View style={styles.socialMediaContainer}>
                <Text style={styles.socialText}>Sign in with</Text>
                <View style={styles.socialMediaLogosContainer}>
                  <Image
                    style={styles.socialMediaLogos}
                    source={require('app/assets/images/google.png')}
                  />
                  <Image
                    style={styles.socialMediaLogos}
                    source={require('app/assets/images/facebook.png')}
                  />
                  <Image
                    style={styles.socialMediaLogos}
                    source={require('app/assets/images/linkedin.png')}
                  />
                </View>
              </View>
              <View style={styles.joinContainer}>
                <Text style={styles.joinText}>Don't have an account yet?</Text>

                <TouchableHighlight
                  underlayColor={Colors.secondaryGradient}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signUpBtnText}> Sign Up </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#999999',
    fontSize: 12,
  },
  logoImage: {
    width: '50%',
    height: '100%',
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: '10%',
    marginTop: '10%',
  },
  gradient: {
    width: '100%',
    height: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  form: {
    flex: 7,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 21,
    marginVertical: 10,
  },
  inputLogo: {
    marginLeft: 15,
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
    marginRight: '5%',
    marginBottom: '5%',
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
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '5%',
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
  signUpBtnText: {
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
    marginBottom: 10,
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default SignInScreen;
