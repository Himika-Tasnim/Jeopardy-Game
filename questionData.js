// questionsData.js
const questions = [
  // Category 1 (index 0)
  {
    id: "0-1",
    category: "Market Systems & Livelihood Goals",
    points: 100,
    q: "What is the primary aim of the B4CA project?",
    correct: "To develop a sustainable, climate-resilient bamboo sector that enhances livelihoods.",
    options: ["Option A", "Option B", "Option C", "To develop a sustainable, climate-resilient bamboo sector that enhances livelihoods."]
  },
  {
    id: "0-2",
    category: "Market Systems & Livelihood Goals",
    points: 200,
    q: "Define Systemic Change in the context of the bamboo market system.",
    correct: "A transformational shift in how market actors, enablers, and support services interact to sustain inclusive growth.",
    options: ["Option A", "Stakeholder maps or influence-interest grids.", "Option B", "Option C"]
  },
  {
    id: "0-3",
    category: "Market Systems & Livelihood Goals",
    points: 300,
    q: "Name two principles of Market Systems Development emphasized in B4CA.",
    correct: "Systems thinking and systemic change.",
    options: ["Option A", "Systems thinking and systemic change.", "Option B", "Option C"]
  },
  {
    id: "0-4",
    category: "Market Systems & Livelihood Goals",
    points: 400,
    q: "How do value flows differ from product flows in a market system?",
    correct: "Product flows refer to physical goods moving along the chain, while income flows relate to monetary transactions and value distribution among actors.",
    options: ["Option A", "Product flows refer to physical goods moving along the chain, while income flows relate to monetary transactions and value distribution among actors.", "Option B", "Option C"]
  },
  {
    id: "0-5",
    category: "Market Systems & Livelihood Goals",
    points: 500,
    q: "Give an example of an enabler in the bamboo sector and its role.",
    correct: "A financial institution providing affordable loans to bamboo SMEs to expand their operations.",
    options: ["Option A", "A financial institution providing affordable loans to bamboo SMEs to expand their operations.", "Option B", "Option C"]
  },

  // Category 2 (index 1)
  {
    id: "1-1",
    category: "Stakeholder & Ecosystem Mapping",
    points: 100,
    q: "Name three key market actors in the bamboo value chain.",
    correct: "Producers, processors, buyers.",
    options: ["Option A", "Option B", "Option C", "Producers, processors, buyers."]
  },
  {
    id: "1-2",
    category: "Stakeholder & Ecosystem Mapping",
    points: 200,
    q: "What visual tool is commonly used for stakeholder mapping?",
    correct: "Stakeholder maps or influence-interest grids.",
    options: ["Option A", "Stakeholder maps or influence-interest grids.", "Option B", "Option C"]
  },
  {
    id: "1-3",
    category: "Stakeholder & Ecosystem Mapping",
    points: 300,
    q: "Why is stakeholder mapping important for market development?",
    correct: "To identify influence, relationships, and leverage points for effective intervention.",
    options: ["To identify influence, relationships, and leverage points for effective intervention.", "Option A", "Option B", "Option C"]
  },
  {
    id: "1-4",
    category: "Stakeholder & Ecosystem Mapping",
    points: 400,
    q: "Who are market enablers, and provide an example?",
    correct: "Actors or factors facilitating growth; e.g., government policy support.",
    options: ["Option A", "Actors or factors facilitating growth; e.g., government policy support.", "Option B", "Option C"]
  },
  {
    id: "1-5",
    category: "Stakeholder & Ecosystem Mapping",
    points: 500,
    q: "How can mapping relationships help address bottlenecks?",
    correct: "By visualizing weaknesses or gaps in connections, enabling targeted support.",
    options: ["Option A", "By visualizing weaknesses or gaps in connections, enabling targeted support.", "Option B", "Option C"]
  },

  // Category 3 (index 2)
  {
    id: "2-1",
    category: "Market Enablers & Service Delivery",
    points: 100,
    q: "Name one technical support service important in bamboo enterprise development.",
    correct: "Quality training in bamboo processing techniques.",
    options: ["Option A", "Option B", "Option C", "Quality training in bamboo processing techniques."]
  },
  {
    id: "2-2",
    category: "Market Enablers & Service Delivery",
    points: 200,
    q: "What role do policies play in enabling market growth?",
    correct: "They create an environment conducive to investment, trade, and sustainable practices.",
    options: ["They create an environment conducive to investment, trade, and sustainable practices.", "Option A", "Option B", "Option C"]
  },
  {
    id: "2-3",
    category: "Market Enablers & Service Delivery",
    points: 300,
    q: "How can digital platforms facilitate bamboo market linkages?",
    correct: "By connecting producers directly with buyers, providing market information, and increasing access.",
    options: ["Option A", "By connecting producers directly with buyers, providing market information, and increasing access.", "Option B", "Option C"]
  },
  {
    id: "2-4",
    category: "Market Enablers & Service Delivery",
    points: 400,
    q: "Give an example of a financial support service for bamboo entrepreneurs.",
    correct: "Microcredit or small business loans.",
    options: ["Option A", "Option B", "Microcredit or small business loans.", "Option C"]
  },
  {
    id: "2-5",
    category: "Market Enablers & Service Delivery",
    points: 500,
    q: "Describe a role-play scenario with a service provider that could be used as an activity.",
    correct: "Negotiating service terms with bamboo farmers for extension services.",
    options: ["Negotiating service terms with bamboo farmers for extension services.", "Option A", "Option B", "Option C"]
  },

  // Category 4 (index 3)
  {
    id: "3-1",
    category: "Value Chain Analysis & Product Development",
    points: 100,
    q: "What is the first step in value chain analysis?",
    correct: "Mapping all actors and activities from bamboo planting to end-product marketing.",
    options: ["Mapping all actors and activities from bamboo planting to end-product marketing.", "Option A", "Option B", "Option C"]
  },
  {
    id: "3-2",
    category: "Value Chain Analysis & Product Development",
    points: 200,
    q: "Identify a bottleneck commonly found in bamboo value chains.",
    correct: "Limited access to processing facilities.",
    options: ["Option A", "Limited access to processing facilities.", "Option B", "Option C"]
  },
  {
    id: "3-3",
    category: "Value Chain Analysis & Product Development",
    points: 300,
    q: "Name an opportunity for adding value in the bamboo sector.",
    correct: "Developing bamboo-based handicrafts or furniture.",
    options: ["Option A", "Developing bamboo-based handicrafts or furniture.", "Option B", "Option C"]
  },
  {
    id: "3-4",
    category: "Value Chain Analysis & Product Development",
    points: 400,
    q: "How does strengthening the value chain improve livelihood diversification?",
    correct: "By creating more income streams and enhancing market access.",
    options: ["Option A", "Option B", "By creating more income streams and enhancing market access.", "Option C"]
  },
  {
    id: "3-5",
    category: "Value Chain Analysis & Product Development",
    points: 500,
    q: "Which step involves identifying where further investment or innovation is needed?",
    correct: "Critical control point analysis.",
    options: ["Option A", "Option B", "Critical control point analysis.", "Option C"]
  },

  // Category 5 (index 4)
  {
    id: "4-1",
    category: "Systemic Change & Impact Measurement",
    points: 100,
    q: "Define resilience in the context of market systems.",
    correct: "The capacity of the market to withstand shocks and adapt over time.",
    options: ["The capacity of the market to withstand shocks and adapt over time.", "Option A", "Option B", "Option C"]
  },
  {
    id: "4-2",
    category: "Systemic Change & Impact Measurement",
    points: 200,
    q: "Name an indicator to measure systemic change in bamboo markets.",
    correct: "Increase in number of active market linkages or access to finance.",
    options: ["Option A", "Increase in number of active market linkages or access to finance.", "Option B", "Option C"]
  },
  {
    id: "4-3",
    category: "Systemic Change & Impact Measurement",
    points: 300,
    q: "Why is inclusivity important for systemic change?",
    correct: "To ensure benefits reach marginalized groups, fostering equitable growth.",
    options: ["Option A", "To ensure benefits reach marginalized groups, fostering equitable growth.", "Option B", "Option C"]
  },
  {
    id: "4-4",
    category: "Systemic Change & Impact Measurement",
    points: 400,
    q: "What is an example of a performance question used to assess progress?",
    correct: "Are more women participating in bamboo enterprise activities?",
    options: ["Option A", "Option B", "Are more women participating in bamboo enterprise activities?", "Option C"]
  },
  {
    id: "4-5",
    category: "Systemic Change & Impact Measurement",
    points: 500,
    q: "How can shared indicators promote systemic change?",
    correct: "They foster collective understanding and alignment among stakeholders.",
    options: ["Option A", "Option B", "They foster collective understanding and alignment among stakeholders.", "Option C"]
  },

  // Category 6 (index 5)
  {
    id: "5-1",
    category: "Business Development & Entrepreneurial Thinking",
    points: 100,
    q: "Name a key element of a simple business model for bamboo enterprises.",
    correct: "Value proposition for bamboo products.",
    options: ["Option A", "Option B", "Option C", "Value proposition for bamboo products."]
  },
  {
    id: "5-2",
    category: "Business Development & Entrepreneurial Thinking",
    points: 200,
    q: "What is Market-smart IGA, and why is it relevant?",
    correct: "Income-generating activity that aligns with market demand; vital for targeted livelihood support.",
    options: ["Income-generating activity that aligns with market demand; vital for targeted livelihood support.", "Option A", "Option B", "Option C"]
  },
  {
    id: "5-3",
    category: "Business Development & Entrepreneurial Thinking",
    points: 300,
    q: "Give an adult learning technique suitable for business training.",
    correct: "Storytelling or experiential exercises.",
    options: ["Option A", "Storytelling or experiential exercises.", "Option B", "Option C"]
  },
  {
    id: "5-4",
    category: "Business Development & Entrepreneurial Thinking",
    points: 400,
    q: "What is an essential component of developing a business model based on local market conditions?",
    correct: "Understanding local customer preferences and price points.",
    options: ["Option A", "Option B", "Understanding local customer preferences and price points.", "Option C"]
  },
  {
    id: "5-5",
    category: "Business Development & Entrepreneurial Thinking",
    points: 500,
    q: "How can entrepreneurs incorporate climate considerations into their business models?",
    correct: "Using sustainable harvesting or eco-friendly processing methods.",
    options: ["Using sustainable harvesting or eco-friendly processing methods.", "Option A", "Option B", "Option C"]
  },

  // Category 7 (index 6)
  {
    id: "6-1",
    category: "Developing Market Linkages & Inclusive Value Chains",
    points: 100,
    q: "Name one way to connect producers with buyers.",
    correct: "Through local cooperatives or digital marketplaces.",
    options: ["Option A", "Option B", "Option C", "Through local cooperatives or digital marketplaces."]
  },
  {
    id: "6-2",
    category: "Developing Market Linkages & Inclusive Value Chains",
    points: 200,
    q: "How do digital platforms help empower women and youth in bamboo markets?",
    correct: "By providing accessible channels for selling and information sharing.",
    options: ["Option A", "By providing accessible channels for selling and information sharing.", "Option B", "Option C"]
  },
  {
    id: "6-3",
    category: "Developing Market Linkages & Inclusive Value Chains",
    points: 300,
    q: "What is a key consideration when creating an inclusive market linkage plan?",
    correct: "Ensuring access and participation of marginalized groups.",
    options: ["Option A", "Ensuring access and participation of marginalized groups.", "Option B", "Option C"]
  },
  {
    id: "6-4",
    category: "Developing Market Linkages & Inclusive Value Chains",
    points: 400,
    q: "Name an activity to promote participation of women in bamboo enterprise development.",
    correct: "Training workshops tailored for women entrepreneurs.",
    options: ["Training workshops tailored for women entrepreneurs.", "Option A", "Option B", "Option C"]
  },
  {
    id: "6-5",
    category: "Developing Market Linkages & Inclusive Value Chains",
    points: 500,
    q: "How do cooperatives facilitate market linkages?",
    correct: "They aggregate supply, strengthen bargaining power, and access larger markets.",
    options: ["Option A", "Option B", "They aggregate supply, strengthen bargaining power, and access larger markets.", "Option C"]
  },

  // Category 8 (index 7)
  {
    id: "7-1",
    category: "Monitoring & Adaptive Management",
    points: 100,
    q: "What is the purpose of a monitoring framework?",
    correct: "To track progress and inform adaptive management decisions.",
    options: ["Option A", "Option B", "Option C", "To track progress and inform adaptive management decisions."]
  },
  {
    id: "7-2",
    category: "Monitoring & Adaptive Management",
    points: 200,
    q: "Name a visual tool used for participatory reflection.",
    correct: "Situation or progress maps, or dashboards.",
    options: ["Option A", "Situation or progress maps, or dashboards.", "Option B", "Option C"]
  },
  {
    id: "7-3",
    category: "Monitoring & Adaptive Management",
    points: 300,
    q: "Why are feedback loops critical in market system development?",
    correct: "They enable learning and adaptation to changing conditions.",
    options: ["Option A", "They enable learning and adaptation to changing conditions.", "Option B", "Option C"]
  },
  {
    id: "7-4",
    category: "Monitoring & Adaptive Management",
    points: 400,
    q: "What might be a key indicator in a bamboo sector monitoring system?",
    correct: "Number of new market linkages established.",
    options: ["Option A", "Number of new market linkages established.", "Option B", "Option C"]
  },
  {
    id: "7-5",
    category: "Monitoring & Adaptive Management",
    points: 500,
    q: "How can participatory reflection improve systemic thinking among stakeholders?",
    correct: "By involving them in evaluating progress and identifying adjustments.",
    options: ["Option A", "Option B", "By involving them in evaluating progress and identifying adjustments.", "Option C"]
  }
];

// If using modules, export:
export default questions;

// Or if no modules, you can just include this file in HTML and 'questions' will be global.
