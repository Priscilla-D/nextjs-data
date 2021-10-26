import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState(); // définit à undefined par défaut
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nextjs-course-2fa09-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json()) // convertit la réponse en json
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No daztz yet.</p>;
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
