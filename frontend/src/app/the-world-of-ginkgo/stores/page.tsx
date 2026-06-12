'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface StoreAddress {
  address: string;
  mapQuery: string;
}

interface CityStores {
  city: string;
  addresses: StoreAddress[];
}

const stores: CityStores[] = [
  {
    city: 'Saigon',
    addresses: [
      { address: '10 Le Loi Street, District 1', mapQuery: '10+Le+Loi+Street+District+1+Ho+Chi+Minh+City+Vietnam' },
      { address: '86 Le Loi Street, District 1', mapQuery: '86+Le+Loi+Street+District+1+Ho+Chi+Minh+City+Vietnam' },
      { address: '107 Dong Khoi Street, District 1', mapQuery: '107+Dong+Khoi+Street+District+1+Ho+Chi+Minh+City+Vietnam' },
      { address: '92-96 Le Loi Street, District 1', mapQuery: '92-96+Le+Loi+Street+District+1+Ho+Chi+Minh+City+Vietnam' },
    ],
  },
  {
    city: 'Hoi An',
    addresses: [
      { address: '115 Tran Phu Street', mapQuery: '115+Tran+Phu+Street+Hoi+An+Vietnam' },
      { address: '178 Tran Phu Street', mapQuery: '178+Tran+Phu+Street+Hoi+An+Vietnam' },
    ],
  },
  {
    city: 'Hanoi',
    addresses: [
      { address: '49 Dinh Tien Hoang Street, Hoan Kiem', mapQuery: '49+Dinh+Tien+Hoang+Street+Hoan+Kiem+Hanoi+Vietnam' },
      { address: '60 Hang Gai Street, Hoan Kiem', mapQuery: '60+Hang+Gai+Street+Hoan+Kiem+Hanoi+Vietnam' },
      { address: '79 Hang Gai Street, Hoan Kiem', mapQuery: '79+Hang+Gai+Street+Hoan+Kiem+Hanoi+Vietnam' },
      { address: '44 Hang Be Street, Hoan Kiem', mapQuery: '44+Hang+Be+Street+Hoan+Kiem+Hanoi+Vietnam' },
      { address: '10 Hang Dao Street', mapQuery: '10+Hang+Dao+Street+Hoan+Kiem+Hanoi+Vietnam' },
    ],
  },
];

export default function StoresPage() {
  const [selected, setSelected] = useState<StoreAddress | null>(null);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Our Stores</h1>
        <p className={styles.subtitle}>
          An ideal communication medium for building the brand&apos;s reputation in real life.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.list}>
          {stores.map((store) => (
            <div key={store.city} className={styles.cityBlock}>
              <h2 className={styles.cityName}>{store.city}</h2>
              <ul className={styles.addressList}>
                {store.addresses.map((item) => (
                  <li key={item.address}>
                    <button
                      className={`${styles.addressBtn} ${selected?.address === item.address ? styles.addressBtnActive : ''}`}
                      onClick={() => setSelected(item)}
                    >
                      {item.address}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.mapColumn}>
          {selected ? (
            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapIframe}
                src={`https://maps.google.com/maps?q=${selected.mapQuery}&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className={styles.mapLabel}>{selected.address}</p>
            </div>
          ) : (
            <div className={styles.mapPlaceholder}>
              <p>Click on a store address to view on map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
