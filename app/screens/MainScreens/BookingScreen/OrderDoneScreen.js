import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';

const OrderDoneScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image
          source={require('app/assets/images/orderdone.png')}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.confirmText}>Your Table Booking Has Confirmed</Text>
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          width: '100%',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.popToTop()}>
          <LinearGradient
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 0 }}
            colors={[Colors.primaryGradient, Colors.secondaryGradient]}
            style={styles.gradient}>
            <Text style={styles.btnText}>Thank You !</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default OrderDoneScreen;

const styles = StyleSheet.create({
  confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  gradient: {
    width: '85%',
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
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
