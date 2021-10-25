import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // création du chemin vers le fichier contenant les datas
  const jsonData = await fs.readFile(filePath); // lecture du fichier
  const data = JSON.parse(jsonData); // convertit le json en objet JS

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // durée avant le prochain generate de la page
    // notFound: true // return un true or false -> 404
    // redirect: { destination: '/no-data' } // redirige la page et renvoit un redirect status code
  };
}
export default HomePage;
