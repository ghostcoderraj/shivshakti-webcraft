import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of plywood machinery do you manufacture?",
    answer: "We manufacture a comprehensive range of plywood and wood working machinery including Band Saw Blade Grinders, Finger Jointing Machines, Glue Spreaders, Belt Sanders, Wood Drying Chambers, Rip Saw Machines, Dust Collectors, and many more. All our machines are designed for industrial-grade performance.",
  },
  {
    question: "Do you provide installation and training services?",
    answer: "Yes, we provide complete installation support and operator training for all our machinery. Our technical team visits your facility to ensure proper setup and trains your staff on operation and maintenance procedures.",
  },
  {
    question: "What is the warranty period for your machines?",
    answer: "We offer a standard 1-year warranty on all our machinery covering manufacturing defects. Extended warranty options are also available. Our after-sales team ensures quick resolution of any issues.",
  },
  {
    question: "Do you export machinery outside India?",
    answer: "Yes, we export our machinery to various countries including Bangladesh, Nepal, Sri Lanka, African nations, and Middle East. Our machines meet international quality standards and we handle all export documentation.",
  },
  {
    question: "How can I get a quotation for machinery?",
    answer: "You can request a quotation by calling us at +91 76004 44740, emailing us at shivtechmachinery@gmail.com, or filling out the enquiry form on our website. Our sales team will respond within 24 hours with detailed pricing.",
  },
  {
    question: "What are your payment terms?",
    answer: "We accept advance payment for order confirmation with balance before dispatch. For bulk orders, we can discuss flexible payment terms. We accept bank transfers, cheques, and other standard business payment methods.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              FAQs
            </span>
            <h2 className="section-title mb-4">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle mx-auto">
              Find answers to common questions about our machinery and services.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
