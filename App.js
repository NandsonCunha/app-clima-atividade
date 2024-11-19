import React, {useState, useRef, useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';
import api from './src/service/api';

const key = '7fcb35ebd9c91ea4fb14bb75dd8d9856'


export default function App(){

     
        const [latitude, setLatitude] = useState('')
        const [longitude, setLongitude] = useState('')
        //const [temperatura, setTemperatura] = useState('')
        //const [umidade, setUmidade] = useState('')
        const [latiLongUser, setLatitudeUser] = useState(null);

        async function buscar(){
          if (!latitude || !longitude){
            alert('Digite Latitude e Longitude')
            setLatitude('');
            setLongitude('');
            return;
          }
          try {
            const key = '7fcb35ebd9c91ea4fb14bb75dd8d9856'
            console.log(api)
            const response = await api.get(`?lat=${latitude}&lon=${longitude}&appid=${key}`);
            console.log(response.data);
            setLatitudeUser(response.data);
            Keyboard.dismiss();
          } catch (error) {
            console.log('Erro ao buscar o clima: '+error);
          }
        }
      

  return(

    <SafeAreaView style={styles.container}>
        <View style={styles.cont}>
          <Text style={styles.text}>Consulta de Clima</Text>
            <TextInput 
              style={styles.input}
              placeholder="Digite a Latitude"
              value={latitude}
              onChangeText={(texto)=>setLatitude(texto)}
              keyboardType='numeric'
            // ref={inputRef}
            />
            <TextInput 
              style={styles.input}
              placeholder="Digite a Longitude"
              value={longitude}
              onChangeText={(texto)=>setLongitude(texto)}
              keyboardType='numeric'
            // ref={inputRef}
            />

            <TouchableOpacity style={styles.butao} onPress={buscar}>
              <Text style={styles.buttonText} onPress={buscar}>Buscar Clima</Text>
            </TouchableOpacity>
    
             { latiLongUser &&
             <View style={styles.resposta}> 
                <Text style={styles.itemText}>Temperatura: {latiLongUser.main.temp}</Text>
                <Text style={styles.itemText}>Humidade: {latiLongUser.main.humidity}</Text>
                <Text style={styles.itemText}>Bairro: {latiLongUser.weather[0].description}</Text>
             </View>  
             }
        </View>
          
            
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f8f8f8',

  },
  cont: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    margin:10,
    color: '#000',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    margin:10,
  },
  butao: {
    height: 50,
    padding: 10,
    width:'90%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0782F9',
    margin:10
  },
  buttonText:{
    color:"#fff",
    fontWeight: 'bold'
  },
  resposta:{
    margin:10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemText:{
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
  }
})
