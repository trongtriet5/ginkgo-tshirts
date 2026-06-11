import ProductListing from '../components/ProductListing';

export default function ClothingPage() {
  const products = [
    { id: 1, name: 'Organic Cotton T-Shirt', category: 'T-Shirts', price: '€45' },
    { id: 2, name: 'Parisian Knit Sweater', category: 'Sweaters', price: '€120' },
    { id: 3, name: 'Straight Fit Chinos', category: 'Pants', price: '€95' },
    { id: 4, name: 'Supima Cotton Polo', category: 'Polos', price: '€65' },
    { id: 5, name: 'Linen Blend Overshirt', category: 'Shirts', price: '€110' },
    { id: 6, name: 'Minimalist Hoodie', category: 'Sweaters', price: '€85' },
  ];

  return <ProductListing title="Clothing" products={products} />;
}
