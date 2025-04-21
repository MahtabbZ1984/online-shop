import { GetStaticProps } from 'next';

type Props = {
  categories: string[];
};

export default function Home({ categories }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <li key={cat} className="border p-4 rounded bg-gray-100">
            <a href={`/products?category=${cat}`} className="capitalize">{cat}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.in/api/products/category");
  const json = await res.json();
  
  const categories: string[] = Array.isArray(json.categories) ? json.categories : [];
  return {
    props: { categories },
    revalidate: 3600,
  };
};

