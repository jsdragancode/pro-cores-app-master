import React, {Component, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView, FlatList,
    TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import numeral from 'numeral';

const SearchResultsScreen = (props) => {
  console.log(props.pricing)
  const [ data, setData ] = useState(props.searchResults)
  const [ pricing, setPricing ] = useState(props.pricing)
  const [ rate, setRate ] = useState(props.convertRate)


  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <View >
          <TouchableOpacity style={styles.navbarItems} onPress={() => Actions.pop()}>
            <FontAwesomeIcon icon={ faChevronLeft } size={25}/>
            <Text style={styles.textTitle}>Search Results</Text>
          </TouchableOpacity>
        </View>
      </View>

      {data.length > 0 ? <>
        <View style={styles.resultsNumberContainer}>
          <Text style={styles.resultsText}>{data.length} converters</Text>
        </View>
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          {
            data.map((u, i) => {
              return (
                /*
                onPress={() => Actions.converterPage({data: u})}
                */
                <TouchableOpacity key={i} style={styles.card}>
                  <View style={styles.textView}>
                    <Text numberOfLines={1} style={styles.cardText}>{u.identifier}</Text>
                    <Text style={styles.cardPrice}>{numeral((u.fixed_cost + u.pt * pricing.pt + u.pl * pricing.pd + u.rh * pricing.rh) * rate / 100).format('($0,00.00)')}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView></> :
        <View style={styles.noResultsContainer}>

            <Text style={styles.noResultsText}>No Results Found</Text>
            <TouchableOpacity style={styles.noResultsButton} onPress={() => Actions.pop()}>
              <Text style={styles.noResultsButtonText}>Search Again</Text>
            </TouchableOpacity>


        </View>
      }

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
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 5
    },
    resultsText: {
      fontSize: 15
    },
    navbarContainer: {
      marginTop: 5,
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noResultsContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noResultsText: {
      color: 'grey',
      fontSize: 30,
      marginBottom: 8
    },
    noResultsButton: {
      backgroundColor: '#E9E9E9',
      borderRadius: 10,
      fontWeight:'bold',
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    noResultsButtonText: {
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 12,
      paddingBottom: 12,
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'center'
    },
    resultsNumberContainer: {
      flexDirection: 'row-reverse',
      width: DEVICE_WIDTH - 50,
      marginBottom: 10
    },
    navbarItems: {
      width: DEVICE_WIDTH - 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textTitle: {
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
    cardText: {
      fontSize: 20,
    //  width: (DEVICE_WIDTH - 70) * 3 / 5,
      //alignSelf: 'flex-start',
      //flex: 6,
      width: '70%'
    },
    cardPrice: {
    //  width: (DEVICE_WIDTH - 70) * 2 / 5,
      fontSize: 20,
      fontWeight: "500",
      width: '30%'
      //alignSelf: 'flex-end',
      //flex: 4,
    }
  });

  export default SearchResultsScreen
