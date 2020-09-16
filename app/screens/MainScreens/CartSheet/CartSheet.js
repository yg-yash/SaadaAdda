import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Button } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import DropDown from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, removeQuantity } from 'app/actions/foodActions';

const CartSheet = ({ setCartSheet, navigation }) => {
  const [tableType, setTableType] = useState('normal');
  const {
    cartItems: { list: cartItemsList, loading: cartItemsLoading, total },
  } = useSelector(state => state.foodReducer);
  const dispatch = useDispatch();

  const renderHeader = () => (
    <View style={styles.sheetHeaderContainer}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          type="antdesign"
          name="shoppingcart"
          size={10}
          color={Colors.primaryGradient}
          raised
        />
        <Text style={styles.deliverAtText}>Cart</Text>
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.sheetContainer}>
      <View style={styles.contentView}>
        {cartItemsLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={Colors.primaryGradient} size={30} />
          </View>
        ) : (
          <FlatList
            data={cartItemsList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderCart(item)}
            ListEmptyComponent={renderListEmpty}
            showsVerticalScrollIndicator={false}
          />
        )}
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', flex: 1.5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>
              Grand Total:
            </Text>

            {cartItemsLoading ? (
              <ActivityIndicator color={Colors.primaryGradient} size={20} />
            ) : (
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                ₹ {total}
              </Text>
            )}
          </View>
          <DropDown
            items={[
              {
                label: 'Normal Table',
                value: 'normal',
              },
              {
                label: 'Couples Table',
                value: 'couples',
              },
            ]}
            zIndex={10}
            defaultValue={tableType}
            containerStyle={{ height: 40, flex: 1 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setTableType(item.value)}
          />
        </View>
        <View>
          <Button
            onPress={() =>
              navigation.navigate(
                tableType === 'normal' ? 'Booking' : 'CouplesBooking',
              )
            }
            title="Book Table"
            buttonStyle={{
              backgroundColor: Colors.primaryGradient,
              borderRadius: 20,
            }}
            loading={cartItemsLoading}
            disabled={cartItemsList.length < 1}
          />
        </View>
      </View>
    </View>
  );
  const renderListEmpty = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('app/assets/images/emptycart.png')}
        style={{ width: '70%', height: 250 }}
        resizeMode="cover"
      />
    </View>
  );

  const renderCart = item => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        paddingVertical: 10,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={
              item.veg
                ? require('app/assets/images/vegetarian.jpg')
                : require('app/assets/images/nonveg.png')
            }
            resizeMode="contain"
            style={{ width: 10, height: 10 }}
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                textTransform: 'capitalize',
                marginLeft: 10,
              }}>
              {item.name}
            </Text>
            <View style={{ marginLeft: 10 }}>
              <Text>₹{item.amount}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
            borderRadius: 10,
            justifyContent: 'space-between',
            width: '30%',
            height: 28,

            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => dispatch(removeQuantity(item.id))}>
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
            <TouchableOpacity onPress={() => dispatch(addQuantity(item.id))}>
              <Icon
                type="antdesign"
                name="plus"
                size={12}
                style={{ backgroundColor: 'white' }}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet
      snapPoints={['70%', 300, 0]}
      renderContent={renderContent}
      renderHeader={renderHeader}
      onCloseEnd={() => setCartSheet(false)}
      initialSnap={0}
      enabledBottomInitialAnimation={true}
    />
  );
};

export default CartSheet;

const styles = StyleSheet.create({
  sheetHeaderContainer: {
    flex: 1,
    backgroundColor: Colors.primaryGradient,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  deliverAtText: { color: 'white' },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressView: { flexDirection: 'row', alignItems: 'center' },
  addressText: { color: 'white', fontSize: 12 },
  contentView: { backgroundColor: 'white', flex: 1, padding: 20 },
  sheetContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
