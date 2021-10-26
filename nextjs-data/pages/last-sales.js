import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState(); // définit à undefined par défaut
  //   const [isLoading, setIsLoading] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(
    "https://nextjs-course-2fa09-default-rtdb.europe-west1.firebasedatabase.app/sales.json", fetcher);
  useEffect(() => {
    // ici le useEffect est utiliser pour passer les données en tableau d'objets
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-course-2fa09-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json()) // convertit la réponse en json
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to loasd.</p>;
  }
  if (!data || !sales) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
