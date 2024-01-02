export interface ProductProps {
  _id: string;
  title: string;
  bg?: string;
  rating?: number;
  numberOfOrders?: number;
  stock: number;
  price: number;
  discountPercentage?: number;
  description: string;
  color?: string;
  material?: string;
  category:
    | "Computers"
    | "MiniGadgets"
    | "Tablets"
    | "HomeTV"
    | "Cameras"
    | "Gaming"
    | "Headphones"
    | "Equipments"
    | "SmartPhones";
  brand?: string;
  size?: string;
  shipping: {
    type: "Free" | "Paid";
    cost: number;
  };
  isFavorite?: boolean;
  images: string[];
}