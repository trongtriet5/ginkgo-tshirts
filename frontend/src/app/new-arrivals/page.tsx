import ProductListing from '../components/ProductListing';

export default function NewArrivalsPage() {
  const products = [
    { id: 7, name: 'Spring Trench Coat', category: 'Outerwear', price: '€250' },
    { id: 8, name: 'Breton Stripe Shirt', category: 'T-Shirts', price: '€55' },
    { id: 9, name: 'Linen Trousers', category: 'Pants', price: '€110' },
    { id: 10, name: 'Suede Loafers', category: 'Shoes', price: '€185' },
  ];

  return <ProductListing title="New Arrivals" products={products} />;
}
