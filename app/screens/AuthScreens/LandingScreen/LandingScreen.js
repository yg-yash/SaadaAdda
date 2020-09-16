import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Colors from '../../../constants/Colors';

export default function LandingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.linearGradient}>
          <StatusBar backgroundColor={Colors.secondaryGradient} />
          <View style={styles.card}>
            <Image
              source={require('app/assets/images/icon.jpg')}
              style={styles.backgroundImage}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s when
            </Text>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('SignUp')}>
              <View style={styles.joinBtn}>
                <Text style={styles.titleStyle}>Sign Up !</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.signUp}>
            <Text style={styles.joinText}>Already Joined?</Text>
            <TouchableHighlight
              underlayColor={Colors.secondaryGradient}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpBtnText}> Sign In </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  linearGradient: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 8,
    overflow: 'hidden',
    paddingBottom: 30,
    backgroundColor: Colors.mainColor,
  },
  card: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 250,
    height: 180,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinBtn: {
    marginTop: '10%',
    width: 220,
    height: 50,
    borderRadius: 50,
    borderColor: Colors.btnColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
    letterSpacing: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 21,
    textAlign: 'center',
  },
  signUp: {
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
  signUpBtnText: {
    color: Colors.btnColor,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    marginHorizontal: '15%',
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});
