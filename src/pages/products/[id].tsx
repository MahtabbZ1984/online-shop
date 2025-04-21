import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

type Props = {
    product: Product;
};

export default function ProductDetail({ product }: Props) {
    const router = useRouter();

    if (router.isFallback) return <p>Is loading ...</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
            <div>
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl text-blue-600 font-semibold mb-4">${product.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    ADD TO CART
                </button>
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://fakestoreapi.in/api/products');
    const json = await res.json();
   
    const products: Product[] = Array.isArray(json.products) ? json.products : [];
    const paths = products.map(p => ({
      params: { id: p.id.toString() },
    }));
    return { paths, fallback: true };
  };
  

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`https://fakestoreapi.in/api/products/${params?.id}`);
    const json = await res.json();
   
    const product: Product = json.product;
    return { props: { product }, revalidate: 60 };
  };
  
