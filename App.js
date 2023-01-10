import { StyleSheet, View, Text, Pressable } from 'react-native';
import ConverterFrom from './components/ConverterFrom';
import ConverterTo from './components/ConverterTo';
import { useState } from 'react';

const App = () => {
  const currencies = require('./components/currencyData');
  
  const [amount, setAmount] = useState(0);
  const [convertableValues, setConvertableValues] = useState({});
  const [result, setResult] = useState(0);
  const [visibility, setVisibility] = useState({
    from: false,
    to: false
  });
  const [currentValue, setCurrentValue] = useState({
    from: 'USD',
    to: 'EUR'
  });
  
  const handleTouchPress = (type, items) => {
      if(type === "from"){
        setVisibility(prevVisibility => ({
          ...prevVisibility,
          from: false
          })
        );
        setCurrentValue(prevCurrentValue => ({
          ...prevCurrentValue,
          from: items
          })
        );
      }
      else{
        setVisibility(prevVisibility => ({
          ...prevVisibility,
          to: false
          })
        );
        setCurrentValue(prevCurrentValue => ({
          ...prevCurrentValue,
          to: items
          })
        );
      }
  }
  
  const handleAmount = e => {
    setAmount(e);
  }

  const handleVisibility = (type) => {
    if(type === "from")
      setVisibility(prevVisibility => ({
        ...prevVisibility,
        from: true
      }));
    else
      setVisibility(prevVisibility => ({
        ...prevVisibility,
        to: true
      }))
  }

  const update = () => {
    fetch('https://api.currencyfreaks.com/latest?apikey=5feb32727c87415cbd07022b8cbcec02')
      .then(res => res.json())
      .then(res => setConvertableValues(res.rates));
  }

  const convert = () => {
    convertableValues[currentValue.to] === undefined ? setResult('NO DATA') : setResult(Math.round((amount * (convertableValues[currentValue.to] / convertableValues[currentValue.from])) * 1000) / 1000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Currency Converter</Text>
      <View style={styles.main}>
        <View style={styles.textView}>
          <Text style={styles.text}>From: </Text>
        </View>
        <ConverterFrom 
          currencies={currencies}
          visibility={visibility.from} 
          handleVisibility={handleVisibility} 
          handleAmount={handleAmount} 
          handleTouchPress={handleTouchPress} 
          currentValue={currentValue.from}/>
        <View style={styles.textView}>
          <Text style={styles.text}>To: </Text>
        </View>
        <ConverterTo 
          result={result} 
          currencies={currencies}
          visibility={visibility.to} 
          handleVisibility={handleVisibility} 
          handleTouchPress={handleTouchPress} 
          currentValue={currentValue.to}/>
        <View style={styles.buttonView}>
          <Pressable onPress={convert} style={styles.button}>
            <Text style={styles.buttonText}>Convert</Text>
          </Pressable>
          <Pressable onPress={update} style={styles.button}>
            <Text style={styles.buttonText}>GET DATA</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#6254ff'
  },
  main: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fdfeff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textView: {
    margin: 20,
    width: '70%',
    alignItems: 'flex-start'
  },
  text: {
    color: '#ced3ea',
    fontSize: 16,
    fontWeight: '600'
  },
  button: {
    marginTop: 50,
    backgroundColor: '#6254ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    margin: 40,
    fontWeight: 'bold'
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%'
  }
});

export default App;