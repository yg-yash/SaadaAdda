import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card } from 'react-native-elements';

const ReservationScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <TouchableWithoutFeedback>
          <Card
            containerStyle={styles.card}
            image={require('app/assets/images/reservation.jpg')}
            imageProps={{ resizeMode: 'cover' }}
            imageStyle={styles.image}
            featuredTitle="Reservations"
            featuredTitleStyle={styles.subtitle}
            featuredSubtitleStyle={styles.featuredSubtitle}
            featuredSubtitle="Book Party Hall"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Booking')}>
          <Card
            containerStyle={styles.card}
            image={require('app/assets/images/banquethall.jpg')}
            imageProps={{ resizeMode: 'cover' }}
            imageStyle={styles.image}
            featuredTitle="Table Booking"
            featuredTitleStyle={styles.subtitle}
            featuredSubtitleStyle={styles.featuredSubtitle}
            featuredSubtitle="Book Your Table"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('CouplesBooking')}>
          <Card
            containerStyle={styles.card}
            image={require('app/assets/images/coupletable.jpg')}
            imageProps={{ resizeMode: 'cover' }}
            imageStyle={styles.image}
            featuredTitle="Couple Tables"
            featuredTitleStyle={styles.subtitle}
            featuredSubtitleStyle={styles.featuredSubtitle}
            featuredSubtitle="Enjoy Your Meal With The Happy One"
          />
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, marginBottom: 10 },
  horizontalCard: {
    marginTop: 5,
    width: '100%',
    height: 150,
    borderRadius: 15,
    padding: '1%',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  card: {
    borderRadius: 15,
    height: 250,
  },
  image: {
    height: 250,
    borderRadius: 10,
  },
  featuredSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  subtitle: { fontSize: 30 },
});
