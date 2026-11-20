/**
 * Legal pages.
 *
 * Wording approved by Maison Asili. The website is an enquiry-led catalogue:
 * no prices are shown, no payment is taken and no order is accepted online.
 */
module.exports = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro:
      'This notice explains what personal data Maison Asili collects through this website, why it is collected and how it is handled.',
    sections: [
      {
        h: 'Who is responsible',
        p: [
          'Maison Asili (Inh. Susan Kiruku-Klann), Neue Christstr. 7, 14059 Berlin, Germany, is responsible for the processing described in this notice.',
          'Questions about privacy can be sent to info@maisonasili.com.'
        ]
      },
      {
        h: 'Data we collect',
        p: [
          'When you send a message through the contact form or submit an order enquiry, we collect the details you enter: your name, email address, subject and message, together with the products and quantities in your enquiry selection.',
          'Your enquiry selection is stored in your own browser using local storage. It is not sent to Maison Asili until you submit an enquiry, and clearing your browser storage removes it.',
          'Server logs may record technical information such as the time of a request and the IP address used to submit it, for security and abuse-prevention purposes. No payment details are collected because this website does not process payments.'
        ]
      },
      {
        h: 'Why we use it and on what basis',
        p: [
          'Your details are used strictly to respond to your enquiry, to confirm availability, pricing and collection or delivery options, and to manage the resulting relationship with you.',
          'Processing is based on Article 6(1)(b) GDPR (taking steps at your request before entering into a contract) and Article 6(1)(f) GDPR (our legitimate interest in responding to enquiries and maintaining business relationships).'
        ]
      },
      {
        h: 'Service providers',
        p: [
          'This website is hosted on Vercel, and enquiry emails are delivered through Resend, a transactional email provider. These providers process the information needed to deliver the service on our behalf.',
          'We do not sell personal data.'
        ]
      },
      {
        h: 'Retention',
        p: [
          'Enquiries and the resulting correspondence are retained for as long as needed to handle the request and any resulting relationship, or as required by law.'
        ]
      },
      {
        h: 'Your rights',
        p: [
          'Under the GDPR you may request access to, correction of, or deletion of your personal data, restrict or object to its processing, and request data portability.',
          'To exercise these rights, write to info@maisonasili.com. You also have the right to complain to a data protection supervisory authority.'
        ]
      }
    ]
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro:
      'These terms apply to private patrons and to trade and hospitality partners who use this website and its enquiry process.',
    sections: [
      {
        h: 'Purpose of this website',
        p: [
          'This website presents the Maison Asili collection to private gourmet buyers, Berlin market visitors, chefs and specialty boutiques alike. It is a catalogue and enquiry platform, not an online shop.',
          'No prices are displayed, no payment is taken and no order is accepted through this website.'
        ]
      },
      {
        h: 'Enquiries and orders',
        p: [
          'Submitting an enquiry selection does not create a contract or a binding order. It is a request for Maison Asili to confirm availability, pricing and collection or delivery options with you personally.',
          'A contract is formed only when Maison Asili confirms the commercial terms with you in writing. This applies equally to private and trade orders.'
        ]
      },
      {
        h: 'Products and information',
        p: [
          'Product names, descriptions, ingredients, pack sizes and origins are provided in good faith. Product photography is illustrative; natural variation in botanical ingredients may occur.',
          'Full allergen details are available on request.'
        ]
      },
      {
        h: 'Delivery, returns and liability',
        p: [
          'Collection and delivery are agreed individually with each patron or trade partner and confirmed in writing before dispatch.',
          'Statutory liability rights remain unaffected.'
        ]
      },
      {
        h: 'Governing law',
        p: ['These terms and any resulting agreements are governed by German law.']
      },
      {
        h: 'Intellectual property',
        p: [
          'The Maison Asili name, brand identity, photography, product descriptions and website content may not be reproduced for commercial use without written permission.'
        ]
      }
    ]
  },
  {
    slug: 'shipping',
    title: 'Shipping & Fulfilment',
    intro:
      'Maison Asili is based in Berlin and arranges every order, collection and delivery personally while our online store is being prepared.',
    sections: [
      {
        h: 'How orders are arranged',
        p: [
          'Orders, collection and delivery are arranged directly with Maison Asili by email at info@maisonasili.com. We confirm availability, pricing and the collection or delivery option with you personally.',
          'No shipping fees are calculated or charged through this website.'
        ]
      },
      {
        h: 'Collection and delivery',
        p: [
          'Collection in Berlin, delivery within Germany and international delivery are agreed individually for each enquiry, with the details confirmed in writing before dispatch.'
        ]
      },
      {
        h: 'Returns and discrepancies',
        p: [
          'Any issue with a delivered order should be reported to info@maisonasili.com so that it can be reviewed with you directly.'
        ]
      },
      {
        h: 'Packaging',
        p: [
          'Packaging is chosen to protect glass, oils and botanical products in transit. Specific packaging requirements can be discussed as part of your enquiry.'
        ]
      }
    ]
  },
  {
    slug: 'impressum',
    title: 'Legal Notice / Impressum',
    intro: 'Legal disclosure for this website.',
    sections: [
      {
        h: 'Provider',
        p: [
          'Maison Asili (Inh. Susan Kiruku-Klann)',
          'Neue Christstr. 7',
          '14059 Berlin',
          'Germany'
        ]
      },
      {
        h: 'Contact',
        p: ['Email: info@maisonasili.com']
      },
      {
        h: 'Responsible for editorial content',
        p: [
          'Susan Kiruku-Klann, Neue Christstr. 7, 14059 Berlin, Germany (§ 18 Abs. 2 MStV).'
        ]
      }
    ]
  }
];
