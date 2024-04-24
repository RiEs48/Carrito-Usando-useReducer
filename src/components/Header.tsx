import { useMemo, Dispatch} from "react"
import type { Carrito, Guitar } from "../types"
import type { CartActions } from "../reducers/cart-reducer"





type HeaderProps = {
    carrito : Carrito[]
    dispatch:Dispatch<CartActions> 
    
  

}

const Header = ({carrito,dispatch} : HeaderProps) => {
          //states Derivados 
    // usando un hook llamado use MEMO
    //state para  verificar que el carrito este vacio y asi cambiarlo 
    const estaVacio =useMemo(() => carrito.length === 0,[carrito]) 

    // state  con el array method  reduce()  PARA   hacer conteo de precios

    const carritoTotal = useMemo (() => carrito.reduce((total,productos) => total + (productos.quantity * productos.price), 0),[carrito] )
    return (
    
       <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                          
                            { estaVacio ? (
                            <p className="text-center">El carrito esta vacio</p> )
                            :(                        
                            <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                              
                                <tbody>
                                {carrito.map( productos =>(

                               
                                    <tr key ={productos.id}>
                                        <td>
                                            <img className="img-fluid" src={ `/img/${productos.image}.jpg` } alt="imagen guitarra" />
                                        </td>
                                        <td> {productos.name} </td>
                                        <td className="fw-bold">
                                                ${productos.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={ ()=> dispatch({type:'decrementarCantidad',payload:{id:productos.id}})}
                                            >
                                                -
                                            </button>
                                                {productos.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={ () => dispatch({type:'incrementarCantidad', payload:{id:productos.id}})}
                                                
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={ ()=> dispatch({type: 'eliminarDelCarrito', payload:{id:productos.id}})}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                      ))}
                                </tbody>
                              
                            </table>
                            <p className="text-end">Total pagar: <span className="fw-bold">${carritoTotal} </span></p>
                            </>
                      )}
                            
                            <button 
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={()=> dispatch({type:'vaciarCarrito'})}
                            >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
  
  )
}


export default Header
