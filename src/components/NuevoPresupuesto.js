import React  from 'react'

import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'
import globalStyles from '../styles';

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    HandleNuevoPresupuesto}) => {
    
   
  return (

    <View style={styles.contenedor}>
        <Text style={styles.label}>Definir Presupuesto</Text>
        <TextInput 
            keyboardType='numeric'
            placeholder='Coloca valor Presupuesto'
            style={styles.input}
            value={presupuesto.toString()}
            onChangeText={setPresupuesto}
        />
        <Pressable 
        
        style={styles.boton}
        onPress={() => HandleNuevoPresupuesto(presupuesto)}  
        >
            <Text style={styles.btnTexto}>Agregar Presupuesto</Text>
        </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    input: {
            backgroundColor: '#F5F5F5',
            padding: 5,
            borderRadius: 10,
            textAlign: 'center',
            marginTop: 20
    },
    label:{
            textAlign: 'center',
            fontSize: 24,
            color: '#3B62F6',
            marginTop: 10
    },
    boton:{
        marginTop: 20,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
        
    },
    btnTexto:{
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default NuevoPresupuesto