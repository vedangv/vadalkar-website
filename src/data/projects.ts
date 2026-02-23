export type Project = {
  title: string;
  category: string;
  client: string;
  architect?: string;
  year: string;
  cost?: string;
};

export const categories = [
  "All",
  "Residential",
  "Industrial",
  "Commercial",
  "Infrastructure",
  "Educational",
  "Repair",
  "Structural Audit",
  "Computer Aided Analysis",
  "Hospitals",
  "Hotels",
  "Sports Complex",
  "Communication Towers",
  "Shuttering Design",
];

export const projects: Project[] = [
  // === RESIDENTIAL ===
  { title: "G+5 Residential Building at Kondivita, Andheri (E)", category: "Residential", client: "M/s Mistry Builders", year: "1994", cost: "115" },
  { title: "Residential Building at Pali Hill, Bandra (G+7)", category: "Residential", client: "Western Railway", year: "1995", cost: "150" },
  { title: "Residential Buildings G+4 at Mahad, Chiplun and Dadar", category: "Residential", client: "Various Builders", year: "1996", cost: "350" },
  { title: "Videocon Towers S+25 at Kandivli (E), Mumbai — Two Towers", category: "Residential", client: "M/s Videocon Properties Ltd.", architect: "Hafeez Contractor", year: "1996", cost: "3000" },
  { title: "Residential Building G+7 at Pali Hill — Staff Quarters", category: "Residential", client: "Western Railway", architect: "S.N. Bhobe & Associates", year: "1996", cost: "280" },
  { title: 'Sterling Diamond Apartments S+7 at Mount Mary, Bandra', category: "Residential", client: "Shapoorji Pallonji & Co. Ltd.", year: "1997", cost: "150" },
  { title: "Mass Housing Project for Delhi Development Authority — LIG-MIG Units", category: "Residential", client: "Delhi Development Authority", architect: "Developments Consultants, New Delhi", year: "2001" },
  { title: "Mass Housing Project for CIDCO at Sector-7, Ghansoli, Navi Mumbai", category: "Residential", client: "Simplex Concrete Piles (I) Ltd.", architect: "Hafeez Contractor", year: "2002", cost: "4200" },
  { title: "Farm House at Tarapur", category: "Residential", client: "Brijendra Nath, Mumbai", architect: "Yatin Mhatre", year: "2004", cost: "20" },
  { title: "Bungalow at Palghar", category: "Residential", client: "Dr. Shah", architect: "Yatin Mhatre", year: "2005", cost: "30" },
  { title: "Bungalow at Panchgani", category: "Residential", client: "Private", architect: "Yatin Mhatre", year: "2005", cost: "25" },
  { title: "Farm House at Alibaug", category: "Residential", client: "Anish Shah, Mumbai", year: "2006", cost: "100" },
  { title: "Residential Bungalow at Bhandup for Udayshree CHS", category: "Residential", client: "Udayshree CHS, Mumbai", year: "2006", cost: "150" },
  { title: "S+22 Storey Building at Mahim, Mumbai", category: "Residential", client: "Pearl Developers", architect: "P.N. Bhobe & Associates", year: "2006", cost: "1500" },
  { title: "Bungalow G+3 at Bhandup", category: "Residential", client: "Mr. Tikam and Mr. Vartak", year: "2006", cost: "35" },
  { title: "Building for Institute of Chemical Technology, Matunga", category: "Residential", client: "ICT Matunga", architect: "Patel Batliwala & Associates", year: "2010", cost: "500" },
  { title: "Residential 22 Storey Tower at Girgaon, Mumbai", category: "Residential", client: "Samir Natu Developers", year: "2014", cost: "2400" },
  { title: "Boogie Bungalow at Alibaug", category: "Residential", client: "Rajesh Kapadia", architect: "Anish and Mohina Shah", year: "2015" },

  // === INDUSTRIAL ===
  { title: "Factory Building at Vashi, New Bombay", category: "Industrial", client: "M/s Rishabh Oil Industries", year: "1994", cost: "25" },
  { title: "Kalwa Carshed Extension — Heavy and Medium Repair Shed", category: "Industrial", client: "Central Railway", year: "1995", cost: "110" },
  { title: "Additions and Alterations to Factory at Ambernath and Roha", category: "Industrial", client: "M/s Dharamsi Morarji Chemical Co. Ltd.", year: "1995", cost: "25" },
  { title: "Additional Studios at Film City, Goregaon, Mumbai", category: "Industrial", client: "Film City, Govt. of Maharashtra", architect: "Pawar Wrade & Associates", year: "1995", cost: "80" },
  { title: "BPA Platform Extension at ONGC Site, Mumbai", category: "Industrial", client: "M/s SPIC-SMO, Navi Mumbai", year: "1997", cost: "10" },
  { title: "Godown and Sheds at Pathardi, Nashik", category: "Industrial", client: "Nashik Municipal Corporation", architect: "Sanjay Dhumne & Associates", year: "1998", cost: "110" },
  { title: "Extension to Packaging Shed for Floatglass India Ltd., Taloja", category: "Industrial", client: "Floatglass India Ltd.", year: "1999", cost: "50" },
  { title: "New Industrial Plant for Sarex Overseas Ltd., Tarapur", category: "Industrial", client: "M/s Sarex Overseas Ltd.", architect: "Ranadive Consultants", year: "2003", cost: "200" },
  { title: "Extension to Existing Plant, Sarex Overseas Ltd., Tarapur", category: "Industrial", client: "M/s Sarex Overseas Ltd.", architect: "Ranadive Consultants", year: "2004", cost: "200" },
  { title: "Daffodil Plant at Ambernath", category: "Industrial", client: "Dharamsi Morarji Chemical Co. Ltd.", year: "2004", cost: "75" },
  { title: "Factory Additions at Pawna, MIDC", category: "Industrial", client: "Rishabh Oil Industries", year: "2004", cost: "5" },
  { title: "Industrial Plant for Ashalanka Fragrance Pvt. Ltd., Sri Lanka", category: "Industrial", client: "Venus Techno Chem Pvt. Ltd.", year: "2005", cost: "75" },
  { title: "Design of Steel Container for Material Handling", category: "Industrial", client: "R.P. Engineers & Project Consultants", year: "2005" },
  { title: "Naphthalene Shed at Chandrapur", category: "Industrial", client: "Multi-organic Ltd.", year: "2009", cost: "75" },
  { title: "Solar Power Plant at Baramati", category: "Industrial", client: "BELECTRIC Photovoltaic India Pvt. Ltd.", year: "2011" },
  { title: "HCFC Scrubbing Plant at Dahej", category: "Industrial", client: "Protech Consulting Engineers", year: "2011", cost: "200" },
  { title: "Foundry Shed for Flame Industries at Jaysingpur", category: "Industrial", client: "Flame Industries", year: "2011", cost: "50" },
  { title: "Clarifier 43m Diameter Walkway Supporting Structure", category: "Industrial", client: "Varsha Engineering Services, Thane", year: "2011", cost: "25" },
  { title: "45m Span Truss for 1000GB Shed at Anand, Gujarat", category: "Industrial", client: "ELECON", year: "2011" },

  // === COMMERCIAL ===
  { title: "A to Z Departmental Stores — Additions and Alterations, Borivli", category: "Commercial", client: "A to Z Department Stores", year: "1996" },
  { title: "Madhuram Eye Clinic and Residential Building at Nandurbar", category: "Commercial", client: "Dr. P.R. Sonar, Nandurbar", year: "2000", cost: "25" },
  { title: "Tower 7-B at Bharat Diamond Bourse, BKC, Bandra", category: "Commercial", client: "Bharat Diamond Bourse", architect: "Raja Aederi Architects", year: "2000", cost: "2000" },
  { title: "BSEL Infotech Park at Vashi, Navi Mumbai", category: "Commercial", client: "M/s BSEL Information Systems Ltd.", architect: "Nitin Killawala", year: "2002", cost: "3000" },
  { title: "Integration Lab for Reliance Infocomm, TFIPL, Navi Mumbai", category: "Commercial", client: "M/s Kvaerner Power Gas India Ltd.", architect: "Ratan J. Batliboi", year: "2002", cost: "350" },
  { title: "G+2 Housing cum Commercial Complex at Pali, Raigad", category: "Commercial", client: "Parmar Developers, Pali", year: "2003", cost: "150" },
  { title: "IT Park: B+G+15 Storey Commercial Complex at Vashi", category: "Commercial", client: "Private Developer", year: "2006", cost: "3000" },
  { title: "Residential and Commercial Building at Nandurbar", category: "Commercial", client: "Atul Shah", architect: "Jayant Shah", year: "2006", cost: "150" },
  { title: "Maplawadi Market Building Analysis", category: "Commercial", client: "A.V. Kulkarni", year: "2009" },
  { title: "Redevelopment of Gokul Hall at Sion", category: "Commercial", client: "Gokul Hall Trust", architect: "Ratan J. Batliboi", year: "2009", cost: "2000" },
  { title: "Analysis and Design for ARCI Balapur, Hyderabad", category: "Commercial", client: "Madhav Chikodi & Associates", year: "2013" },
  { title: "Strong Room at JDC-BKC F2K Building, Mumbai", category: "Commercial", client: "Reliance Retail Ltd.", year: "2013" },
  { title: "Land Custom Station Buildings at Srimantpur, Tripura", category: "Commercial", client: "Govt. of Tripura", architect: "Ratan J. Batliboi", year: "2013", cost: "1000" },

  // === INFRASTRUCTURE ===
  { title: "Kharghar Railway Station cum Commercial Complex, Navi Mumbai", category: "Infrastructure", client: "CIDCO", architect: "Ratan Batliboi", year: "1997", cost: "1700" },
  { title: "Foot Over Bridges at Begdewadi, Kanhephata & Malavli Stations", category: "Infrastructure", client: "Maharashtra Steel Fabricators", year: "2002", cost: "60" },
  { title: "New Booking Office at Thane Railway Station East", category: "Infrastructure", client: "Central Railway", architect: "Impact Design Group", year: "2002", cost: "130" },
  { title: "Foot Over Bridge at Pune Railway Station", category: "Infrastructure", client: "Maharashtra Steel Fabricators", year: "2004", cost: "60" },
  { title: "Piling Gantry and Shuttering for Jetty at Mandwa, Alibaug", category: "Infrastructure", client: "Indiana Build", year: "2006", cost: "500" },
  { title: "80 MLD Sewage Treatment Plant at Sector 18, Airoli, Navi Mumbai", category: "Infrastructure", client: "Ramky Infrastructure Ltd.", architect: "S.N. Bhobe & Associates", year: "2006", cost: "1000" },
  { title: "100 MLD Sewage Treatment Plant at Sector 50, Nerul, Navi Mumbai", category: "Infrastructure", client: "Gharpure Engg. & Constructions Pvt. Ltd.", architect: "S.N. Bhobe & Associates", year: "2006", cost: "1200" },
  { title: "Storm Water Drain — Underground RCC Box, Bombay Central to Haji Ali", category: "Infrastructure", client: "M/s Ram Builders, Mumbai", year: "2007" },
  { title: "Piling Gantry for Western Railway Track over Mithi River", category: "Infrastructure", client: "J. Kumar", year: "2008" },
  { title: "Piling Gantry for Mundra Port Project, Gujarat (1300 MT)", category: "Infrastructure", client: "Simplex Infrastructure Ltd.", year: "2008", cost: "800" },
  { title: "Piling Gantry for ISPAT Industries Jetty Extension, Pen", category: "Infrastructure", client: "Paresh Constructions & Foundations Pvt. Ltd.", year: "2008", cost: "500" },
  { title: "Haji Ali to Worli Sea Face Beautification Project", category: "Infrastructure", client: "Municipal Corporation of Greater Mumbai", year: "2009", cost: "2500" },
  { title: "Piling Gantry for Dighi Port near Agardanda (150T)", category: "Infrastructure", client: "M/s Punj Lloyd Ltd.", year: "2009" },
  { title: "Platforms and Piling Gantry at Mundra Port (158T)", category: "Infrastructure", client: "Surabhi Enterprises", year: "2010" },
  { title: "Berth 8 Piling Gantry for Mormugao, Goa", category: "Infrastructure", client: "Kargwal Construction", year: "2010", cost: "50" },

  // === EDUCATIONAL ===
  { title: "Building Centre at Balewadi, Pune", category: "Educational", client: "M/s NICMAR", architect: "Mr. Gogate, Pune", year: "1994", cost: "7" },
  { title: "New Era English School Building S+4 at Nashik", category: "Educational", client: "Bohora Foundation Trust, Nashik", architect: "Dita & Associates", year: "2000", cost: "175" },
  { title: "De-addiction Centre at Lonavla", category: "Educational", client: "Don Bosco", architect: "Bharat Dalal, Dadar", year: "2003", cost: "70" },
  { title: "15 Storey School Building at Borivali, Mumbai", category: "Educational", client: "JBCN Education Pvt. Ltd.", architect: "Naren Kuwadekar & Associates", year: "2009", cost: "2000" },
  { title: "Goa Shipyard Modernization Phase 2 — Piling Gantry (300T)", category: "Educational", client: "Simplex Infrastructure Ltd.", year: "2009", cost: "250" },
  { title: "G+6 Building for DESE & CESE at IIT Bombay, Powai", category: "Educational", client: "Indian Institute of Technology (IIT) Bombay", architect: "Ratan Batliboi", year: "2013", cost: "4000" },
  { title: "G+6 Building for National Centre for Mathematics at IIT Bombay", category: "Educational", client: "Indian Institute of Technology (IIT) Bombay", architect: "Ratan Batliboi", year: "2014", cost: "1200" },

  // === REPAIR ===
  { title: "Repair Work and Waterproofing for Shah House at Worli", category: "Repair", client: "M/s Anagram Finance Ltd.", architect: "Rajesh Bhise", year: "1994", cost: "5" },
  { title: 'Repairs to Heritage "Contractor Building" at Ballard Estate', category: "Repair", client: "Shapoorji Data Processing", year: "1997", cost: "20" },
  { title: "Repairs & Rehabilitation to Chemical Plant-I at Patalganga", category: "Repair", client: "M/s Alkyl Amines Chemicals Ltd.", year: "1999", cost: "15" },
  { title: "Repair & Rehabilitation at Aristo Apartments, Andheri (E)", category: "Repair", client: "Aristo Apartments CHS Ltd.", year: "2000", cost: "50" },
  { title: "Repairs and Paving at Ellora Complex II, Dombivli (W)", category: "Repair", client: "Ellora Complex II CHS Ltd.", year: "2000", cost: "10" },
  { title: "Repairs to Residential Flat at Worli", category: "Repair", client: "Larsen & Toubro Ltd.", year: "2003", cost: "10" },
  { title: "Repair to Bracket on Approach Jetty, Pir Pau Pier", category: "Repair", client: "Mumbai Port Trust Ltd.", year: "2011", cost: "20" },

  // === HOSPITALS ===
  { title: "Hospital Building for Kalyan Municipal Corporation (G+4)", category: "Hospitals", client: "Kalyan Municipal Corporation", architect: "Jyoti Pendharkar, Vashi", year: "1995", cost: "220" },
  { title: "Additional Stair and Lift for Masina Hospital, Mumbai", category: "Hospitals", client: "Masina Hospital, Mumbai", year: "2001", cost: "20" },

  // === HOTELS ===
  { title: "Five Star Hotel at Mauritius — Main Building", category: "Hotels", client: "Sagar Hotels and Resorts, Mauritius", architect: "Reza Kabul, Mumbai", year: "1997", cost: "1500" },

  // === SPORTS COMPLEX ===
  { title: "Kridasankul at CIDCO for Nashik Municipal Corporation", category: "Sports Complex", client: "Nashik Municipal Corporation", architect: "Sanjay Dhumne & Associates", year: "2001", cost: "500" },

  // === COMMUNICATION TOWERS ===
  { title: "Communication Tower 30m at Vashi Railway Station", category: "Communication Towers", client: "Standard Constructions, Pune", year: "1998", cost: "8" },
  { title: "Various Communication Towers for Microwave Antennae (up to 60m)", category: "Communication Towers", client: "Standard Constructions, Pune", year: "1999" },

  // === STRUCTURAL AUDIT ===
  { title: "Preliminary Inspection Reports for Various Housing Societies", category: "Structural Audit", client: "Co-Operative Housing Societies", year: "1999" },
  { title: "Structural Audit for Industrial Building", category: "Structural Audit", client: "Flat Products Equipment, Andheri", year: "2003" },
  { title: "Structural Audit for Vatcha Villa, Tardeo", category: "Structural Audit", client: "Vatcha Villa, Tardeo, Mumbai", year: "2003" },
  { title: "Analysis of Collapsed Foot Over Bridge at Dombivli", category: "Structural Audit", client: "Maharashtra Steel Fabricators", year: "2004" },
  { title: "Structural Audit for Madhuban CHS, Chembur", category: "Structural Audit", client: "Madhuban CHS, Chembur", year: "2004" },
  { title: "Structural Audit for White Lily CHS, Dadar (W)", category: "Structural Audit", client: "White Lily CHS, Dadar (W)", year: "2004" },
  { title: "Structural Audit for New Vrindavan CHS, Dombivli (W)", category: "Structural Audit", client: "New Vrindavan CHS, Dombivli", year: "2004" },
  { title: "Feasibility Study of Existing Industrial Structure", category: "Structural Audit", client: "Radhakrishna Foodland Pvt. Ltd.", year: "2005", cost: "10" },
  { title: "Structural Audit for Manik Moti CHS, Khar", category: "Structural Audit", client: "Manik Moti CHS, Khar", year: "2008" },
  { title: "Structural Audit for Ellora CHS, Dombivli (W)", category: "Structural Audit", client: "Ellora CHS, Dombivli (W)", year: "2008" },
  { title: "Structural Audit for SBI Office Building, Belapur", category: "Structural Audit", client: "State Bank of India, Belapur", year: "2008" },
  { title: "Structural Audit for SmrutiKunj (Mama Kane) at Dadar", category: "Structural Audit", client: "Dilip Kane", year: "2009" },
  { title: "Structural Audit for Factory at Koparkhairane", category: "Structural Audit", client: "Friends Color Images Pvt. Ltd.", year: "2010" },
  { title: "Structural Audit for BEST Substation, Ballard Estate", category: "Structural Audit", client: "BEST Undertaking, Mumbai", year: "2010" },
  { title: "Structural Audit for Uday CHS, Dadar", category: "Structural Audit", client: "Uday CHS, Dadar", year: "2010" },
  { title: "Structural Audit for AIES School, Vakola", category: "Structural Audit", client: "AIES School", year: "2010" },
  { title: "Structural Audit for Karan CHS, Koparkhairane", category: "Structural Audit", client: "Karan CHS, Koparkhairane", year: "2010" },

  // === COMPUTER AIDED ANALYSIS ===
  { title: "Analysis of 25 Storey Matoshree Building at Dadar", category: "Computer Aided Analysis", client: "A.V. Kulkarni", year: "2003" },
  { title: "Analysis of Podium and Housing — Multistoreyed Towers at Dubai Marina", category: "Computer Aided Analysis", client: "Sterling", year: "2003" },
  { title: "Analysis of 25 Storey High-Rise Building at Dadar", category: "Computer Aided Analysis", client: "A.V. Kulkarni", year: "2004" },
  { title: "Analysis of 35 Storey High-Rise Building at Mulund", category: "Computer Aided Analysis", client: "JCV Structural Consultants", architect: "Hafeez Contractor", year: "2005" },
  { title: "STAADPro Analysis — Tribeca, Amanda, Luxuria, Mindspace, Sai Towers", category: "Computer Aided Analysis", client: "Epicon Consultants, Mumbai", year: "2007" },
  { title: "STAADPro Analysis — Ashok Garden, Antilia, InOrbit Mall Hyderabad", category: "Computer Aided Analysis", client: "Sterling Engineering Consultancy", year: "2007" },
  { title: "STAADPro Analysis — ICICI Building, Hyderabad", category: "Computer Aided Analysis", client: "Sterling Engineering Consultancy", year: "2008" },
  { title: "STAADPro Analysis — TSI Hyderabad (20L sq.ft), Chalet Hotel Phase 3", category: "Computer Aided Analysis", client: "Sterling Engineering Consultancy", year: "2008" },
  { title: "STAADPro Analysis — Mindspace Bldg 14 Airoli, Bldg 5A & 5B", category: "Computer Aided Analysis", client: "Epicon Consultants, Mumbai", year: "2008" },
  { title: "Steel Canopy Roof Analysis at IIT Convention Centre", category: "Computer Aided Analysis", client: "Sterling Engineering Consultancy", year: "2009" },
  { title: "3D Analysis of Jetty at Kochi", category: "Computer Aided Analysis", client: "MEC Consultants", year: "2011" },
  { title: "Analysis of S+33 Swastic Park Building at Bhandup", category: "Computer Aided Analysis", client: "Vikas Gokhale & Associates", year: "2011" },
  { title: "Haldia Jetty Analysis", category: "Computer Aided Analysis", client: "MEC Consultants", year: "2011" },
  { title: "Cable Analysis of 100m High Guy Mast Tower", category: "Computer Aided Analysis", client: "Clique Consultants, Mumbai", year: "2013" },

  // === SHUTTERING DESIGN ===
  { title: "Shuttering Design Consultancy for Various Projects", category: "Shuttering Design", client: "M/s Talib & Shamsi Constructions Pvt. Ltd.", year: "2004" },
  { title: "Shuttering Design Check for High-Rise Building", category: "Shuttering Design", client: "Talib & Shamsi", year: "2004" },
  { title: "Mivan Shuttering Check for High-Rise Towers at Prabhadevi", category: "Shuttering Design", client: "Simplex Concrete Piles Ltd.", architect: "P & T Consultants, Singapore", year: "2005" },
  { title: "Shuttering and Temporary Staging for High-Rise at Prabhadevi", category: "Shuttering Design", client: "M/s Simplex Concrete Piles (I) Ltd.", year: "2006" },
];
