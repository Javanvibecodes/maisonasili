/**
 * Legal pages.
 *
 * These pages describe the wholesale ordering model truthfully. Details that
 * only Maison Asili can supply (registered address, register number, VAT ID,
 * telephone) are marked as pending rather than invented. The final wording must
 * be reviewed by Maison Asili's legal adviser before publication.
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
          'The Maison Asili entity responsible for data processing, together with its registered address, will be published here once confirmed.',
          'Questions about privacy can be sent to info@maisonasili.com.'
        ]
      },
      {
        h: 'Data we collect',
        p: [
          'When you submit a wholesale order request or an enquiry, we collect the details you enter: your name, business name, email address, telephone number (if provided), country, city, business type, delivery address (if provided), website (if provided), preferred fulfilment information and any notes you add.',
          'We also receive the products and quantities you selected. No payment details are collected because this website does not process payments.',
          'Server logs may record technical information such as the time of a request and the IP address used to submit it, for security and abuse-prevention purposes.'
        ]
      },
      {
        h: 'Why we use it',
        p: [
          'Your details are used to receive and respond to your order request or enquiry, to confirm availability, trade pricing and fulfilment, and to keep a record of the correspondence.',
          'Processing is based on taking steps at your request before entering into a contract and on our legitimate interest in responding to business enquiries.'
        ]
      },
      {
        h: 'Order cart storage',
        p: [
          'The products and quantities in your order cart are stored in your own browser using local storage. They are not sent to Maison Asili until you submit an order request, and clearing your browser storage removes them.',
          'This website does not use advertising cookies or third-party analytics.'
        ]
      },
      {
        h: 'Service providers',
        p: [
          'Order request and enquiry emails are delivered through Resend, a transactional email provider, and the website is hosted on Vercel. These providers process the information needed to deliver the service on our behalf.',
          'We do not sell personal data.'
        ]
      },
      {
        h: 'Retention',
        p: [
          'Order requests and enquiries are retained as email correspondence for as long as needed to handle the request and any resulting business relationship, or as required by law.'
        ]
      },
      {
        h: 'Your rights',
        p: [
          'Under applicable data protection law you may request access to, correction of, or deletion of your personal data, restrict or object to its processing, and request data portability.',
          'To exercise these rights, write to info@maisonasili.com. You also have the right to complain to a data protection supervisory authority.'
        ]
      }
    ]
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro:
      'These terms describe how the Maison Asili website and wholesale order request process operate.',
    sections: [
      {
        h: 'Purpose of this website',
        p: [
          'This website presents the Maison Asili collection to professional buyers. It is a product catalogue and order-request platform, not a consumer checkout.',
          'No prices are displayed, no payment is taken and no order is accepted through this website.'
        ]
      },
      {
        h: 'Order requests',
        p: [
          'Submitting an order request does not create a contract or a binding order. It is a request for Maison Asili to confirm availability, trade pricing and fulfilment terms.',
          'A contract is formed only when Maison Asili confirms the commercial terms with you in writing.'
        ]
      },
      {
        h: 'Products and information',
        p: [
          'Product names, descriptions, ingredients, pack sizes and origins are provided in good faith from the information supplied to Maison Asili. Product photography is illustrative; natural variation in botanical ingredients may occur.',
          'Trade pricing, pack formats, minimum quantities and availability are provided individually on request.'
        ]
      },
      {
        h: 'Delivery, returns and liability',
        p: [
          'Delivery, fulfilment and returns are agreed individually with each trade partner and confirmed in writing before dispatch.',
          'Liability and governing-law provisions will be published once Maison Asili has confirmed its final commercial terms.'
        ]
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
      'Maison Asili supplies professional buyers. Fulfilment, delivery and trade terms are agreed individually for each order request.',
    sections: [
      {
        h: 'Wholesale fulfilment',
        p: [
          'Products are prepared in Berlin. Delivery methods, lead times and any fulfilment costs are confirmed with each trade partner once availability and trade pricing have been agreed.',
          'No shipping fees are calculated or charged through this website.'
        ]
      },
      {
        h: 'Delivery details',
        p: [
          'You can include a delivery address and preferred fulfilment information with your order request. These details help us prepare an accurate proposal; they do not confirm a delivery date.'
        ]
      },
      {
        h: 'Returns and discrepancies',
        p: [
          'Any issue with a delivered order should be reported to info@maisonasili.com so that it can be reviewed with you directly. Return and replacement terms are agreed individually with each trade partner.'
        ]
      },
      {
        h: 'Packaging',
        p: [
          'Packaging is chosen to protect glass, oils and botanical products in transit. Specific packaging requirements can be discussed as part of your order request.'
        ]
      }
    ]
  },
  {
    slug: 'impressum',
    title: 'Legal Notice / Impressum',
    intro:
      'Legal disclosure for this website. Details that only Maison Asili can confirm are marked as pending and will be published once available.',
    sections: [
      {
        h: 'Provider',
        p: [
          'Maison Asili',
          'Street and number: [to be supplied by Maison Asili]',
          'Postcode and city: [to be supplied by Maison Asili]',
          'Country: Germany'
        ]
      },
      {
        h: 'Represented by / Contact',
        p: [
          'Authorised representative: [to be supplied by Maison Asili]',
          'Email: info@maisonasili.com',
          'Telephone: [to be supplied by Maison Asili]'
        ]
      },
      {
        h: 'Register entry',
        p: ['Commercial register, register number, VAT identification number and responsible supervisory authority: [to be supplied by Maison Asili]']
      },
      {
        h: 'Editorial responsibility',
        p: ['Person responsible for editorial content under press law: [to be supplied by Maison Asili]']
      }
    ]
  }
];
