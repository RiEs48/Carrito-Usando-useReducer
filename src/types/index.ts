export type Guitar = {

    id : number;
    name : string
    image: string;
    description : string;
    price: number;
    
 }
// APLICANDO LA HERENCIA EN TYPESCRIPT
 export type Carrito = Guitar & {

   quantity:number
    
 }
