import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from 'react-native-simple-time-picker';
import { Button } from 'react-native-elements';
import moment from 'moment';
import Colors from '../../../constants/Colors';
import { bookTable } from 'app/actions/bookingActions';
import { addUserBookings } from 'app/actions/user';
import { emptyCart } from 'app/actions/foodActions';

const CheckoutScreen = props => {
  const {
    foodReducer: { cartItems },
    bookingReducer,
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const [date, setDate] = useState(Date.now());
  const [startTime, setStartTime] = useState({
    selectedHours: 0,
    selectedMinutes: 0,
  });
  const [endTime, setEndTime] = useState({
    selectedHours: 0,
    selectedMinutes: 0,
  });
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [beforeDateError, setbeforeDateError] = useState('');
  const [dateAndTimeShow, setdateAndTimeShow] = useState();
  useEffect(() => {
    if (startTime.selectedHours >= endTime.selectedHours) {
      setTimeError(true);
    } else {
      setTimeError(false);
    }
  }, [endTime, startTime]);

  const checkIfDateIsValid = () => {
    const currentTable = bookingReducer.bookedTables.find(
      table => table.tableNum === props.route.params.table[0].tableNum,
    );
    if (currentTable) {
      const isValid = currentTable.timings.find(item => {
        if (
          item.date === moment(date).format('YYYY-MM-DD') &&
          item.from ===
            moment(
              `${startTime.selectedHours}:${startTime.selectedMinutes}`,
              'HH:mm',
            ).format('HH:mm:ss') &&
          item.till ===
            moment(
              `${endTime.selectedHours}:${endTime.selectedMinutes}`,
              'HH:mm',
            ).format('HH:mm:ss')
        ) {
          return item;
        }
      });
      return isValid;
    }
    return false;
  };
  const renderFoodItems = () => {
    if (cartItems.list.length < 1) {
      return null;
    }

    return cartItems.list.map(item => (
      <View style={styles.itemsView} key={item.id}>
        <View style={styles.itemNameView}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.quantityView}>
          <Text>{item.quantity} X</Text>
          <Text> {item.amount}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {cartItems.list.length > 0 && (
          <>
            <Text style={styles.titleText}>Your Order</Text>
            <ScrollView style={styles.itemsContainer}>
              {renderFoodItems()}
            </ScrollView>
          </>
        )}

        <View style={styles.tableContainer}>
          <Text style={styles.tableNumTitle}>Table Number: </Text>
          <Text style={styles.tableNum}>
            {props.route.params.table[0].tableNum}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <View style={styles.selectedContainer}>
            <Button
              onPress={() => setshowDatePicker(true)}
              containerStyle={styles.dateBtnContainer}
              buttonStyle={styles.button}
              title="Select Date"
            />
            {dateAndTimeShow && (
              <Text style={styles.dateAndTimeText}>
                {
                  moment(date)
                    .format('MMMM Do YYYY, h:mm a')
                    .split(', ')[0]
                }
              </Text>
            )}
          </View>
          <View style={{ marginVertical: 6 }}>
            <Text style={[styles.labelText]}>From</Text>
            <TimePicker
              selectedHours={startTime.selectedHours}
              selectedMinutes={startTime.selectedMinutes}
              onChange={(hours, minutes) =>
                setStartTime({
                  selectedHours: hours,
                  selectedMinutes: minutes,
                })
              }
            />
            <Text style={[styles.labelText]}>Till</Text>
            <TimePicker
              selectedHours={endTime.selectedHours}
              selectedMinutes={endTime.selectedMinutes}
              onChange={(hours, minutes) =>
                setEndTime({ selectedHours: hours, selectedMinutes: minutes })
              }
            />
            <View style={{ marginVertical: 10, alignItems: 'center' }}>
              <Text style={styles.dateAndTimeText}>
                From :{'  '}
                {moment(
                  `${startTime.selectedHours}:${startTime.selectedMinutes}`,
                  'hh:mm',
                ).format('LT')}{' '}
                To:{' '}
                {moment(
                  `${endTime.selectedHours}:${endTime.selectedMinutes}`,
                  'hh:mm',
                ).format('LT')}
              </Text>
            </View>
            <Text style={{ color: 'red', textAlign: 'center' }}>
              {timeError && "Closing Hours Can't Be Less Than Opening Hours"}
            </Text>
          </View>

          <View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={(event, newDate) => {
                  if (event.type === 'dismissed') {
                    setshowDatePicker(false);
                    setdateAndTimeShow(false);
                    return;
                  }
                  if (moment(newDate).isSameOrBefore(moment(Date.now()))) {
                    setshowDatePicker(false);
                    setbeforeDateError('Invalid Date');
                    setdateAndTimeShow(false);
                    return;
                  }
                  setshowDatePicker(false);
                  setbeforeDateError('');
                  setDate(newDate);
                  setdateAndTimeShow(true);
                }}
              />
            )}
          </View>
        </View>
        <Text style={styles.invalidDateError}>
          {beforeDateError && beforeDateError}
        </Text>
        {cartItems.list.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.grandTotal}>Grand Total </Text>
            <Text style={styles.total}> ₹ {cartItems.total}</Text>
          </View>
        )}

        <Button
          title="Book Table"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnColor}
          disabled={!dateAndTimeShow || timeError}
          onPress={() => {
            const eventDate = moment(date).format('YYYY-MM-DD');
            const fromHrs = moment(
              `${startTime.selectedHours}:${startTime.selectedMinutes}`,
              'HH:mm',
            ).format('HH:mm:ss');
            const ToHrs = moment(
              `${endTime.selectedHours}:${endTime.selectedMinutes}`,
              'HH:mm',
            ).format('HH:mm:ss');

            if (checkIfDateIsValid()) {
              setbeforeDateError(
                'This Table Is Already Taken At This Time And Date',
              );
              return;
            }
            setbeforeDateError('');

            dispatch(
              bookTable(
                props.route.params.table[0].tableNum,
                {
                  date: eventDate,
                  from: fromHrs,
                  till: ToHrs,
                },
                props.route.params.tableType,
              ),
            );
            dispatch(emptyCart());
            dispatch(
              addUserBookings(
                props.route.params.table[0],
                {
                  date: eventDate,
                  from: fromHrs,
                  till: ToHrs,
                },
                props.route.params.tableType,
              ),
            );
            props.navigation.navigate('Order');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  titleText: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemsView: {
    // flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  itemNameView: {
    flexDirection: 'row',
  },
  quantityView: {
    flexDirection: 'row',
  },
  itemsContainer: {
    flex: 1,
    marginVertical: 10,
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    padding: 5,
    marginVertical: 4,
  },
  tableNumTitle: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  tableNum: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  selectText: {
    fontSize: 16,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dateBtnContainer: {
    width: '100%',
  },
  dateAndTimeView: {
    flexDirection: 'row',
  },
  selectedContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
  },
  dateAndTimeText: {
    fontSize: 15,
    lineHeight: 17,
    marginTop: 5,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primaryGradient,
    borderRadius: 20,
  },
  btnContainer: {
    marginTop: 10,
    width: '90%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  btnColor: {
    backgroundColor: Colors.primaryGradient,
    borderRadius: 20,
  },
  invalidDateError: {
    fontSize: 16,
    lineHeight: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
  labelText: {
    fontFamily: 'Signika-Regular',
    paddingTop: 1,
    color: '#555555',
    fontSize: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CheckoutScreen;
