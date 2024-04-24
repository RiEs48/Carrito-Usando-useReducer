import { db } from "../database/db"
import { Guitar ,Carrito } from "../types"
export type CartActions =

    {type : 'agregarAlCarrito' ,payload: {item:Guitar}} |
    {type : 'eliminarDelCarrito' ,payload: {id:Guitar['id']}}|
    {type : 'decrementarCantidad' ,payload: {id:Guitar['id']}}|
    {type : 'incrementarCantidad' ,payload: {id:Guitar['id']}}|
    {type : 'vaciarCarrito' }

    // defieniendo el state
    export  type CarritoState = {
        data:Guitar[],
        carrito:Carrito[]

    }
    const iniciarCarrito = () : Carrito[] =>{
        const localStorageCarrito = localStorage.getItem('carrito')
        //retornamos con una condicional iff preguntado si esta o no 
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
      }

    export const initialState : CarritoState = {
        data:db,
        carrito:iniciarCarrito()
    }
    const MIN_ITEMS = 1;
      const MAX_ITEMS = 5;
     export const carritoReducer = (

         state : CarritoState = initialState,
         action: CartActions
     )=>{ 
        if (action.type === 'agregarAlCarrito') {

            const existeProducto = state.carrito.find(
                (temporal) => temporal.id === action.payload.item.id
              );
              let contadorCarrito : Carrito [] = []
          
              if (existeProducto ) {
                contadorCarrito = state.carrito.map(item =>{
                    if(item.id === action.payload.item.id)
                        if(item.quantity < MAX_ITEMS){
                            return{...item,quantity:item.quantity + 1}

                        }else{
                            return item
                        }
                    else{
                        return item
                    }



                })

              
            
               
              } else {
                //aqui agreamos un nuevo atributo a productos  que seria quantity iniciado en 1
                const nuevoProducto : Carrito = {...action.payload.item,quantity : 1}
              
               contadorCarrito = [...state.carrito, nuevoProducto]
              }
            

            return{
                ...state,
                carrito: contadorCarrito
            }
            
        }

        if (action.type==='eliminarDelCarrito') {
       
    
          const actualizarCarrito = state.carrito.filter(item => item.id !== action.payload.id)

            return{
                ...state,
                carrito : actualizarCarrito

            }
            
        }
         if (action.type==='decrementarCantidad') {

            const botonMenos = state.carrito.map(productos =>{
                if (productos.id === action.payload.id && productos.quantity > MIN_ITEMS) {
                  return{
                    ...productos,
                    quantity: productos.quantity - 1
                  }
                  
                }
                return productos
              })
             return{
                ...state,
                carrito:botonMenos

             }
            
         }
         if (action.type==='incrementarCantidad') {            
            
            const botonMas = state.carrito.map(productos => {
     
                if (productos.id === action.payload.id && productos.quantity < MAX_ITEMS) {
                  return {
             
                    ...productos,
          
                    quantity: productos.quantity + 1 
                  }
                }
              
                return productos
              })
        
            

            return{
                    ...state,
                    carrito:botonMas
            }
         }

         if (action.type==='vaciarCarrito') {
            return{
                ...state,
                carrito:[]
            }
            
         }

     }



