import { useReducer ,useEffect} from "react";
import { carritoReducer,initialState } from "./reducers/cart-reducer";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Guitar from "./components/Guitar";



function App() {

  //llamando a nuestro hooks personalizado
 


  // utilizando el reducer
  const [state, dispatch ] = useReducer(carritoReducer,initialState)
  useEffect(()=>
  {
    localStorage.setItem('carrito',JSON.stringify(state.carrito))
  },[state.carrito])
 




  return (
    <>
      <Header
        //enviando como props  para el carrito

        carrito={state.carrito}
        dispatch={dispatch}       
    
     
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
              //eliminarDeCarrito = {eliminarDeCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
