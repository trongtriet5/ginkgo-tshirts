import ProductListing from '../components/ProductListing';

export default function AccessoriesPage() {
  const products = [
    { id: 11, name: 'Leather Tote Bag', category: 'Bags', price: '€195' },
    { id: 12, name: 'Silk Scarf', category: 'Accessories', price: '€45' },
    { id: 13, name: 'Classic Leather Belt', category: 'Accessories', price: '€65' },
  ];

  return <ProductListing title="Accessories" products={products} />;
}
