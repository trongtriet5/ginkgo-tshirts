'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type CurrencyCode = 'VND' | 'USD' | 'EUR';

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convert: (vndAmount: number) => string;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const FALLBACK_RATES: Record<string, number> = {
  VND: 1,
  USD: 0.000041,
  EUR: 0.000038,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  VND: '₫',
  USD: '$',
  EUR: '€',
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('VND');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/VND')
      .then(res => res.json())
      .then(data => {
        if (data.rates?.USD && data.rates?.EUR) {
          setRates({ VND: 1, USD: data.rates.USD, EUR: data.rates.EUR });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const convert = useCallback(
    (vndAmount: number): string => {
      if (vndAmount == null) return 'Contact';
      const rate = rates[currency];
      if (!rate) return `${vndAmount.toLocaleString()} VND`;
      const converted = vndAmount * rate;
      if (currency === 'VND') {
        return `${Math.round(converted).toLocaleString('vi-VN')} VND`;
      }
      return `${SYMBOLS[currency]}${converted.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [currency, rates],
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
