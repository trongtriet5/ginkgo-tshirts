'use client';

import { useCurrency } from '../context/CurrencyContext';
import styles from './PriceDisplay.module.css';

export default function PriceDisplay({
  vndAmount,
  className,
}: {
  vndAmount: number | null | undefined;
  className?: string;
}) {
  const { convert } = useCurrency();
  if (vndAmount == null) return <span className={className}>Contact</span>;
  return <span className={className}>{convert(vndAmount)}</span>;
}
