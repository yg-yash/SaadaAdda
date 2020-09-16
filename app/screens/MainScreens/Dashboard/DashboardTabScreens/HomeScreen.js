import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import Colors from '../../../../constants/Colors';
import { Card, Avatar, Icon } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import ItemModal from './ItemModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMostPopular,
  getSliderList,
  getCategories,
  emptyCart,
} from 'app/actions/foodActions';
import CartSheet from '../../CartSheet/CartSheet';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [cartSheet, setCartSheet] = useState(false);
  const {
    foodReducer: {
      sliderImages: { loading: sliderLoading, list: sliderImages },
      mostPopular: { list: popularList, loading: popularLoading },
      categories: { list: categoriesList, loading: categoriesLoading },
      cartItems: { list: cartItemsList, loading: cartItemsLoading },
    },
  } = useSelector(state => state);
  const {
    bookingReducer: { recentBookings, recentBookingsLoading },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getMostPopular());
    dispatch(getSliderList());
    dispatch(getCategories());
  }, [dispatch]);

  const renderPopularItems = () => (
    <FlatList
      showsHorizontalScrollIndicator={false}
      numColumns={4}
      data={popularList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, index }) => _renderItem(item, index)}
    />
  );

  const [showItemModal, setShowItemModal] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const _renderItem = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setShowItemModal(true);
          setModalItem(item);
        }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.card}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Text style={{ fontSize: 12, textTransform: 'capitalize' }}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderHorizontalItem = item => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('CategoryItem', { itemId: item.id })}
      key={item.id}>
      <View style={styles.categoriesContainer}>
        <Card
          containerStyle={styles.categoriesCard}
          image={item.image}
          imageProps={{ resizeMode: 'cover' }}
          imageStyle={styles.categoriesImageStyle}
          featuredTitle={item.name}
          featuredTitleStyle={styles.categoriesTitle}
        />
      </View>
    </TouchableWithoutFeedback>
  );
  const handleClearCart = () =>
    Alert.alert(
      '',
      'Clear your cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Clear', onPress: () => dispatch(emptyCart()) },
      ],
      { cancelable: false },
    );

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }}>
        <Card containerStyle={styles.topContainer}>
          <View style={styles.topContainerView}>
            <Text style={styles.titleText}>Saada Adda</Text>
            <Avatar
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              size={45}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </Card>

        <View style={styles.sliderRow}>
          {sliderLoading ? (
            <ActivityIndicator
              color={Colors.primaryGradient}
              style={styles.loadingSpinner}
              size={50}
            />
          ) : (
            <SliderBox
              images={sliderImages}
              autoplay
              circleLoop
              dotColor={Colors.primaryGradient}
              imageLoadingColor={Colors.primaryGradient}
              ImageComponentStyle={styles.sliderCardImageStyle}
            />
          )}
        </View>
        <View style={styles.firstRow}>
          <Text style={styles.listTitle}>Most Popular !</Text>
          {popularLoading ? (
            <ActivityIndicator
              size={50}
              color={Colors.primaryGradient}
              style={styles.loadingSpinner}
            />
          ) : (
            <>{renderPopularItems()}</>
          )}
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.listTitle}>Categories</Text>
          {categoriesLoading ? (
            <ActivityIndicator
              size={50}
              color={Colors.primaryGradient}
              style={styles.loadingSpinner}
            />
          ) : (
            <>{categoriesList.map(item => renderHorizontalItem(item))}</>
          )}
        </View>
      </ScrollView>
      {showItemModal && (
        <ItemModal
          setModalVisible={setShowItemModal}
          modalVisible={showItemModal}
          item={modalItem}
        />
      )}

      {recentBookings.length > 0 && (
        <View
          style={[
            styles.reservationView,
            {
              bottom: cartItemsList.length < 1 ? 0 : 50,
              borderBottomWidth: cartItemsList.length < 1 ? 0 : 1,
            },
          ]}>
          <View style={styles.reservationPic}>
            <Avatar
              source={require('app/assets/images/reservation.jpg')}
              size={30}
              rounded
              containerStyle={styles.marginLeft}
            />
            <View style={styles.marginLeft}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 12,
                  alignSelf: 'center',
                }}>
                Your Reservation
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={{ color: Colors.primaryGradient, fontSize: 12 }}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cartItemsList.length > 0 && (
        <View style={styles.cartView}>
          <View style={styles.cartPic}>
            <Avatar
              source={cartItemsList[0].image}
              size={30}
              rounded
              containerStyle={styles.marginLeft}
            />
            <View style={styles.marginLeft}>
              <Text style={{ textTransform: 'capitalize', fontSize: 12 }}>
                {cartItemsList[0].name}
              </Text>
              <Text style={styles.savedtext}>
                You Have Items Saved In Your Cart
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setCartSheet(true)}>
              <Text style={{ color: Colors.primaryGradient, fontSize: 12 }}>
                View
              </Text>
            </TouchableOpacity>

            <Icon
              type="antdesign"
              name="close"
              size={10}
              raised
              style={styles.closeIcon}
              onPress={handleClearCart}
            />
          </View>
        </View>
      )}

      {cartSheet && (
        <CartSheet setCartSheet={setCartSheet} navigation={navigation} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  card: {
    marginTop: 5,
    height: 80,
    width: 80,
    borderRadius: 15,
    padding: '1%',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 3,
  },
  sliderCardImageStyle: { borderRadius: 15, width: '97%', marginTop: 5 },
  sliderCard: {
    marginTop: 5,
    height: 80,
    width: 80,
    borderRadius: 15,
    padding: '1%',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  sliderRow: { marginTop: 10, flex: 1 },
  horizontalCard: {
    marginTop: 5,
    width: '100%',
    height: 150,
    borderRadius: 15,
    padding: '1%',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  firstRow: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
    alignItems: 'center',
  },
  titleText: {
    marginLeft: 5,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
  },

  titleStyle: {
    color: 'black',
    letterSpacing: 2,
    fontSize: 10,
    textTransform: 'uppercase',
    lineHeight: 12,
    textAlign: 'center',
  },
  secondRow: {
    flex: 1,
    marginVertical: 25,
  },

  topContainer: {
    padding: 0,
    paddingHorizontal: '4%',
    marginVertical: '1%',
    marginHorizontal: '3%',

    borderRadius: 40,
    height: 60,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoriesContainer: {
    flex: 1,
    height: 150,
    marginBottom: '5%',
  },
  categoriesCard: {
    borderRadius: 10,
    height: '80%',
  },
  categoriesImageStyle: {
    height: '100%',
    borderRadius: 10,
  },
  categoriesTitle: {
    fontSize: 25,
  },
  loadingSpinner: { flex: 1, height: 200 },
  cartView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    opacity: 0.9,
  },
  cartPic: { flexDirection: 'row', justifyContent: 'space-between' },
  savedtext: {
    textTransform: 'capitalize',
    fontSize: 10,
    color: '#999999',
  },
  marginLeft: { marginLeft: 10 },
  sheetContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

    padding: 10,
  },
  listTitle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationView: {
    position: 'absolute',

    width: '100%',
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    opacity: 0.9,

    borderColor: '#999999',
  },
  reservationPic: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default HomeScreen;
