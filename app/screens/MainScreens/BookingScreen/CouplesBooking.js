import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import { getCouplesTables, setCoupleTables } from 'app/actions/tables';

const CouplesBooking = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    coupleTables: { tables, loading },
  } = useSelector(state => state.tablesReducer);
  const [selectedtable, setSelectedtable] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'Couples Booking',
    });
  }, [navigation]);
  useEffect(() => {
    dispatch(getCouplesTables());
  }, [dispatch]);

  useEffect(() => {
    const table = tables.filter(item => item.selected && item);
    setSelectedtable(table);
  }, [tables, setSelectedtable]);

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
    dispatch(setCoupleTables(newTables));
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
            <View style={styles.seatRow}>
              <MaterialIcons name="event-seat" size={25} color="white" />
            </View>
            <View style={styles.seatRow}>
              <Icon type="font-awesome" name="circle" size={25} color="white" />
            </View>
            <View
              style={[
                styles.seatRow,
                {
                  transform: [{ rotate: '180deg' }],
                },
              ]}>
              <MaterialIcons name="event-seat" size={25} color="white" />
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
              { backgroundColor: Colors.availableTableColor },
            ]}
          />
          <Text style={styles.instructionsText}>Available</Text>
        </View>
        <View style={styles.instructions}>
          <View
            style={[
              styles.instructionsItem,
              { backgroundColor: Colors.occupiedTableColor },
            ]}
          />
          <Text style={styles.instructionsText}>Occupied</Text>
        </View>
        <View style={styles.instructions}>
          <View
            style={[
              styles.instructionsItem,
              { backgroundColor: Colors.primaryGradient },
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
            tableType: 'couples',
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
  instructionsItem: { height: 20, width: 20 },
  instructions: { flexDirection: 'row', justifyContent: 'space-between' },
  instructionsText: { marginLeft: 5 },
  btnContiner: {
    width: '90%',

    alignSelf: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.primaryGradient,
    borderRadius: 20,
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

export default CouplesBooking;
