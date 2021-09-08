/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import  { Marker } from 'react-native-maps';
import axios from 'axios';


export default class App extends React.Component
{

  constructor(){
    super();
    this.state = {
      events:[],
      loading:true
    }
  }

  componentDidMount() {

    const url = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
    axios.get(url).then((res) => {
      this.setState({
        events:res.data.events,
        loading:false
      })      
    })
    .catch((e) =>{
      console.log(e)
    })
  }

  render(){

    const {loading,events} = this.state;

    return(
      
      <SafeAreaView style={{flex:1}}>
        {loading 
        ? 
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}><Text style={{fontWeight:"700",fontSize:25}}>Loading this page..</Text></View>
        :
        <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={{
          height:800
        }}

        >
          {events.map( item =>{

            if(typeof item.geometries[0].coordinates[0 !== 'object']){

              return <Marker
                
              title={item.title}
              description={item.description}
              coordinate={{
                latitude: item.geometries[0].coordinates[1],
                longitude: item.geometries[0].coordinates[0]
              }}
              >
                <View style={{width:36,height:36,backgroundColor:'blue',justifyContent:'center',alignItems:'center',borderRadius:50}}>
                      <Text style={{ fontSize:20}}>🔥</Text>
                </View>
                
              </Marker>
              
              
            }
          })
          }

        </MapView>
      }
      </SafeAreaView>
    )
  }

}