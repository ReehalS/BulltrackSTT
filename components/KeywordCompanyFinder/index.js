import React, {useState, useEffect} from 'react';
import { Text , View, ScrollView, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {Picker} from '@react-native-picker/picker';

//Uncomment below if using the constants from ../../constants/keywordsAndCompanies.js
//both keywords.js and the csv files companies.csv and keywords.csv have the same companies and keywords
//import {keywordSynonyms, companySynonyms} from '../constants/keywordsAndCompanies.js';


function makeHashMap(list) {
  const hashMap = {};
  list.forEach(row => {
    const firstword = row[0].toLowerCase();
    hashMap[firstword] = firstword;
    row.forEach(word => {
      hashMap[word.toLowerCase()] = firstword;
    }); 
  });
  //console.log(hashMap);
  return hashMap;
}

async function readCSVandMakeHashMap(fileName){
  let filePath;
  if (Platform.OS === 'android') {
    filePath = `${fileName}`;
  } else {
    filePath = `${RNFS.MainBundlePath}/${fileName}`;
  }
  try{
    let csvData;
    if (Platform.OS === 'android') {
      csvData = await RNFS.readFileAssets(filePath);
    } else {
      csvData = await RNFS.readFile(filePath);
    }
    //console.log(csvData)
    const lines = csvData.split('\r\n');
    const csvArray = lines.map(line => line.split(','));

    //console.log(csvArray);
    return makeHashMap(csvArray);

  } catch (error) {
    console.error(error);
  }
}

async function readCSVandMakeList(fileName) {   //makes list of first entries in csv file
  let filePath;
  if (Platform.OS === 'android') {
    filePath = fileName;
  } else {
    filePath = `${RNFS.MainBundlePath}/${fileName}`;
  }
  try {
    let csvData;
    if (Platform.OS === 'android') {
      csvData = await RNFS.readFileAssets(filePath);
    } else {
      csvData = await RNFS.readFile(filePath);
    }
    const lines = csvData.split('\r\n');
    const firstEntries = lines.map(line => line.split(',')[0]);
    return firstEntries;
  } catch (error) {
    console.error(error);
  }
}



const KeywordCompanyFinder = ({ results , styles}) => {

    const [keywordHashMap, setKeywordHashMap] = useState({});
    const [companyHashMap, setCompanyHashMap] = useState({});
    const [companyList, setCompanyList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);
    const [keywordsInResults, setKeywordsInResults] = useState([]);
    const [companiesInResults, setCompaniesInResults] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');


    useEffect(() => {
        const loadHashMaps = async () => {
            const keywordData = await readCSVandMakeHashMap('keywords.csv');
            const keywordList = await readCSVandMakeList('keywords.csv');
            const companyData = await readCSVandMakeHashMap('companiesAlphaSort.csv');
            const companyList = await readCSVandMakeList('companiesAlphaSort.csv');
            setKeywordHashMap(keywordData);
            setCompanyHashMap(companyData);
            setCompanyList(companyList);
            setKeywordList(keywordList);
        };
        loadHashMaps();
        
    }, []);
    const wordsInResults = results.flatMap(result => result.toLowerCase().split(' '));
    const twoWordsInResults = wordsInResults.map((_, i, arr) => {
      if (i < arr.length - 1) {
        return `${arr[i]} ${arr[i+1]}`;
      }
      return null;
    }).filter(Boolean);

    const threeWordsInResults = wordsInResults.map((_, i, arr) => {
      if (i < arr.length - 2) {
        return `${arr[i]} ${arr[i+1]} ${arr[i+2]}`;
      }
      return null;
    }).filter(Boolean);
    useEffect(() => {
      const newKeywordsInResults = Array.from(new Set(wordsInResults.flatMap(word => {
        if (keywordHashMap[word]) {
          return keywordHashMap[word];
        }
        return [];
      })));
         
      const newCompaniesInResults = Array.from(new Set([...wordsInResults, ...twoWordsInResults, ...threeWordsInResults].flatMap(word => {
        if (companyHashMap[word]) {
          return companyHashMap[word];
        }
        return [];
      })));
      //console.log(newKeywordsInResults)
      //console.log(newCompaniesInResults)
      setKeywordsInResults(newKeywordsInResults);
      setCompaniesInResults(newCompaniesInResults);
    }, [results]);


  // Code to use the constants from ../../constants/keywordsAndCompanies.js
  // Uncomment out the code below and Comment the code above to use the constants

  // const wordsInResults = results.flatMap(result => result.toLowerCase().split(' '));
  // const twoWordsInResults = wordsInResults.map((_, i, arr) => {
  //   if (i < arr.length - 1) {
  //     return `${arr[i]} ${arr[i+1]}`;
  //   }
  //   return null;
  // }).filter(Boolean);
  // const threeWordsInResults = wordsInResults.map((_, i, arr) => {
  //   if (i < arr.length - 2) {
  //     return `${arr[i]} ${arr[i+1]} ${arr[i+2]}`;
  //   }
  //   return null;
  // }).filter(Boolean);
  // const keywordHashMap = makeHashMap(keywordSynonyms);
  // const companyHashMap = makeHashMap(companySynonyms);
  // const keywordsInResults = Array.from(new Set(wordsInResults.flatMap(word => {
  //   if (keywordHashMap[word]) {
  //     return keywordHashMap[word];
  //   }
  //   return [];
  // })));
       
  // const companiesInResults = Array.from(new Set([...wordsInResults, ...twoWordsInResults, ...threeWordsInResults].flatMap(word => {
  //   if (companyHashMap[word]) {
  //     return companyHashMap[word];
  //   }
  //   return [];
  // })));

    
    return (
      <View style={styles.extractStyles}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.sectionStyle}>Keywords:</Text>
        <Picker
          selectedValue={selectedKeyword}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedKeyword(itemValue);
            setKeywordsInResults([itemValue]);
          }}
          style={styles.pickerStyle}
        >
          {keywordList.map((keyword, index) => (
            <Picker.Item label={keyword} value={keyword} key={index} />
          ))}
        </Picker>
          </View>
        <ScrollView style={styles.ScrollViewStyle} nestedScrollEnabled={true}>
          {keywordsInResults.map((keyword, index) => (
            <Text style={styles.textStyle} key={index}>{keyword}</Text>
          ))}
        </ScrollView>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.sectionStyle}>Companies:</Text>
          <Picker
            selectedValue={selectedCompany}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCompany(itemValue);
              setCompaniesInResults([itemValue]);
            }}
            style={styles.pickerStyle}
          >
            {companyList.map((company, index) => (
              <Picker.Item label={company} value={company} key={index} />
            ))}
          </Picker>
          </View>
          <ScrollView style={styles.ScrollViewStyle} nestedScrollEnabled={true}>
            {companiesInResults.map((company, index) => (
              <Text style={styles.textStyle} key={index}>{company}</Text>
          ))}
        </ScrollView>
        
        </View>
    );
  };

export default KeywordCompanyFinder;

