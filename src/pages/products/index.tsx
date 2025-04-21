// src/pages/products/index.tsx
import { GetServerSideProps } from 'next';
import ProductCard from '@/components/ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Props = {
  products: Product[];
};

export default function ProductsPage({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  
  const category = Array.isArray(context.query.category)
    ? context.query.category[0]
    : context.query.category;

 
  const endpoint = category
    ? `https://fakestoreapi.in/api/products/category?type=${encodeURIComponent(category)}`
    : 'https://fakestoreapi.in/api/products';

  const res = await fetch(endpoint);
  const json = await res.json();

  
  const products: Product[] = Array.isArray(json.products)
    ? json.products
    : [];

  return {
    props: { products },
  };
};
