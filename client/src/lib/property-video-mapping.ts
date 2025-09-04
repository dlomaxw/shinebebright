// Property-specific video mapping
export interface PropertyVideo {
  embedId: string;
  title: string;
  url: string;
  description: string;
}

export const PROPERTY_VIDEO_MAPPING: Record<string, PropertyVideo> = {
  // Luxury apartments and high-end properties - VR Experience
  'Icon 180 Luxury Complex': {
    embedId: 'eJVDb9imPSQ',
    title: 'Immersive VR Experience',
    url: 'https://youtu.be/eJVDb9imPSQ?si=YFv3ARKpPXvZc8Y1',
    description: 'Experience luxury living through immersive VR technology'
  },
  'Elite Pallazo Naguru': {
    embedId: 'eJVDb9imPSQ',
    title: 'Immersive VR Experience', 
    url: 'https://youtu.be/eJVDb9imPSQ?si=YFv3ARKpPXvZc8Y1',
    description: 'Explore luxury apartments with cutting-edge VR tours'
  },

  // Modern apartments and visualization - AR Demo
  'Embassy Towers Residency': {
    embedId: 'H0732NCswuk',
    title: 'AR Visualization Demo',
    url: 'https://youtu.be/H0732NCswuk?si=oH5I4iWaDHbE9-vh',
    description: 'See how AR technology brings residential design to life'
  },
  'The Horizon Residency': {
    embedId: 'H0732NCswuk',
    title: 'AR Visualization Demo',
    url: 'https://youtu.be/H0732NCswuk?si=oH5I4iWaDHbE9-vh', 
    description: 'Modern apartment visualization with AR technology'
  },

  // Property tours and residential viewing - Property Tour
  'Pearl View - 2 Bedroom Apartment': {
    embedId: 'v-O3NOg6NQE',
    title: 'Property Tour Experience',
    url: 'https://youtu.be/v-O3NOg6NQE?si=nF6IJDKC-G59E6DE',
    description: 'Virtual property tour showcasing apartment features'
  },
  'Pearl View - 3 Bedroom Apartment': {
    embedId: 'v-O3NOg6NQE',
    title: 'Property Tour Experience',
    url: 'https://youtu.be/v-O3NOg6NQE?si=nF6IJDKC-G59E6DE',
    description: 'Comprehensive virtual tour of spacious living spaces'
  },
  'Garnet Residency - 3 Bedroom Apartments': {
    embedId: 'v-O3NOg6NQE',
    title: 'Property Tour Experience',
    url: 'https://youtu.be/v-O3NOg6NQE?si=nF6IJDKC-G59E6DE',
    description: 'Experience panoramic views and luxury finishes'
  },

  // Interactive design and customization - Interactive Design
  'Cadenza Residence - One Bedroom': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solution',
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Interactive design solutions for premium residences'
  },
  'Cadenza Residence - Two Bedroom': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solution',
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Customizable luxury apartment design experience'
  },
  'Cadenza One Bedroom Nakasero': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solution',
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Premium Nakasero location with interactive design'
  },
  'Cadenza Two Bedroom Nakasero': {
    embedId: 'lVtxpXOFLws',
    title: 'Interactive Design Solution', 
    url: 'https://youtu.be/lVtxpXOFLws?si=u1Y_YgVR_ibcnAea',
    description: 'Luxury two bedroom with advanced design features'
  },

  // Training and real estate solutions - Training Platform
  'Skyrise Apartments': {
    embedId: 'MsWtobsdzHw',
    title: 'Training Simulation Platform',
    url: 'https://youtu.be/MsWtobsdzHw?si=hNssFJWAX6vH1Lj6',
    description: 'Advanced training for real estate professionals'
  },

  // Enterprise and commercial projects - Enterprise Solutions
  'The Bridge Kololo': {
    embedId: 'YjVWdQ4NdFM',
    title: 'Enterprise VR Solutions',
    url: 'https://youtu.be/YjVWdQ4NdFM?si=5dxelP1dvI3MadZw',
    description: 'Enterprise-level architectural visualization'
  },
  'The Bridge Kololo Pre-Launch': {
    embedId: 'YjVWdQ4NdFM',
    title: 'Enterprise VR Solutions',
    url: 'https://youtu.be/YjVWdQ4NdFM?si=5dxelP1dvI3MadZw',
    description: 'Pre-launch property marketing with VR technology'
  }
};

export const getPropertyVideo = (propertyTitle: string): PropertyVideo | null => {
  return PROPERTY_VIDEO_MAPPING[propertyTitle] || null;
};