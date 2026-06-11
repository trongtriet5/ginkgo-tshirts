import ProductImageSlider from '../../components/ProductImageSlider';
import PriceDisplay from '../../components/PriceDisplay';
import styles from './page.module.css';

interface ProductDetail {
  id: string;
  name: string;
  code: string;
  color: string;
  size: string;
  price: number | null;
  category: string;
  availableColors: string[];
  availableSizes: string[];
}

export default async function ProductDetailPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ name?: string; priceValue?: string; cat?: string; sizes?: string }>,
}) {
  const { id } = await params;
  const { name: qName, priceValue: qPriceValue, cat: qCat, sizes: qSizes } = await searchParams;
  const numId = Number(id);

  // Use search params from listing as primary source (works without backend)
  const productName = qName || `Organic Cotton T-Shirt ${id}`;
  const productPriceVnd = qPriceValue ? Number(qPriceValue) : null;

  // Determine display color from query params
  let displayColor = '';
  if (qCat) {
    if (qCat.startsWith('Color: ')) {
      displayColor = qCat.replace('Color: ', '');
    } else {
      displayColor = qCat;
    }
  }

  // Try backend for extra data (sizes, color variants)
  let product: ProductDetail | null = null;
  try {
    const res = await fetch(`http://localhost:3333/products/${id}`, { cache: 'no-store' });
    if (res.ok) {
      product = await res.json();
    }
  } catch {
    // Backend unavailable
  }

  // Sizes from search params (listing knows the real sizes)
  const paramSizes = qSizes ? qSizes.split(',').filter(Boolean) : [];
  // Try backend for extra size/color data, fall back to search params, then defaults
  const sizes = paramSizes.length > 0 ? paramSizes :
    (product?.availableSizes?.length ? product.availableSizes : ['S', 'M', 'L', 'XL']);
  const colors = (product?.availableColors?.length ? product.availableColors : 
    displayColor ? [displayColor, 'Noir', 'Navy'] : ['Blanc', 'Noir', 'Navy']);
  const colorLabel = displayColor || product?.color || 'Blanc';

  const images = [
    `/ginkgo${((numId - 1) % 5) + 1}.jpg`,
    `/ginkgo${((numId) % 5) + 1}.jpg`,
    `/ginkgo${((numId + 1) % 5) + 1}.jpg`,
    `/ginkgo${((numId + 2) % 5) + 1}.jpg`,
  ];

  return (
    <div className={styles.container}>
      <ProductImageSlider images={images} productName={productName} />

      <div className={styles.details}>
        <h1 className={styles.title}>{productName}</h1>
        <PriceDisplay vndAmount={productPriceVnd} className={styles.price} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Color: {colorLabel}</div>
          <div className={styles.colorOptions}>
            {colors.map(c => (
              <button key={c} className={styles.colorSwatch} aria-label={c} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <span>Size</span>
            <span className={styles.sizeGuide}>Size Guide</span>
          </div>
          <div className={styles.sizeOptions}>
            {sizes.map(s => (
              <button key={s} className={styles.sizeButton}>{s}</button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to Bag</button>
          <button className={styles.wishlist}>Save to Wishlist</button>
        </div>

        <div className={styles.description}>
          <p>
            Crafted from 100% premium organic cotton, this t-shirt offers a relaxed, effortless fit. Inspired by Parisian streetwear and tailored for comfort. Features a classic crew neckline and short sleeves.
          </p>
        </div>
      </div>
    </div>
  );
}
