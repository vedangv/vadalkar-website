const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: 'Building\nStronger\nFoundations',
    heroSubtitle: 'Established 1994',
    heroDescription: 'A premier structural and civil engineering consultancy in Mumbai, delivering safe, innovative, and cost-effective solutions for over three decades.',
    services: [
      { _key: '1', title: "Structural Design", description: "Comprehensive design for residential, commercial, and industrial buildings using latest codes." },
      { _key: '2', title: "Structural Analysis", description: "Advanced computer-aided analysis using STAADPro and industry-leading software." },
      { _key: '3', title: "Structural Audit", description: "Thorough assessment of existing structures for safety and code compliance." },
      { _key: '4', title: "Repair Consulting", description: "Expert consultation for repair and rehabilitation of aging structures." },
      { _key: '5', title: "Proof Checking", description: "Independent verification of structural designs ensuring safety standards." },
      { _key: '6', title: "STAADPro Consulting", description: "Training and technical support for STAADPro software across Mumbai." },
    ],
    clients: [
      "CIDCO", "Western Railway", "Central Railway", "IIT Bombay", "MCGM", 
      "Shapoorji Pallonji", "Simplex Infrastructure", "Reliance", "BEST Undertaking", "Delhi Development Authority"
    ]
  }
  
const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroTitle: 'Three Decades of\nStructural Excellence',
    heroDescription: 'From our office opposite Dadar Station to projects across India, we have been shaping Mumbai\'s skyline since 1994.',
    whoWeAre: [
      { _key: '1', _type: 'block', style: 'normal', children: [{ _key: '1a', _type: 'span', marks: [], text: 'Vadalkar And Associates is a civil and structural consultancy conveniently located opposite Dadar Station (West), Mumbai. From 1994 till March 2006, the firm operated as "Vartak – Vadalkar And Associates" before continuing independently.' }] },
      { _key: '2', _type: 'block', style: 'normal', children: [{ _key: '2a', _type: 'span', marks: [], text: 'We have a well-experienced design team of qualified engineers and very senior structural engineers as advisers. We have successfully handled hundreds of projects to the entire satisfaction of our clients.' }] },
      { _key: '3', _type: 'block', style: 'normal', children: [{ _key: '3a', _type: 'span', marks: [], text: 'Beyond structural consulting, we provide training and technical support for STAADPro software package for many consultancy firms in Mumbai and work as software consultants to structural consultancy firms.' }] },
    ],
    activities: [
      "Designing, detailing, estimating, and occasional site supervision for industrial, commercial, residential, and utility projects",
      "Structural audit and assessment of existing buildings",
      "Repair and rehabilitation consulting for aging structures",
      "STAADPro software consulting, training, and technical support",
      "Proof checking and independent design verification",
      "Tender scrutiny and contractor selection recommendations",
      "Shuttering design and construction supervision",
    ],
    infrastructure: [
      { _key: '1', title: 'Office Space', description: 'Well-furnished office at Dadar, conveniently located opposite Dadar Station (W).' },
      { _key: '2', title: 'Computing Infrastructure', description: '10 workstations equipped with STAADPro and other structural analysis software.' },
      { _key: '3', title: 'Analysis Software', description: 'STAADPro, ETABS, and other industry-standard structural analysis packages.' },
      { _key: '4', title: 'Equipment', description: 'A1 size plotter and printers for producing large-format drawings and documentation.' },
      { _key: '5', title: 'Expert Team', description: 'Well-experienced design team of qualified engineers with senior structural engineers as advisers.' },
    ],
    milestones: [
      { _key: '1', year: "1994", title: "Founded as Vartak-Vadalkar & Associates", description: "Established the consulting practice as a partnership firm in Mumbai." },
      { _key: '2', year: "1996", title: "Major High-Rise Projects", description: "Took on landmark projects including Videocon Towers (S+25, two towers) in Kandivali." },
      { _key: '3', year: "2000s", title: "Expanded Portfolio", description: "Grew into industrial, commercial, infrastructure, and institutional projects across Maharashtra." },
      { _key: '4', year: "2006", title: "Rebranded as Vadalkar & Associates", description: "Continued independently under the leadership of Hemant Vadalkar, expanding the firm's capabilities." },
      { _key: '5', year: "Today", title: "35+ Years of Excellence", description: "Over 200 projects completed spanning 14+ sectors, with offices in Dadar and Vashi." },
    ]
  }

const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    heroTitle: 'Let\'s Build\nSomething Together',
    heroDescription: 'Whether you need a structural consultation, audit, or have a project in mind — we\'d love to hear from you.',
    offices: [
      {
        _key: '1',
        name: "Head Office — Dadar",
        address: "B-703, New Samadhan CHS Ltd, Senapati Bapat Road, Near Zarapkar, Opp. Dadar Stn. (W), Mumbai - 400 028",
        phone: "+91 22 2430 8872",
        cell: "+91 93225 32578",
      },
      {
        _key: '2',
        name: "Vashi Office",
        address: "C-482, II Floor, Vashi Plaza, Sector 17, Vashi, Navi Mumbai - 400 705",
      },
    ]
  }

  const siteSettings = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      experienceYears: 35,
      projectsDelivered: 370,
      sectorsServed: 14,
      officeLocations: 2,
      address: 'B-703, New Samadhan CHS Ltd, Senapati Bapat Road, Near Zarapkar, Opp. Dadar Stn. (W), Mumbai - 400 028',
      phone: '+91 22 2430 8872',
      email: 'vadalkar@gmail.com',
      whatsappParams: '919322532578'
  }
  
console.log(JSON.stringify(homePage))
console.log(JSON.stringify(aboutPage))
console.log(JSON.stringify(contactPage))
console.log(JSON.stringify(siteSettings))
