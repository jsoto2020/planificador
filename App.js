/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React,{useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Filtro from './src/components/Filtro';
import { generarId } from './src/helpers'
import ListadoGastos from './src/components/ListadoGastos'

const App = () =>  {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([])  
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() =>{
      const obtenerPresupuestoStorage = async () => {
        try {
          const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto')
          console.log(presupuestoStorage) ?? 0

          if(presupuestoStorage > 0){
            setPresupuesto(presupuestoStorage)
            setIsValidPresupuesto(true)
          }
        } catch (error) {
          console.log(error)
        }
        
      }
      obtenerPresupuestoStorage()
  },[])
  
  useEffect(() => {
    const obtenerGastosStorage = async () =>{
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
        
      } catch (error) {
        console.log(error)
      }
      
    } 
    obtenerGastosStorage()
  },[])
  
  useEffect(() =>{
    if(isValidPresupuesto){
      const guardarPresupuestoStorage = async () =>{
          try {
            await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
          } catch (error) {
            console.log(error)
          }
      }
      guardarPresupuestoStorage()
    }
  },[isValidPresupuesto, presupuesto])

  
  useEffect(() =>{
    const guardarGastosStorage = async () =>{
      try {
        await AsyncStorage.setItem('planificador_gastos',JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  },[gastos])
  const HandleNuevoPresupuesto = (presupuesto) =>{
       if(Number(presupuesto) > 0){
        setIsValidPresupuesto(true)
       }else{
         
         Alert.alert('Error','Presupuesto no puede ser menor a cero',
         [{Text:"Ok"}]
         )
       }
  }  
  const handleGasto = gasto => {
    
    if([gasto.nombre, gasto.cantidad,gasto.categoria].includes('')){
      Alert.alert('Error', 'Existe un campo vacio',[{Text: 'OK'}])
    }
    if(gasto.id){
        const gastoActualizado = gastos.map( gastoState => gastoState.id
          === gasto.id ? gasto : gastoState)

          setGastos(gastoActualizado)
    }else{

      gasto.id = generarId()
      gasto.fecha = Date.now()
  
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }
  const eliminarGasto = id => {
    Alert.alert('Deseas Eliminar este Gasto?',
    'No es recuperable este registro',
    [
      {text: 'No', style: 'cancel'},
      {text: 'Si, Eliminar Gasto', onPress: () =>{
        const gastoActualizados = gastos.filter( gastoState =>
          gastoState.id !== id)
          setGastos(gastoActualizados)
          setModal(!modal)
          setGasto({})
      }}
    ])
  }
  const resetearApp = () =>{
    Alert.alert('Deseas Borrar toda la Data de la App?',
               'No podras recuperar la data',
               [
                 {text: 'No', style: 'cancel'},
                 {text: 'Si, Deseo Eliminar', onPress: async () => {
                   try {
                    await AsyncStorage.clear()
                    setIsValidPresupuesto(false)
                    setPresupuesto(0)
                    setGastos([])
                   } catch (error) {
                     console.log(error)
                   }
                 }}
               ])
  }
  return (
    <View style={styles.contenedor}>
      <ScrollView>
          <View style={styles.header}>
              <Header />
              
              {isValidPresupuesto ? (
                <ControlPresupuesto 
                    presupuesto={presupuesto}
                    gastos={gastos}
                    resetearApp={resetearApp}
                />
              ) : (
                  <NuevoPresupuesto 
                      presupuesto={presupuesto}
                      setPresupuesto={setPresupuesto}
                      HandleNuevoPresupuesto={HandleNuevoPresupuesto}
                  />
              ) }
          </View>

          {isValidPresupuesto && (
            <>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
                gastos={gastos}
                setGastosFiltrados={setGastosFiltrados}
              />

              <ListadoGastos 
                gastos={gastos}
                setModal={setModal}
                setGasto={setGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />

            </>
          )}
      </ScrollView>
      
      {modal && (
        <Modal
            animationType='slide'
            visible={modal}
            onRequestClose={() => {
              setModal(!modal)
            }}
        > 
            <FormularioGasto 
              setModal={setModal}
              handleGasto={handleGasto}
              gasto={gasto}
              setGasto={setGasto}
              eliminarGasto={eliminarGasto}
            />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
              style={styles.imagen}
              source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      ) }

    </View>
  );
};
const styles = StyleSheet.create({
  contenedor:{
      backgroundColor: '#F5F5F5',
      flex: 1
  },
  header:{
    backgroundColor: '#3B82F6',
    minHeight: 400
  },
  pressable: {
    
    width: 60,
    height: 60,
    position: 'absolute',
    
    bottom: 20,
    right: 30
  },
  imagen:{
    width: 60,
    height: 60,

  }
})
export default App;
