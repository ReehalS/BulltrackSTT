import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import KeywordCompanyFinder  from '../KeywordCompanyFinder'
import { useVoice } from '../Record'


export default function Home(){
    const { results, isRecording, startRecording, stopRecording } = useVoice();
        
  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            nestedScrollEnabled={true}
            style={styles.buttonStyle}
            onPress={() => {
                isRecording ? stopRecording() : startRecording();
            }}>
            <Text style={styles.buttonTextStyle}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
        </TouchableOpacity>
        </View>
            <Text style={styles.sectionStyle}>Speech Text: </Text>
            <ScrollView style={styles.ScrollViewStyle} nestedScrollEnabled={true}>
                {results.map((item, index) => (
                    <Text key={index} style={styles.textStyle}>{item}</Text>
                ))}
            </ScrollView>
            <KeywordCompanyFinder results={results} styles={styles} />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:0,
      marginTop:0,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: "justified",
      flexDirection: "column",
      width: "100%",
    },
    buttonContainer: {
      marginTop: 5,
      marginBottom: 0,
      alignItems: "center",
    },
    textStyle: {
      textAlign: "center",
      color: "#000000",
      marginBottom: 10,
      fontSize: 20
    },
    buttonTextStyle: {
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: 30,
      backgroundColor: "#007BFF",
      borderRadius: 15,
      padding: 10,
      },
    buttonStyle: {
      borderRadius: 15,
      padding: 10,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    ScrollViewStyle: {
      marginTop: 10,
      marginBottom: 10,
      maxHeight: 200,
    },
    sectionStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: 10,
    },
    extractStyles: {
      flexDirection: "column",
    },
    pickerStyle:{
      flex:1,
      marginTop:0,
      marginBottom:0,
    }
  })
