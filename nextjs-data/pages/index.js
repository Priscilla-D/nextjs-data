import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // création du chemin vers le fichier contenant les datas
  const jsonData = await fs.readFile(filePath); // lecture du fichier
  const data = JSON.parse(jsonData); // convertit le json en objet JS
  return {
    props: {
      products: data.products,
    },
  };
}
export default HomePage;
