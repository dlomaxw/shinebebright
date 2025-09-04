// Property-specific video mapping
export interface PropertyVideo {
  embedId: string;
  title: string;
  url: string;
  description: string;
}

export const PROPERTY_VIDEO_MAPPING: Record<string, PropertyVideo> = {
  // VR Experience demonstrations for luxury properties
  'Icon 180 Luxury Complex': {
    embedId: 'eJVDb9imPSQ',
    title: 'Immersive VR Experience',
    url: 'https://youtu.be/eJVDb9imPSQ?si=YFv3ARKpPXvZc8Y1',
    description: 'Experience luxury living through immersive VR technology'
  },
  'Elite Pallazo Naguru': {
    embedId: 'DRgk7JthhOU',
    title: 'VR Property Showcase',
    url: 'https://youtu.be/DRgk7JthhOU?si=SEnLM6eHEkGN6Sr9',
    description: 'Virtual reality demonstration for luxury apartment visualization'
  },

  // AR Visualization for modern residential properties
  'Embassy Towers Residency': {
    embedId: 'H0732NCswuk',
    title: 'AR Visualization Demo',
    url: 'https://youtu.be/H0732NCswuk?si=oH5I4iWaDHbE9-vh',
    description: 'Augmented reality technology for residential design visualization'
  },
  'The Horizon Residency': {
    embedId: 'Sd-Y8C3rLPE',
    title: 'Modern VR Solutions',
    url: 'https://youtu.be/Sd-Y8C3rLPE?si=k0qguIhFD_Ebk-_p',
    description: 'VR technology demonstration for modern residential experiences'
  },

  // Property tour technology for Pearl View properties
  'Pearl View - 2 Bedroom Apartment': {
    embedId: 'v-O3NOg6NQE',
    title: 'Virtual Property Tour',
    url: 'https://youtu.be/v-O3NOg6NQE?si=nF6IJDKC-G59E6DE',
    description: 'Virtual tour technology for apartment viewing experiences'
  },
  'Pearl View - 3 Bedroom Apartment': {
    embedId: 'IacrmhU2Zn0',
    title: 'Immersive Property Experience',
    url: 'https://youtu.be/IacrmhU2Zn0?si=gSCu8Vl_k7hszXnC',
    description: 'Advanced VR technology for spacious apartment exploration'
  },

  // Garnet Residency with premium experience technology
  'Garnet Residency - 3 Bedroom Apartments': {
    embedId: 'olz3JbY54AM',
    title: 'Premium VR Experience',
    url: 'https://youtu.be/olz3JbY54AM?si=ijOa3cmKeq62oUaF',
    description: 'High-end virtual reality experience for luxury apartment viewing'
  },

  // Interactive design solutions for Cadenza properties
  'Cadenza Residence - One Bedroom': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solutions',
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Interactive VR design solutions for premium residential spaces'
  },
  'Cadenza Residence - Two Bedroom': {
    embedId: 'gwnx16Cwjdo',
    title: 'Advanced VR Design Technology',
    url: 'https://youtu.be/gwnx16Cwjdo?si=SPOnWYcJv_zwg8My',
    description: 'Advanced virtual reality design and visualization technology'
  },
  'Cadenza One Bedroom Nakasero': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solutions',
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Interactive VR design solutions for Nakasero premium location'
  },
  'Cadenza Two Bedroom Nakasero': {
    embedId: 'gwnx16Cwjdo',
    title: 'Advanced VR Design Technology',
    url: 'https://youtu.be/gwnx16Cwjdo?si=SPOnWYcJv_zwg8My',
    description: 'Advanced VR technology for luxury Nakasero apartment design'
  },

  // Training and professional solutions
  'Skyrise Apartments': {
    embedId: 'MsWtobsdzHw',
    title: 'Real Estate VR Training',
    url: 'https://youtu.be/MsWtobsdzHw?si=hNssFJWAX6vH1Lj6',
    description: 'VR training and simulation platform for real estate professionals'
  },

  // Enterprise solutions for Bridge properties
  'The Bridge Kololo': {
    embedId: 'YjVWdQ4NdFM',
    title: 'Enterprise VR Solutions',
    url: 'https://youtu.be/YjVWdQ4NdFM?si=5dxelP1dvI3MadZw',
    description: 'Enterprise-level VR solutions for commercial property visualization'
  },
  'The Bridge Kololo Pre-Launch': {
    embedId: 'YjVWdQ4NdFM',
    title: 'Pre-Launch VR Marketing',
    url: 'https://youtu.be/YjVWdQ4NdFM?si=5dxelP1dvI3MadZw',
    description: 'VR marketing solutions for pre-launch property campaigns'
  }
};

export const getPropertyVideo = (propertyTitle: string): PropertyVideo | null => {
  return PROPERTY_VIDEO_MAPPING[propertyTitle] || null;
};