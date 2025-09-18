import { useEffect, useState } from "react";

function TestConnection() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/items', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setItems(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Connection failed:', err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>Items found: {items.length}</p>
    </div>
  );
}

export default TestConnection;