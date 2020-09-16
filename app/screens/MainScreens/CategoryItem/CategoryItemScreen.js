import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import {
  getCategoryItems,
  addQuantity,
  removeQuantity,
  addToCart,
} from 'app/actions/foodActions';
import Colors from '../../../constants/Colors';
import CartSheet from '../CartSheet/CartSheet';

const CategoryItemScreen = props => {
  const dispatch = useDispatch();
  const {
    itemsList: { loading, list },
    cartItems: { list: cartItemsList, loading: cartItemsLoading, total },
    itemsCount,
  } = useSelector(state => state.foodReducer);
  const [cartSheet, setCartSheet] = useState(false);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: list.name || 'Food Items',
      headerTitleAlign: 'center',
    });
  }, [props.navigation, list.name]);

  useEffect(() => {
    dispatch(getCategoryItems(props.route.params.itemId));
  }, [dispatch, props.route.params.itemId]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={Colors.primaryGradient} size={70} />
          </View>
        ) : (
          <View style={styles.container}>
            {list.foodList ? (
              list.foodList.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{
                      marginBottom: 10,
                      height: 100,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={styles.leftContainer}>
                      <ImageBackground
                        source={item.image}
                        resizeMode="cover"
                        style={styles.itemImage}>
                        <Image
                          resizeMode="contain"
                          style={styles.image}
                          source={
                            item.veg
                              ? require('app/assets/images/vegetarian.jpg')
                              : require('app/assets/images/nonveg.png')
                          }
                        />
                      </ImageBackground>
                      <View style={styles.titleContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>

                        <Text style={styles.amountText}>₹ {item.amount}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          flexDirection: 'row',
                          borderRadius: 10,
                          justifyContent: 'space-between',
                          width: '40%',
                          height: 28,
                          alignItems: 'center',
                        }}>
                        {item.quantity === 0 ? (
                          <View style={{ flex: 1 }}>
                            <TouchableOpacity
                              onPress={() => dispatch(addToCart(item))}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                              }}>
                              <Text>Add</Text>
                              <Icon
                                type="antdesign"
                                name="plus"
                                size={12}
                                style={{ backgroundColor: 'white' }}
                                color="red"
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <>
                            <View style={{ flex: 1 }}>
                              <TouchableOpacity
                                onPress={() =>
                                  dispatch(removeQuantity(item.id))
                                }>
                                <Icon
                                  type="antdesign"
                                  name="minus"
                                  size={12}
                                  style={{ backgroundColor: 'white' }}
                                  color="red"
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                }}>
                                {item.quantity}
                              </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <TouchableOpacity
                                onPress={() => dispatch(addQuantity(item.id))}>
                                <Icon
                                  type="antdesign"
                                  name="plus"
                                  size={12}
                                  style={{ backgroundColor: 'white' }}
                                  color="red"
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <ActivityIndicator color={Colors.primaryGradient} size={30} />
            )}
          </View>
        )}
      </ScrollView>
      {cartItemsList.length > 0 && !cartSheet ? (
        <TouchableOpacity
          onPress={() => setCartSheet(true)}
          style={{
            position: 'absolute',
            bottom: 5,
            width: '90%',
            alignSelf: 'center',
            height: 50,
            backgroundColor: Colors.primaryGradient,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',

            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 3,
              }}>
              {itemsCount} Item(s)
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 3,
                fontWeight: 'bold',
              }}>
              ₹{total}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 3,
                fontWeight: 'bold',
              }}>
              View Cart
            </Text>
            <Icon
              type="antdesign"
              name="right"
              size={15}
              color="white"
              style={{ marginLeft: 3 }}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      {cartSheet && (
        <CartSheet setCartSheet={setCartSheet} navigation={props.navigation} />
      )}
    </View>
  );
};

export default CategoryItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemImage: { width: 80, height: '80%', borderRadius: 20 },
  image: {
    height: 10,
    width: 10,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5,
  },
  itemName: {
    fontSize: 16,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  titleContainer: {
    marginLeft: 10,
  },
  amountText: {
    marginTop: 5,
    fontSize: 12,
  },
});
