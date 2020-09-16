import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Icon, Card, Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getNormalTables, setNormalTables } from 'app/actions/tables';

const BookingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedtable, setSelectedtable] = useState([]);
  const {
    normalTables: { tables, loading },
  } = useSelector(state => state.tablesReducer);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'Table Booking',
    });
  }, [navigation]);

  useEffect(() => {
    const table = tables.filter(item => item.selected && item);
    setSelectedtable(table);
  }, [tables, setSelectedtable]);

  useEffect(() => {
    dispatch(getNormalTables());
  }, [dispatch]);

  const toggleSelected = item => {
    const newTables = tables.map(table => {
      if (table.tableNum === item.tableNum) {
        if (table.avaliable === true) {
          if (table.selected === true) {
            table.selected = false;
          } else {
            table.selected = true;
          }
        }
      }
      return table;
    });
    dispatch(setNormalTables(newTables));
  };

  const renderTables = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => toggleSelected(item)}
        disabled={
          selectedtable.length > 0 &&
          item.tableNum !== selectedtable[0].tableNum
        }>
        <View style={styles.tableContainer}>
          <Text>Table No. {item.tableNum}</Text>
          <Card
            containerStyle={[
              styles.tableCard,
              {
                backgroundColor: item.avaliable
                  ? item.selected
                    ? Colors.primaryGradient
                    : Colors.availableTableColor
                  : Colors.occupiedTableColor,
              },
            ]}>
            <View style={styles.firstSeatRow}>
              <MaterialIcons name="event-seat" size={25} color="white" />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name="event-seat"
                size={25}
                color="white"
                style={{ transform: [{ rotate: '-90deg' }] }}
              />
              <Icon type="font-awesome" name="circle" size={25} color="white" />
              <MaterialIcons
                name="event-seat"
                size={25}
                color="white"
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </View>
            <View style={styles.lastSeatRow}>
              <MaterialIcons
                name="event-seat"
                size={25}
                color="white"
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.instructionsContainer}>
        <View style={styles.instructions}>
          <View
            style={[
              styles.instructionsItem,
              {
                backgroundColor: Colors.availableTableColor,
              },
            ]}
          />
          <Text style={styles.instructionsText}>Available</Text>
        </View>
        <View style={styles.instructions}>
          <View
            style={[
              styles.instructionsItem,
              {
                backgroundColor: Colors.occupiedTableColor,
              },
            ]}
          />
          <Text style={styles.instructionsText}>Occupied</Text>
        </View>
        <View style={styles.instructions}>
          <View
            style={[
              styles.instructionsItem,
              {
                backgroundColor: Colors.primaryGradient,
              },
            ]}
          />
          <Text style={styles.instructionsText}>Selected</Text>
        </View>
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color={Colors.primaryGradient} size={30} />
        ) : (
          <FlatList
            data={tables}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={item => item.tableNum.toString()}
            renderItem={({ item, index }) => renderTables(item)}
          />
        )}
      </View>

      <TouchableWithoutFeedback
        disabled={selectedtable.length < 1}
        onPress={() =>
          navigation.navigate('Checkout', {
            table: selectedtable,
            tableType: 'normal',
          })
        }>
        <LinearGradient
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.primaryGradient, Colors.secondaryGradient]}
          style={styles.gradient}>
          <Text style={styles.btnText}>Book Table</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    borderWidth: 1,
    flex: 1,
    borderColor: '#999999',
    borderRadius: 50,
    marginVertical: '4%',
  },
  tableContainer: {
    marginVertical: '4%',
    flex: 1,
    alignItems: 'center',
  },
  tableCard: {
    width: 150,
    height: 150,
    borderRadius: 50,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructions: { flexDirection: 'row', justifyContent: 'space-between' },
  instructionsText: { marginLeft: 5 },
  firstSeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastSeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '90%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  btnColor: {
    backgroundColor: Colors.primaryGradient,
    borderRadius: 20,
  },
  instructionsItem: {
    height: 20,
    width: 20,
  },
  gradient: {
    width: '80%',
    height: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
export default BookingScreen;
