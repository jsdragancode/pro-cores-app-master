import React, {Component, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView, FlatList,
    TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
  
let converterState = 2
let currentState = 2
let listState = 2

const SearchResultsScreen = (props) => {
  const [ pricing, setPricing ] = useState(props.pricing)
  const [ pricing_est, setPricing_est ] = useState(props.pricing_est)
  const [ rate, setRate ] = useState(props.convertRate)

  const x = props.searchResults.map((u, i) => {
    let currentPrice = numeral((u.fixed_cost + u.pt * pricing.pt + u.pl * pricing.pd + u.rh * pricing.rh) * rate / 100);
    let listPrice = numeral((u.fixed_cost + u.pt * pricing_est.pt + u.pl * pricing_est.pd + u.rh * pricing_est.rh) * rate / 100);

    return {
      ...u,
      currentPrice,
      listPrice,
      currentPriceText : currentPrice.format('($0,00.00)'),
      listPriceText : listPrice.format('($0,00.00)')
    }
  });

  const [ data, setData ] = useState(x)
  const [ check, setCheck ] = useState('#1-first')

  const onPressConverter = () => {
    if(converterState == 2) {
      setData(data.sort((a,b) => {
        return b.identifier > a.identifier
      }))
      converterState = 1
      currentState = 2
      listState = 2
      setCheck('#0-start-0')
    } else if(converterState == 0) {
      setData(data.sort((a,b) => {
        return b.identifier > a.identifier
      }))
      converterState = 1
      currentState = 2
      listState = 2
      setCheck('#0-start-0')
    } else if(converterState == 1) {
      setData(data.sort((a,b) => {
        return b.identifier < a.identifier
      }))
      converterState = 0
      currentState = 2
      setCheck('#0-start-1')
    }
    console.log(converterState)
   };

  const onPressCurrentPrice = () => {
    if(currentState == 2) {
      setData(data.sort((a,b) => {
        return b.currentPrice._input - a.currentPrice._input
      }))
      currentState = 1
      listState = 2
      converterState = 2
      setCheck('#2-second-0')
    } else if(currentState == 0) {
      setData(data.sort((a,b) => {
        return b.currentPrice._input - a.currentPrice._input
      }))
      currentState = 1
      listState = 2
      converterState = 2
      setCheck('#2-second-0')
    } else if(currentState == 1) {
      setData(data.sort((a,b) => {
        return a.currentPrice._input - b.currentPrice._input
      }))
      currentState = 0
      listState = 2
      converterState = 2
      setCheck('#2-second-1')
    }
    console.log(currentState)
  };

  const onPressListPrice = () => {
    if(listState == 2) {
      setData(data.sort((a,b) => {
        listState = 1
        currentState = 2
        converterState = 2
        return b.listPrice._input - a.listPrice._input
      }))
      
      setCheck('#3-third-0')
    } else if(listState == 0) {
      setData(data.sort((a,b) => {
        listState = 1
        currentState = 2
        converterState = 2
        return b.listPrice._input - a.listPrice._input
      }))
      
      setCheck('#3-third-0')
    } else if(listState == 1) {
      listState = 0
      currentState = 2
      converterState = 2
      setData(data.sort((a,b) => {
        return a.listPrice._input - b.listPrice._input
      }))
      
      setCheck('#3-third-1')
    }
    console.log("listPrice Pressed")
    console.log(listState)
  };

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
        <ScrollView
        horizontal
        bounces={false}
        contentContainerStyle={{width: 700, backgroundColor: 'gold'}}
        >
          <View style={{width: 700}}>
            <TouchableOpacity style={styles.cardTitle}>
              <View style={styles.textView}>
              { (converterState == 2) &&
                <Text style={styles.cardTextTitle} onPress={onPressConverter}>Converter</Text>
              }  
              { (converterState == 1) &&
                <Text style={styles.cardTextTitle} onPress={onPressConverter}><AntDesign name="caretdown" size={20} color="black"/>Converter</Text>
              }
              { (converterState == 0) &&
                <Text style={styles.cardTextTitle} onPress={onPressConverter}><AntDesign name="caretup" size={20} color="black"/>Converter</Text>
              }
              { (currentState == 2) &&
                <Text style={styles.cardPriceTitle} onPress={onPressCurrentPrice}>Current Price</Text>
              }
              { (currentState == 1) &&
                <Text style={styles.cardPriceTitle} onPress={onPressCurrentPrice}><AntDesign name="caretdown" size={20} color="black"/>Current Price</Text>
              }
              { (currentState == 0) &&
                <Text style={styles.cardPriceTitle} onPress={onPressCurrentPrice}><AntDesign name="caretup" size={20} color="black" />Current Price</Text>
              }
              { (listState == 2) &&
                <Text style={styles.cardPriceTitle} onPress={onPressListPrice}>List Price</Text>
              }
              { (listState == 1) &&
                <Text style={styles.cardPriceTitle} onPress={onPressListPrice}><AntDesign name="caretdown" size={20} color="black"/>List Price</Text>
              }
              { (listState == 0) &&
                <Text style={styles.cardPriceTitle} onPress={onPressListPrice}><AntDesign name="caretup" size={20} color="black" />List Price</Text>
              }
              </View>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.resultsContainer}>
              {
                data.map((u, i) => {
                  return (    
                    <TouchableOpacity key={i} style={styles.card}>
                      <View style={styles.textView}>
                        <Text style={styles.cardText}>{u.identifier}</Text>
                        { (u.currentPrice._input > u.listPrice._input) &&
                          <Text style={styles.cardPriceGreen}>{u.currentPriceText}</Text>
                        }

                        { (u.currentPrice._input < u.listPrice._input) &&
                          <Text numberOfLines={2} style={styles.cardPriceRed}>{u.currentPriceText}</Text>
                        }

                        { (u.currentPrice._input == u.listPrice._input) &&
                          <Text numberOfLines={2} style={styles.cardPrice}>{u.currentPriceText}</Text>
                        }
                        <Text numberOfLines={2} style={styles.cardPrice}>{u.listPriceText}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView> 
          </View>
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
    resultsTitleContainer: {
      flexDirection: 'row',
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
    cardTitle: {
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 1,
      shadowRadius: 1,
      padding: 10,
      // margin: 10,
      width: 700,
      height: 40
    },  
    card: {
      // borderWidth: 1,
      // borderColor: '#e1e8ee',
      borderBottomWidth: 1,
      borderBottomColor: '#e1e8ee',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 1,
      shadowRadius: 1,
      padding: 10,
      margin: 10,
      width: 700,
      height: 50
    },
    textView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardTextTitle: {
      fontSize: 20,
      fontWeight: "500",
      width: 400,
      height: 50

    },
    cardText: {
      //fontSize: 20,
      fontSize: 17,
    //  width: (DEVICE_WIDTH - 70) * 3 / 5,
      //alignSelf: 'flex-start',
      //flex: 6,
      width: 400
    },
    cardPriceTitle: {
      fontSize: 20,
      fontWeight: "500",
      width: 150,
      height: 50
    },
    cardPrice: {
    //  width: (DEVICE_WIDTH - 70) * 2 / 5,
      // fontSize: 20,
      fontSize: 16,
      // fontWeight: "500",
      // width: '30%'
      width: 150
      //alignSelf: 'flex-end',
      //flex: 4,
    },
    cardPriceGreen: {
        fontSize: 16,
        width: 150,
        color: 'green'

    },
    cardPriceRed: {
      fontSize: 16,
      width: 150,
      color: 'red'
    }
  });

  export default SearchResultsScreen