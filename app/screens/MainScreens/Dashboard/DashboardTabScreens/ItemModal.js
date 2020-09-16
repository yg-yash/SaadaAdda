import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Icon } from 'react-native-elements';
import Colors from '../../../../constants/Colors';
import { useDispatch } from 'react-redux';
import { addToCart } from 'app/actions/foodActions';

const ItemModal = ({ modalVisible, setModalVisible, item }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.centeredView}>
      <Modal
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        animationIn="fadeInUp"
        animationInTiming={300}
        animationOutTiming={100}
        animationOut="fadeInDown"
        hideModalContentWhileAnimating={true}
        backdropColor="white"
        backdropOpacity={0}
        isVisible={modalVisible}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.closeIcon}>
            <Icon type="antdesign" name="close" size={25} />
          </TouchableOpacity>

          <Text style={styles.itemName}>{item.name}</Text>
          <Text>₹ 100</Text>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.image}
          />
          <Button
            title="Add To Cart"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              dispatch(addToCart(item));
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'space-between',

    alignItems: 'center',
    marginTop: 22,
  },
  card: {
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  itemName: {
    fontSize: 25,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  closeIcon: {
    flex: 1,
    alignSelf: 'flex-end',
    right: 20,
    top: 10,
  },
  image: {
    width: '50%',
    height: '50%',
    flex: 4,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primaryGradient,
    borderRadius: 20,
  },
  buttonContainer: { width: '80%', flex: 1, marginTop: 20 },
});
