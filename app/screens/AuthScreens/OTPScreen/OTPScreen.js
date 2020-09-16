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
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const {
    loadingReducer: { isOTPLoading },
    loginReducer: { otpError: error },
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const validateOtp = () => {
    if (!otp) {
      setOtpError('Otp Is Required');
      return true;
    }
    if (otp.length < 6) {
      setOtpError('Otp Must be 6 characters');
      return true;
    }
    setOtpError('');
    return false;
  };
  const onSubmit = () => {
    if (validateOtp()) {
      return;
    }
    dispatch(loginActions.requestOTP(route.params, otp));
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
          <Text style={styles.signInText}>
            Hey {route.params},{'\n'}Recieved Your OTP?
          </Text>
          <Text style={styles.secondaryText}>
            Fill In And Enter To Our World.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon
              name="confirmation-number"
              size={18}
              style={styles.inputLogo}
            />
            <TextInput
              value={otp}
              placeholder="Enter  OTP"
              onChangeText={text => setOtp(text)}
              style={styles.input}
              keyboardType="number-pad"
              onEndEditing={validateOtp}
              maxLength={6}
            />
          </View>
          {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotText}>Resend OTP</Text>
          </View>
          {error ? (
            <Text style={[styles.errorText, { alignSelf: 'center' }]}>
              {error}
            </Text>
          ) : null}
          <TouchableWithoutFeedback onPress={onSubmit}>
            <LinearGradient
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 0 }}
              colors={[Colors.primaryGradient, Colors.secondaryGradient]}
              style={styles.gradient}>
              {isOTPLoading ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Text style={styles.btnText}>Here WE GO ! </Text>
              )}
            </LinearGradient>
          </TouchableWithoutFeedback>
          <View style={styles.joinContainer}>
            <Text style={styles.joinText}>Already A User?</Text>
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
  secondaryText: { width: '80%', fontSize: 16, marginTop: '3%' },
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
    marginVertical: 10,
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
    marginBottom: 10,
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
});

export default OTPScreen;
