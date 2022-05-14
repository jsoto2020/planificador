import React,{useEffect} from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

const Filtro = ({filtro,setFiltro,gastos, setGastosFiltrados}) => {
     useEffect(() =>{
       if(filtro == ''){
        setGastosFiltrados([])
       }else{
           const gastosFiltrados =gastos.filter( gasto => gasto.categoria === filtro)
           setGastosFiltrados(gastosFiltrados)
       }
    },[filtro])
   return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Filtrar Gastos</Text>
        <Picker 
            selectedValue={filtro}
            onValueChange={(valor) =>{
                  setFiltro(valor)  
            }}
        >
                    <Picker.Item label='--- Seccionar ----' value="" />
                    <Picker.Item label='Ahorro' value="ahorro" />
                    <Picker.Item label='Alimentos' value="alimento" />
                    <Picker.Item label='Educacion' value="educacion" />
                    <Picker.Item label='Transporte' value="transporte" />
                    <Picker.Item label='Varios' value="varios" />
                </Picker>

    </View>
  )
}
const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        transform: [{ translateY: 0}],
        marginTop: 70
    },
    label:{
        fontSize: 20,
        fontWeight: '900',
        color: '#64748B'
    }
})
export default Filtro