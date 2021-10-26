import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // if(!loadedProduct){ // check if it's there
  // return <p>Loading...</p>
  //}
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id); // récupérer tous les id (en tableau)
  const pathWithParams = ids.map((id) => ({
    // transformer tous les id mapé en objets (on aura un tableau d'objets)
    params: { pid: id },
  }));
  return {
    paths: pathWithParams,
    fallback: false,
  };
}
export default ProductDetailPage;
