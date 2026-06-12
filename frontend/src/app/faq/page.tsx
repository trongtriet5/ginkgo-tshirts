'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface FaqItem {
  q: string;
  a: string;
  id?: string;
}

interface FaqCategory {
  category: string;
  id?: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    category: 'Production',
    items: [
      {
        q: 'Where are Ginkgo t-shirts made?',
        a: 'All t-shirts on the site are made in our workshop in Vietnam. We are developing new items with workshops in France, in Dordogne and Normandy.',
      },
      {
        q: 'Where does the cotton come from?',
        a: 'Our organic cotton is sourced from India.',
      },
      {
        q: 'What certifications do you have?',
        a: 'All our organic cotton t-shirts are made from GOTS certified organic cotton.',
      },
      {
        q: 'How are your t-shirts printed?',
        a: 'All our t-shirts are screen-printed using advanced techniques, mainly with water-based, heavy metal-free inks.',
      },
    ],
  },
  {
    category: 'Order',
    items: [
      {
        q: 'Can I change my order once it has been placed?',
        a: 'Once an order is submitted, it is generally not possible to make changes. However, you can contact us at infos@ginkgotshirts.com to request a modification, and we will see if it can be done before shipment.',
      },
      {
        q: 'Can I reserve a product in my cart?',
        a: 'Unfortunately, no. Adding a product to your cart does not guarantee that it will be available later. If the product is out of stock before you complete your order, it will be removed from your cart.',
      },
      {
        q: 'How do I cancel my order?',
        a: 'To cancel an order, email infos@ginkgotshirts.com with your order number. If your order has already been shipped, you will receive instructions on how to return it. Your credit card will be refunded minus the original shipping costs once we receive your return.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We currently accept credit card payments only.',
      },
      {
        q: 'Is your website secure?',
        a: 'Ginkgo takes website security very seriously and uses Stripe\'s SSL encryption to protect your information. Look for the locked padlock icon during the payment process.',
      },
    ],
  },
  {
    category: 'My account',
    items: [
      {
        q: 'Can I change my account information?',
        a: 'Log into your Ginkgo account and go to the "My Profile" page to make changes, except for your username and registration date.',
      },
    ],
  },
  {
    category: 'Card, size and fit',
    id: 'size-guide',
    items: [
      {
        q: 'How should I wash my Ginkgo t-shirts? Will they shrink?',
        a: 'Our t-shirts may shrink slightly. Wash gently at 30°C and spin at a maximum of 600 rpm. Do not tumble dry, iron gently, and avoid dry cleaning.',
      },
      {
        q: 'How are your t-shirts cut?',
        a: 'Our t-shirts have a fit between basic and slim. Size charts have a tolerance of +/- 1 cm. Check the product page for specific details. For questions, email infos@ginkgotshirts.com.',
      },
    ],
  },
  {
    category: 'Delivery and returns',
    id: 'delivery-and-returns',
    items: [
      {
        q: 'Order processing within 48 HOURS',
        a: 'All parcels are prepared within 48 hours of ordering and shipped daily before 12 PM, except on Saturdays, Sundays, and public holidays. You will be notified by email of payment, order processing, and shipment with tracking information.',
      },
      {
        q: 'Delivery',
        id: 'delivery',
        a: 'We deliver worldwide from our warehouse in Ho Chi Minh City! Via VNpost, delivery takes 2 to 4 weeks depending on your country. Via Viettel Post Express, delivery takes 3 to 5 business days. In Vietnam, delivery takes 1 to 3 days via Viettel Post.',
      },
    ],
  },
];

function AccordionItem({ question, answer, id }: { question: string; answer: string; id?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id && window.location.hash === `#${id}`) {
      setOpen(true);
    }
  }, [id]);

  return (
    <div className={styles.accordionItem} id={id}>
      <button className={styles.accordionButton} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className={`${styles.accordionIcon} ${open ? styles.accordionIconOpen : ''}`}>
          &#9662;
        </span>
      </button>
      <div className={`${styles.accordionContent} ${open ? styles.accordionContentOpen : ''}`}>
        <div className={styles.accordionInner}>
          <p className={styles.accordionAnswer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>FAQ</h1>
        <p className={styles.subtitle}>Frequently Asked Questions</p>
      </section>

      <div className={styles.faqList}>
        {faqCategories.map((cat) => (
          <div key={cat.category} id={cat.id} className={styles.categoryBlock}>
            <h2 className={styles.categoryTitle}>{cat.category}</h2>
            {cat.items.map((item, i) => (
              <AccordionItem key={i} question={item.q} answer={item.a} id={item.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
