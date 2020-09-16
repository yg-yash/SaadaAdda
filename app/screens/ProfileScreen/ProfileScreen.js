import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Card, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import { Auth } from 'aws-amplify';

const ProfileScreen = () => {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await Auth.currentAuthenticatedUser();

  //     console.log(user);
  //   };
  //   getUser();
  // }, []);
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card containerStyle={styles.topContainer}>
        <View style={styles.profileDetails}>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={styles.userName}>Steve Watson</Text>
            <Text>9874561315</Text>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              size={100}
              containerStyle={{
                borderWidth: 2,
                borderColor: Colors.btnColor,
              }}
            />
          </View>
        </View>
        <View style={styles.actionsView}>
          <View>
            <Icon name="bookmark" type="feather" size={30} color="#999999" />
            <Text style={{ marginTop: '4%' }}>Bookmarks</Text>
          </View>
          <View>
            <Icon name="bell" type="feather" size={30} color="#999999" />
            <Text style={{ marginTop: '4%' }}>Notifications</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => dispatch(loginActions.logOut())}>
              <Icon name="log-out" type="feather" size={30} color="#999999" />
              <Text style={{ marginTop: '4%' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      <View style={styles.bottomCard}>
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.historyTitle}>History</Text>
          <Card containerStyle={styles.historyCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
              }}>
              <View style={styles.iconContainer}>
                <Fontisto name="room" size={20} color="white" />
              </View>
              <Text style={styles.foodItemText}>Banquet Hall</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Date</Text>
              <Text style={styles.smallText}>09 Jul 2020</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Amount</Text>
              <Text style={styles.smallText}>₹ 1000</Text>
            </View>
            <View
              style={{
                marginVertical: '1%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                flexDirection: 'row',
                paddingLeft: '3%',
                alignItems: 'center',
              }}>
              <Text style={styles.highText}>Rating: </Text>
              <Text style={styles.smallText}>4</Text>
            </View>
          </Card>
          <Card containerStyle={styles.historyCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
              }}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="food" size={20} color="white" />
              </View>
              <Text style={styles.foodItemText}>Burger</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Date</Text>
              <Text style={styles.smallText}>09 Jul 2020</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Amount</Text>
              <Text style={styles.smallText}>₹ 180</Text>
            </View>
            <View
              style={{
                marginVertical: '1%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                flexDirection: 'row',
                paddingLeft: '3%',
                alignItems: 'center',
              }}>
              <Text style={styles.highText}>Rating: </Text>
              <Text style={styles.smallText}>4</Text>
            </View>
          </Card>
          <Card containerStyle={styles.historyCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
              }}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="food" size={20} color="white" />
              </View>
              <Text style={styles.foodItemText}>Burger</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Date</Text>
              <Text style={styles.smallText}>09 Jul 2020</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Amount</Text>
              <Text style={styles.smallText}>₹ 180</Text>
            </View>
            <View
              style={{
                marginVertical: '1%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                flexDirection: 'row',
                paddingLeft: '3%',
                alignItems: 'center',
              }}>
              <Text style={styles.highText}>Rating: </Text>
              <Text style={styles.smallText}>4</Text>
            </View>
          </Card>
          <Card containerStyle={styles.historyCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2%',
              }}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="food" size={20} color="white" />
              </View>
              <Text style={styles.foodItemText}>Burger</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Date</Text>
              <Text style={styles.smallText}>09 Jul 2020</Text>
            </View>
            <View
              style={{
                marginVertical: '2%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                paddingLeft: '3%',
                justifyContent: 'center',
              }}>
              <Text style={styles.highText}>Amount</Text>
              <Text style={styles.smallText}>₹ 180</Text>
            </View>
            <View
              style={{
                marginVertical: '1%',
                width: '100%',
                borderTopWidth: 1,
                borderColor: 'rgba(153, 153, 153, 0.2)',
                flexDirection: 'row',
                paddingLeft: '3%',
                alignItems: 'center',
              }}>
              <Text style={styles.highText}>Rating: </Text>
              <Text style={styles.smallText}>4</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, marginBottom: 10 },
  topContainer: {
    flex: 1,
    borderRadius: 10,
    padding: '3%',
    margin: 0,
  },
  avatarContainer: {},
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomCard: {
    flex: 2,
    marginTop: 10,
    borderRadius: 10,

    paddingHorizontal: '5%',
  },
  userName: {
    fontSize: 24,
  },
  editProfile: {
    color: Colors.btnColor,
    fontWeight: 'bold',
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',

    paddingHorizontal: '3%',
  },
  historyCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    margin: 0,
    marginBottom: 10,
    padding: 0,
  },
  historyTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: '3%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  foodItemText: {
    fontSize: 20,
    marginLeft: '5%',
  },
  highText: {
    fontSize: 12,
    color: '#999999',
  },
  smallText: {
    fontSize: 15,
  },
});

export default ProfileScreen;
