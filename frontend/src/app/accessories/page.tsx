import ProductListing from '../components/ProductListing';

const products = [
  { id: 11, name: 'Leather Tote Bag', category: 'Bags', priceValue: 5500000 },
  { id: 12, name: 'Silk Scarf', category: 'Accessories', priceValue: 1250000 },
  { id: 13, name: 'Classic Leather Belt', category: 'Accessories', priceValue: 1800000 },
];

export default function AccessoriesPage() {
  return <ProductListing title="Accessories" products={products} />;
}
