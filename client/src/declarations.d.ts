interface product {
    id: number;
    image: string;
    name: string;
    price: number;
    stock: number;
  }
  interface user {
    id: number;
    username: string;
    role: number;
  }

declare module "*.module.css";
declare module "*.jpg";
declare module '*/actions' {
    export function setModal();
    export function setModalMessage(message:string);
    export function setUser(user:user);
    export function setProducts(products:Array<product>);
};