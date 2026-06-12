import styles from './page.module.css';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <h2 className={styles.heading}>ARTICLE 1 – Personal Information Collected</h2>
      <p className={styles.paragraph}>
        When you make a purchase on our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, and email address.
      </p>
      <p className={styles.paragraph}>
        When you browse our store, we also automatically receive your computer&apos;s internet protocol (IP) address, which provides us with more details about the browser and operating system you are using.
      </p>
      <p className={styles.paragraph}>
        With your permission, we may send you emails about our store, new products, and other updates.
      </p>

      <h2 className={styles.heading}>ARTICLE 2 - Consent</h2>
      <h3 className={styles.subheading}>How do you get my consent?</h3>
      <p className={styles.paragraph}>
        When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
      </p>
      <p className={styles.paragraph}>
        If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
      </p>
      <h3 className={styles.subheading}>How do I withdraw my consent?</h3>
      <p className={styles.paragraph}>
        If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use, or disclosure of your information, at any time, by contacting us at contact@ginkgotshirts.com or by mail at: SASU GINKGO T-SHIRTS, 56 rue Permentade, 33000 Bordeaux, France
      </p>

      <h2 className={styles.heading}>ARTICLE 3 – Disclosure</h2>
      <p className={styles.paragraph}>
        We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
      </p>

      <h2 className={styles.heading}>ARTICLE 4 – Prestashop</h2>
      <p className={styles.paragraph}>
        Our store is hosted on Prestashop. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
      </p>
      <p className={styles.paragraph}>
        Your data is stored through Prestashop&apos;s data storage, databases, and the general Prestashop application. They store your data on a secure server behind a firewall.
      </p>
      <h3 className={styles.subheading}>Payment</h3>
      <p className={styles.paragraph}>
        If you choose a direct payment gateway to complete your purchase, then Prestashop stores your credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is deleted.
      </p>
      <p className={styles.paragraph}>
        All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express, and Discover.
      </p>
      <p className={styles.paragraph}>
        PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
      </p>
      <p className={styles.paragraph}>
        For more insight, you may also want to read Prestashop&apos;s Terms of Service or Privacy Statement.
      </p>

      <h2 className={styles.heading}>ARTICLE 5 – Third-Party Services</h2>
      <p className={styles.paragraph}>
        In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us.
      </p>
      <p className={styles.paragraph}>
        However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
      </p>
      <p className={styles.paragraph}>
        For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
      </p>
      <p className={styles.paragraph}>
        In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
      </p>
      <p className={styles.paragraph}>
        As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.
      </p>
      <p className={styles.paragraph}>
        Once you leave our store&apos;s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website&apos;s Terms of Service.
      </p>
      <h3 className={styles.subheading}>Links</h3>
      <p className={styles.paragraph}>
        When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
      </p>

      <h2 className={styles.heading}>ARTICLE 6 – Security</h2>
      <p className={styles.paragraph}>
        To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
      </p>
      <p className={styles.paragraph}>
        If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.
      </p>
      <h3 className={styles.subheading}>Cookies</h3>
      <p className={styles.paragraph}>
        Here is a list of cookies that we use. We&apos;ve listed them here so you can choose if you want to allow them or not.
      </p>
      <p className={styles.paragraph}>
        <strong>_session_id</strong>, unique token, sessional, Allows Prestashop to store information about your session (referrer, landing page, etc.).
      </p>
      <p className={styles.paragraph}>
        <strong>_prestashop_visit</strong>, no data held, persists for 30 minutes from the last visit, Used by our website provider&apos;s internal stats tracker to record the number of visits.
      </p>
      <p className={styles.paragraph}>
        <strong>_prestashop_uniq</strong>, no data held, expires midnight (relative to the visitor) of the next day, Calculates the number of visits to a store by a single customer.
      </p>
      <p className={styles.paragraph}>
        <strong>cart</strong>, unique token, persistent for 2 weeks, Stores information about the contents of your cart.
      </p>
      <p className={styles.paragraph}>
        <strong>_secure_session_id</strong>, unique token, sessional
      </p>
      <p className={styles.paragraph}>
        <strong>storefront_digest</strong>, unique token, indefinite if the store has a password, used to know if the current visitor has access.
      </p>

      <h2 className={styles.heading}>ARTICLE 7 – Age of Consent</h2>
      <p className={styles.paragraph}>
        By using this site, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use this site.
      </p>

      <h2 className={styles.heading}>ARTICLE 8 – Changes to This Privacy Policy</h2>
      <p className={styles.paragraph}>
        We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
      </p>
      <p className={styles.paragraph}>
        If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
      </p>

      <h2 className={styles.heading}>QUESTIONS AND CONTACT INFORMATION</h2>
      <p className={styles.paragraph}>
        If you would like to: access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at contact@ginkgotshirts.com or by mail at SASU GINKGO T-SHIRTS, 56 rue Permentade, 33000 Bordeaux, France
      </p>
    </div>
  );
}
