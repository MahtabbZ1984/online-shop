type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  
  type Props = {
    product: Product;
  };
  
  export default function ProductCard({ product }: Props) {
    return (
      <div className="border rounded p-4 bg-white shadow hover:shadow-lg transition">
        <img src={product.image} alt={product.title} className="h-40 object-contain mb-4 mx-auto" />
        <h2 className="font-semibold text-base mb-2 line-clamp-2">{product.title}</h2>
        <p className="text-blue-600 font-bold">${product.price}</p>
      </div>
    );
  }
  