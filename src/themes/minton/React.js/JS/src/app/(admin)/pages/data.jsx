const invoiceData = {
  invoice_id: "000028",
  customer: "Stanley Jones",
  notes: "Thanks a lot because you keep purchasing our products. Our company promises to provide high quality products for you as well as outstanding customer service for every transaction.",
  order_date: " Jan 17, 2019",
  order_status: "Unpaid",
  address: {
    owner: "Stanley Jones",
    line_1: "795 Folsom Ave, Suite 600",
    city: "San Francisco",
    state: "CA",
    zip: 94107,
    phone: "(123) 456-7890"
  },
  items: [{
    id: 1,
    name: "Web Design",
    description: "2 Pages static website - my website",
    hours: 22,
    hour_rate: "$30",
    total: "$660.0"
  }, {
    id: 2,
    name: "Software Development",
    description: "Invoice editor software - AB'c Software",
    hours: 112.5,
    hour_rate: "$35",
    total: "$3937.5"
  }],
  sub_total: 4597.5,
  discount: 459.75,
  total: 4137.75
};
const generalFaqs = [{
  id: 1,
  question: "What is Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 2,
  question: "Is safe use Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 3,
  question: "Why use Lorem Ipsum?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}, {
  id: 4,
  question: "When can be used?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}, {
  id: 5,
  question: "How many variations exist?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 6,
  question: "License & Copyright",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}];
const privacyFaqs = [{
  id: 1,
  question: "Why use Lorem Ipsum?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}, {
  id: 2,
  question: "When can be used?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}, {
  id: 3,
  question: "What is Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 4,
  question: "Is safe use Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 5,
  question: "How many variations exist?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 6,
  question: "License & Copyright",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}];
const supportFaqs = [{
  id: 1,
  question: "How many variations exist?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 2,
  question: "License & Copyright",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 3,
  question: "What is Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 4,
  question: "Is safe use Lorem Ipsum?",
  answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}, {
  id: 5,
  question: "Why use Lorem Ipsum?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}, {
  id: 6,
  question: "When can be used?",
  answer: "Lorem ipsum dolor sit amet, in mea nonumes dissentias dissentiunt, pro te solet oratio iriure. Cu sit consetetur moderatius intellegam, ius decore accusamus te. Ne primis suavitate disputando nam. Mutat convenirete."
}];
const pricingPlans = [{
  id: 1,
  name: "Starter Pack",
  icon: "fe-at-sign",
  price: 9,
  duration: "Month",
  features: ["5 GB Storage", "250 GB Bandwidth", "No Domain", "1 User", "Email Support", "24x7 Support"],
  isPopular: false
}, {
  id: 1,
  name: "Professional Pack",
  icon: "fe-users",
  price: 19,
  duration: "Month",
  features: ["10 GB Storage", "500 GB Bandwidth", "No Domain", "1 User", "Email Support", "24x7 Support"],
  isPopular: false
}, {
  id: 2,
  name: "Business Pack",
  icon: "fe-award",
  price: 29,
  duration: "Month",
  features: ["50 GB Storage", "900 GB Bandwidth", "2 Domain", "10 User", "Email Support", "24x7 Support"],
  isPopular: true
}, {
  id: 3,
  name: "Enterprise Pack",
  icon: "fe-aperture",
  price: 39,
  duration: "Month",
  features: ["100 GB Storage", "Unlimited Bandwidth", "10 Domain", "Unlimited User", "Email Support", "24x7 Support"],
  isPopular: false
}];
const maintenanceQuery = [{
  icon: "fe-target",
  title: "Why is the site down?",
  desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration."
}, {
  icon: "fe-clock",
  title: "What is the downtime?",
  desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical but the majority."
}, {
  icon: "fe-help-circle",
  title: "Do you need support?",
  desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embar.. no-reply@domain.com"
}];
export { invoiceData, pricingPlans, maintenanceQuery, generalFaqs, privacyFaqs, supportFaqs };