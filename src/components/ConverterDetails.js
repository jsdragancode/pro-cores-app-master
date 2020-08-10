import React, {Component, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView, FlatList,
    TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const SearchResultsScreen = (props) => {
  const [ data, setData ] = useState(props.data)

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <View >
          <TouchableOpacity style={styles.navbarItems} onPress={() => Actions.pop()}>
            <FontAwesomeIcon icon={ faChevronLeft } size={25}/>
            <Text style={styles.pageTitle}>Converter Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <View style={styles.resultsContainerRow}>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Identifier</Text>
            <Text style={styles.textContent}>{data.identifier}</Text>
          </View>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Market Price</Text>
            <Text style={styles.textContent}>${data.converter_price}</Text>
          </View>
        </View>
        <View style={styles.resultsContainerRow}>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Platinum</Text>
            <Text style={styles.textContent}>{data.platinum} ppm</Text>
          </View>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Palladium</Text>
            <Text style={styles.textContent}>{data.palladium} ppm</Text>
          </View>

        </View>
        <View style={styles.resultsContainerRow}>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Rhodium</Text>
            <Text style={styles.textContent}>{data.rhodium} ppm</Text>
          </View>
          <View style={styles.resultsContainerRowComponent}>
            <Text style={styles.textTitle}>Weight</Text>
            <Text style={styles.textContent}>{data.weight} lbs</Text>
          </View>
        </View>
        <View style={styles.resultsContainerRow}>
          <View style={styles.resultsContainerRowComponentNotes}>
            <Text style={styles.textTitle}>Notes</Text>
            <Text style={styles.textContent}>{data.notes}</Text>
          </View>
        </View>
      </View>
    </View>
  )

}

  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    resultsContainer: {
      width: DEVICE_WIDTH - 50,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 50
    },
    resultsContainerRow: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 20,
      //flex: 1,
      width: DEVICE_WIDTH - 50,
    },
    resultsContainerRowComponent: {
      width: (DEVICE_WIDTH - 50) / 2
    },
    resultsContainerRowComponentNotes: {
      width: DEVICE_WIDTH - 50
    },
    navbarContainer: {
      marginTop: 15,
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navbarItems: {
      width: DEVICE_WIDTH - 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    pageTitle: {
      color: 'black',
      fontWeight: 'bold',
      marginLeft: 20,
      fontSize: DEVICE_WIDTH / 12,
      },
    card: {
      borderWidth: 1,
      borderColor: '#e1e8ee',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 1,
      shadowRadius: 1,
      padding: 10,
      margin: 10,
      width: DEVICE_WIDTH - 50,
      height: 50
    },
    textView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textContent: {
      fontSize: 20,
    //  width: (DEVICE_WIDTH - 70) * 3 / 5,
      //alignSelf: 'flex-start',
      //flex: 6,
    },
    textTitle: {
    //  width: (DEVICE_WIDTH - 70) * 2 / 5,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 5
      //alignSelf: 'flex-end',
      //flex: 4,
    }
  });

  export default SearchResultsScreen
