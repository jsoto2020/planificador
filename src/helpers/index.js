export const formatearCantidad = cantidad =>{

    return Number(cantidad).toLocaleString('en-US',
    {
        style: 'currency',
        currency: 'USD'
    }
    );
}
export const formatearFecha = fecha => {

    const nuevaFecha = new Date(fecha)
    const opciones ={
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
export const generarId = () =>{
    const random = Math.random().toString(36).substring(2,11);
    const fecha = Date.now().toString(36);

    return fecha + random

}