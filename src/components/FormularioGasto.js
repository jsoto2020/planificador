import React,{ useState,useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

const FormularioGasto = ({setModal, handleGasto, gasto, setGasto, eliminarGasto}) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('')

    useEffect(() =>{
        if(gasto?.nombre){
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }
    },[gasto])
  return (
    <View style={styles.contenedor}>
        
        <View style={styles.contenedorBotones}>
            <Pressable style={[styles.btn,styles.btnCancelar]}
            
            onLongPress={() => {
                setModal(false)
                setGasto({})
            }}
            >
                
                <Text style={ styles.btnTexto}>Cancelar</Text>
            </Pressable>    
            { !!id && (
                    <Pressable 
                        onLongPress={() => eliminarGasto(id)}

                        style={[styles.btn,styles.btneliminar]}
                    
                    >
                        
                        <Text style={ styles.btnTexto}>Eliminar</Text>
                    </Pressable>
            )}     
        </View>
        <View style={styles.formulario}>
            <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
            <View>
                <Text style={styles.label}>Nombre Gasto</Text>
                <TextInput 
                  style={styles.input}
                  placeholder='Nombre del Gasto'
                  value={nombre}
                  onChangeText={setNombre}
                />

            </View>
            <View style={styles.campo}>
                <Text style={styles.label} >Cantidad Gasto</Text>
                <TextInput 
                   style={styles.input} 
                  placeholder='Cantidad del Gasto'
                  keyboardType='numeric'
                  value={cantidad}
                  onChangeText={setCantidad}
                />

            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Categoria Gasto</Text>
                <Picker 
                    selectedValue={categoria}
                    onValueChange={(Valor) =>{
                        setCategoria(Valor)
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
            <Pressable 
              style={styles.btnsubmitBtn}
              onPress={() => handleGasto({nombre, cantidad,categoria, id, fecha})}
            >
                <Text style={styles.btnsubmitBtntexto}>
                    {gasto?.nombre ? 'Actualizar Gasto' : 'Agregar gastos'}</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

        contenedor:{
            backgroundColor: '#1E40AF',
            flex: 1
        },
        formulario:{
            ...globalStyles.contenedor
        },
        titulo:{
            textAlign: 'center',
            fontSize: 28,
            marginBottom: 30,
            color: '#64748B'
        },
        label:{
            color: '#64748B',
            textTransform: 'uppercase',
            fontSize: 16,
            fontWeight: 'bold'
        },
        input:{
            backgroundColor: '#F5F5F5',
            padding: 10,
            borderRadius: 10,
            marginTop: 10
        },
        campo:{
            marginTop: 10
        },
        contenedorBotones:{
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        btnsubmitBtn:{
            backgroundColor: '#3B82F6',
            padding: 10,
            marginTop: 10,
            borderRadius: 10
        },
        btnsubmitBtntexto:{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#FFF'
        },
        btnCancelar:{
            backgroundColor: '#DB2777'

            
        },
        btnTexto:{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#FFF',
            textAlign: 'center'
        },
        btn:{
            padding: 10,
            borderRadius: 10,
            marginTop: 30,
            marginHorizontal:10,
            width: '40%',
            flex: 1
        },
        btneliminar:{
            backgroundColor: 'red'
        }

})
export default FormularioGasto