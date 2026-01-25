import React from "react";
import Image from "next/image";
// Adjust the path to where your CSS module is located
import styles from "../styles/frontend/brandDescription.module.css";
import { CarType } from "@/src/types/CarType";
import CTAButtons from "./CTAButtons";
// Assuming you have the FAQSection in the same folder or components folder

type Props = {
  brandName: string;
  cars?: CarType[];
};

// ------------------------------------------------------------------
// HELPER: Dynamic Content Generator
// This allows specific text for specific brands, falling back to generic text
// ------------------------------------------------------------------
const getBrandHighlights = (brand: string) => {
  const b = brand.toLowerCase();

  // 1. Supercar / Sport Brands
  if (["ferrari", "lamborghini", "mclaren", "porsche", "bugatti"].includes(b)) {
    return [
      {
        title: `${brand} Supercar (The Icon)`,
        features: [
          "Experience raw power with world-class aerodynamic engineering.",
          "0-100 km/h in mere seconds with hair-raising engine symphonies.",
          "The ultimate choice for making a grand entrance at VIP events.",
        ],
      },
      {
        title: `${brand} Convertible (Open Air)`,
        features: [
          "Enjoy the Dubai skyline with the top down in absolute style.",
          "Perfect blend of high-performance and open-air freedom.",
          "Unmatched road presence that turns heads on Sheikh Zayed Road.",
        ],
      },
      {
        title: `${brand} SUV (Sport Utility)`,
        features: [
          "Combines supercar DNA with practical luxury and space.",
          "Commanding road view with ferocious acceleration capabilities.",
          "Ideal for those who refuse to compromise on speed or comfort.",
        ],
      },
    ];
  }

  // 2. Ultra-Luxury / Chauffeur Brands
  if (["rolls royce", "bentley", "maybach"].includes(b)) {
    return [
      {
        title: `${brand} Saloon (The Pinnacle)`,
        features: [
          "The definition of automotive opulence and whisper-quiet cabins.",
          "Hand-crafted interiors featuring the finest leathers and woods.",
          "The preferred choice for royalty, diplomats, and executives.",
        ],
      },
      {
        title: `${brand} SUV (Grand Touring)`,
        features: [
          "Effortless power meets supreme elevated seating comfort.",
          "Floating-on-air suspension technology for the smoothest ride.",
          "Spacious enough for luggage without sacrificing elegance.",
        ],
      },
      {
        title: `${brand} Convertible (Grand Tourer)`,
        features: [
          "Yacht-like luxury for relaxed, sophisticated coastal cruising.",
          "Unrivaled craftsmanship with bespoke detailing throughout.",
          "A statement of success that speaks without shouting.",
        ],
      },
    ];
  }

  // 3. Everyday Luxury / Executive (Audi, BMW, Mercedes, Range Rover)
  // Default Fallback is also similar to this
  return [
    {
      title: `${brand} Sedan (Executive Class)`,
      features: [
        "The definitive executive choice offering power and refinement.",
        "Technology-rich cabins ensure productive business travel.",
        "Ideal for important meetings and polished professional entrances.",
      ],
    },
    {
      title: `${brand} SUV (Family & Comfort)`,
      features: [
        "Sophisticated design combined with genuine family practicality.",
        "Commanding size and stability for exceptional highway poise.",
        "Perfect for group travel, accommodating passengers and luggage.",
      ],
    },
    {
      title: `${brand} Coupe/Sport (Performance)`,
      features: [
        "A stunning blend of high-performance engines and sleek design.",
        "Delivers tenacious grip and a thrilling driving experience.",
        "Ideal for spirited drives and making a stylish statement.",
      ],
    },
    {
      title: `${brand} Special Edition (Flagship)`,
      features: [
        "Top-of-the-line specifications for the discerning driver.",
        "Enhanced power outputs and exclusive interior trims.",
        "The ultimate expression of the brand's engineering prowess.",
      ],
    },
  ];
};

// ------------------------------------------------------------------
// Sub-Component: PartnerSection
// ------------------------------------------------------------------
const PartnerSection: React.FC<{ brandName: string }> = ({ brandName }) => {
  return (
    <section className={styles.partnerSection}>
      <div className={styles.partnerContainer}>
        <h2 className={styles.partnerTitle}>
          Your Go-To Partner for an Unforgettable{" "}
          <span className={styles.capitalize}>{brandName}</span> Experience
        </h2>

        <div className={styles.partnerGrid}>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerCardTitle}>
              Zero-Hassle Booking and Delivery
            </h3>
            <p className={styles.partnerCardText}>
              You will enjoy our fully digital booking process, completed in
              mere minutes. We deliver your chosen{" "}
              <span className={styles.capitalize}>{brandName}</span> right to your
              doorstep anywhere in Dubai.
            </p>
          </div>

          <div className={styles.partnerCard}>
            <h3 className={styles.partnerCardTitle}>
              Transparent Pricing, Zero Surprises
            </h3>
            <p className={styles.partnerCardText}>
              We guarantee you only pay the quoted price—there are absolutely no
              commissions or hidden fees. Enjoy the finest{" "}
              <span className={styles.capitalize}>{brandName}s</span> at the most
              competitive and honest rates.
            </p>
          </div>

          <div className={styles.partnerCard}>
            <h3 className={styles.partnerCardTitle}>
              Exquisitely Maintained Fleet Guaranteed
            </h3>
            <p className={styles.partnerCardText}>
              Every <span className={styles.capitalize}>{brandName}</span> is
              rigorously inspected and flawlessly maintained before your rental
              begins. You are guaranteed a vehicle performing and looking like
              it just left the factory.
            </p>
          </div>
        </div>

        {/* Dynamic Image - Placeholder removed as directory 'brands header image' is missing */}
        <div className={styles.detailsImageWrapper}>
          {/* 
          <Image
            src={`/images/brands header image/${brandName}/${brandName} details.png`}
            alt={`${brandName} Details`}
            width={1200}
            height={600}
            className={styles.detailsImage}
            quality={90}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          */}
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------------------
// Sub-Component: PricingSection
// ------------------------------------------------------------------
const PricingSection: React.FC<Props> = ({ brandName, cars = [] }) => {
  const safeCars = Array.isArray(cars) ? cars : [];

  return (
    <section className={styles.pricingContainer}>
      <div className={styles.pricingContentWrapper}>
        <div className={styles.pricingHeader}>
          <h2 className={styles.pricingTitle}>
            Cheap Rent <span className={styles.capitalize}>{brandName}</span> Dubai
            Price — Transparent Rates
          </h2>
          <p className={styles.pricingDescription}>
            We let you hire your executive{" "}
            <span className={styles.capitalize}>{brandName}</span> rental in Dubai with
            complete confidence and total pricing transparency. Get behind the
            wheels of meticulously maintained{" "}
            <span className={styles.capitalize}>{brandName}</span> masterpieces
            starting for just{" "}
            <span className={styles.highlight}>AED 250 a day</span>. You are
            guaranteed the most competitive rates, with absolutely zero hidden
            fees or unexpected charges. Pay only your quoted price, securing the
            optimal value for your smart, executive rental in Dubai.
          </p>
        </div>

        <div className={styles.tableSection}>
          <h3 className={styles.tableSubtitle}>
            Here are our transparent{" "}
            <span className={styles.capitalize}>{brandName}</span> rental Dubai prices:
          </h3>

          <div className={styles.tableWrapper}>
            <table className={styles.priceTable}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.headCell}>
                    <span className={styles.capitalize}>{brandName}</span> Model
                  </th>
                  <th className={styles.headCellCenter}>Daily</th>
                  <th className={styles.headCellCenter}>Weekly</th>
                  <th className={styles.headCellCenter}>Monthly</th>
                </tr>
              </thead>
              <tbody className={styles.tableDivider}>
                {safeCars.length > 0 ? (
                  safeCars.map((car) => (
                    <tr key={car._id} className={styles.tableRow}>
                      <td className={styles.bodyCell}>{car.name}</td>
                      <td className={styles.bodyCellCenter}>
                        {car.pricing.daily
                          ? `AED ${car.pricing.daily}`
                          : "On Request"}
                      </td>
                      <td className={styles.bodyCellCenter}>
                        {car.pricing.daily
                          ? `AED ${(car.pricing.daily * 7 * 0.9).toFixed(0)}`
                          : "Contact Us"}
                      </td>
                      <td className={styles.bodyCellCenter}>
                        {car.pricing.daily
                          ? `AED ${(car.pricing.daily * 30 * 0.7).toFixed(0)}`
                          : "Contact Us"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={styles.tableRow}>
                    <td className={styles.bodyCell}>
                      <span className={styles.capitalize}>{brandName}</span> Fleet
                    </td>
                    <td className={styles.bodyCellCenter}>From AED 250</td>
                    <td className={styles.bodyCellCenter}>Contact Us</td>
                    <td className={styles.bodyCellCenter}>Contact Us</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.noteBox}>
          <p className={styles.noteText}>
            <span className={styles.fontSemibold}>Important note:</span> Our{" "}
            <span className={styles.capitalize}>{brandName}</span> rental prices are
            subject to change with different seasonal demand, availability, and
            hiring duration. Contact us for the latest and current quote.
          </p>
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------------------
// Sub-Component: ContactCTA
// ------------------------------------------------------------------
const ContactCTA: React.FC<{ brandName: string }> = ({ brandName }) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>
          Ready To Command Your <span className={styles.capitalize}>{brandName}</span>{" "}
          in Dubai?
        </h2>
        <p className={styles.ctaText}>
          Do not settle for an ordinary travel partner. Your executive{" "}
          <span className={styles.capitalize}>{brandName}</span> masterpiece awaits
          your command in the vibrant metropolis of Dubai. Contact us via
          WhatsApp or call us to finalize your effortless, seamless booking and
          delivery. Choose your elite model today and we will deliver it
          directly to your Dubai doorstep.
        </p>

        <CTAButtons
          whatsappMessage={`Hi, I want to rent a ${brandName} in Dubai`}
          whatsappLabel="WhatsApp Us"
          callLabel="Call Us Now"
        />
      </div>
    </section>
  );
};

// ------------------------------------------------------------------
// Sub-Component: MasterpieceSection (Dynamic)
// ------------------------------------------------------------------
const MasterpieceSection: React.FC<{ brandName: string }> = ({ brandName }) => {
  // Fetch specific highlights based on the brand
  const highlights = getBrandHighlights(brandName);

  return (
    <section className={styles.detailsSection}>
      <div className={`${styles.absolute} ${styles.inset0} ${styles.pointerEventsNone}`}>
        <div className={`${styles.blurBlob} ${styles.blobTopRight}`}></div>
        <div className={`${styles.blurBlob} ${styles.blobBottomLeft}`}></div>
      </div>

      <div className={styles.detailsContent}>
        {/* --- Top Masterpieces Section --- */}
        <div className={styles.detailsHeader}>
          <h2 className={styles.detailsTitle}>
            Top <span className={styles.capitalize}>{brandName}</span> Masterpieces to
            Rent in Dubai
          </h2>
          <p className={styles.detailsText}>
            Our meticulously selected fleet features the most sought-after{" "}
            <span className={styles.capitalize}>{brandName}</span> models. Each one
            offers you a distinct way to command Dubai's roads with confidence.
            Simply browse this expertly curated selection to find the
            masterpiece that perfectly matches your journey.
          </p>
        </div>

        <div className={styles.gradientCard}>
          <div className={styles.cardDecoration}></div>
          <div className={styles.cardPadding}>
            <div className={styles.modelList}>
              {/* Dynamic Mapping for Generic Support */}
              {highlights.map((item, index) => (
                <div key={index}>
                  <h3 className={styles.modelTitle}>
                    <span className={styles.bulletPoint}>●</span>
                    <span className={styles.capitalize}>{item.title}</span>
                  </h3>
                  <ul className={styles.featureList}>
                    {item.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- How To Rent Section --- */}
        <div className={`${styles.detailsHeader} ${styles.mt16}`}>
          <h2 className={styles.detailsTitle}>
            How To Rent an <span className={styles.capitalize}>{brandName}</span> In
            Three Easy Steps
          </h2>
        </div>

        <div className={styles.gradientCard}>
          <div className={styles.cardDecoration}></div>
          <div className={styles.cardPadding}>
            <div className={styles.stepsContainer}>
              {/* Step 1 */}
              <div className={styles.stepItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.stepIcon}
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
                <div>
                  <p className={styles.stepTitle}>1. Select Your Masterpiece</p>
                  <p className={styles.stepDesc}>
                    Browse our versatile, exclusive fleet to find the precise{" "}
                    <span className={styles.capitalize}>{brandName}</span> masterpiece
                    that perfectly matches your executive style.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={styles.stepItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.stepIcon}
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
                <div>
                  <p className={styles.stepTitle}>
                    2. Finalize Your Requirements
                  </p>
                  <p className={styles.stepDesc}>
                    Quickly contact us via Call or WhatsApp with your preferred
                    rental duration, delivery location in Dubai, and the exact
                    dates you require.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={styles.stepItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.stepIcon}
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <div>
                  <p className={styles.stepTitle}>3. Receive and Command</p>
                  <p className={styles.stepDesc}>
                    We deliver your confirmed{" "}
                    <span className={styles.capitalize}>{brandName}</span> directly to
                    your office, hotel, residence, or the airport terminal. It
                    arrives pristine, fully fueled, and instantly ready for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const FAQSection: React.FC<Props> = ({ brandName }) => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>FAQs</h2>
        </div>

        <div className={styles.faqGrid}>
          {/* Q1 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              How much does it cost to rent an{" "}
              <span className={styles.capitalize}>{brandName}</span> in Dubai?
            </h3>
            <p className={styles.answer}>
              The general cost to rent an{" "}
              <span className={styles.capitalize}>{brandName}</span> in Dubai starts at
              AED 250/day, AED 1,400/week, and AED 5,000/month, exclusive of the
              5% VAT.
            </p>
          </div>

          {/* Q2 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What are the requirements of renting an{" "}
              <span className={styles.capitalize}>{brandName}</span> in Dubai?
            </h3>
            <p className={styles.answer}>
              To rent an <span className={styles.capitalize}>{brandName}</span> in
              Dubai, you must be 21 years or more. UAE residents need their
              Emirates ID and UAE driving license. Tourists or visitors need
              their passport, visa copy, home country driving license, and an
              International Drivers Permit (IDP) if the license is not valid in
              the Emirates. Also, you'll need a credit card for the security
              deposit.
            </p>
          </div>

          {/* Q3 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What's included and excluded in the rental price?
            </h3>
            <p className={styles.answer}>
              The rental price includes a basic third-party liability insurance
              policy, a free child seat upon request, 24/7 roadside support, and
              standard mileage limits of 250 km/day, 1750 km/week, and 4500
              km/month. You also get free pick-up and delivery within Dubai. The
              price does not include fees for salik (toll), parking, fuel,
              chauffeur service, additional insurance, traffic fines, or extra
              mileage.
            </p>
          </div>

          {/* Q4 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Which <span className={styles.capitalize}>{brandName}</span> models can I
              rent in Dubai?
            </h3>
            <p className={styles.answer}>
              We offer an exclusive selection of{" "}
              <span className={styles.capitalize}>{brandName}</span> models for rent in
              Dubai. Depending on availability, this includes commanding
              supercars, high-performance SUVs, executive luxury sedans,
              aggressive coupes, and sophisticated family SUVs.
            </p>
          </div>

          {/* Q5 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Can I rent an <span className={styles.capitalize}>{brandName}</span> car
              at the airport?
            </h3>
            <p className={styles.answer}>
              Of course, you can rent an{" "}
              <span className={styles.capitalize}>{brandName}</span> at the airport.
              Provide us the details of your flight at the time of booking
              online, and we'll make sure your vehicle is available at the
              arrival terminal car park.
            </p>
          </div>

          {/* Q6 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Can tourists rent an{" "}
              <span className={styles.capitalize}>{brandName}</span> in Dubai with a
              foreign license?
            </h3>
            <p className={styles.answer}>
              Yes, tourists can rent an{" "}
              <span className={styles.capitalize}>{brandName}</span> in Dubai with
              their foreign license if it is recognized by the RTA. If it is not
              recognized by the RTA, they will need a supporting document, an
              IDP (International Drivers Permit).
            </p>
          </div>

          {/* Q7 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What is the minimum age to rent an{" "}
              <span className={styles.capitalize}>{brandName}</span>?
            </h3>
            <p className={styles.answer}>
              For luxury cars like{" "}
              <span className={styles.capitalize}>{brandName}</span> models, we require
              renters to be at least 21 years old. All drivers must also have
              had a valid driving license for at least one year.
            </p>
          </div>

          {/* Q8 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What is the cancellation policy for{" "}
              <span className={styles.capitalize}>{brandName}</span> rentals?
            </h3>
            <p className={styles.answer}>
              We have a flexible cancellation policy. Here's how it works:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>●</span>
                <span>Free cancellation up to 48 hours before pick-up.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>●</span>
                <span>50% charge if canceled 24–48 hours before pick-up.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>●</span>
                <span>
                  100% charge if canceled within 24 hours or in case of a
                  no-show.
                </span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>●</span>
                <span>Refunds are processed within 7–14 business days.</span>
              </li>
            </ul>
          </div>

          {/* Q9 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Is insurance included with the{" "}
              <span className={styles.capitalize}>{brandName}</span> rental?
            </h3>
            <p className={styles.answer}>
              Yes, a basic TPL is mandatory default for all rentals in Dubai.
              This insurance covers only third-party damage. You'll have to
              subscribe to more comprehensive policies like Collision Damage
              Waiver (CDW), Super Collision Damage Waiver (SCDW), Personal
              Accident Insurance (PAI), and Theft Protection (TP) for overall
              coverage.
            </p>
          </div>

          {/* Q10 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What is the fuel policy for{" "}
              <span className={styles.capitalize}>{brandName}</span> rentals?
            </h3>
            <p className={styles.answer}>
              We follow a "same-to-same" fuel policy. You will receive your{" "}
              <span className={styles.capitalize}>{brandName}</span> with a certain
              fuel level and should return it with the same amount. If you bring
              it back with less fuel, we charge only for the difference needed
              to refill.
            </p>
          </div>

          {/* Q11 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Are there any mileage limits on my{" "}
              <span className={styles.capitalize}>{brandName}</span> rental?
            </h3>
            <p className={styles.answer}>
              Yes. Every <span className={styles.capitalize}>{brandName}</span> rental
              comes with a standard mileage allowance of 250 km/day, 1,750
              km/week, and 4,500 km/month. If you exceed that limit, extra
              charges per kilometer will apply as per your agreement.
            </p>
          </div>

          {/* Q12 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Can I extend my <span className={styles.capitalize}>{brandName}</span>{" "}
              rental period if I need to?
            </h3>
            <p className={styles.answer}>
              Absolutely yes, you can extend your rental per your requirement.
              Just message us on WhatsApp at least 3 hours before your scheduled
              return. We'll check the vehicle's availability and, if possible,
              extend your booking instantly.
            </p>
          </div>

          {/* Q13 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Do you offer a chauffeur service with your{" "}
              <span className={styles.capitalize}>{brandName}</span> rentals?
            </h3>
            <p className={styles.answer}>
              Yes, we offer a professional chauffeur service for most vehicles,
              including <span className={styles.capitalize}>{brandName}</span> models.
              You can hire a trained driver for comfortable door-to-door
              service, airport transfers, or city tours. Let us know when you
              book if you'd like a chauffeur, and we'll arrange it.
            </p>
          </div>

          {/* Q14 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              What happens if the{" "}
              <span className={styles.capitalize}>{brandName}</span> rental gets
              damaged or scratched?
            </h3>
            <p className={styles.answer}>
              Upon any accident (even a minor scratch), you need to inspect the
              vehicle and file a police report right away. If the{" "}
              <span className={styles.capitalize}>{brandName}</span> comes back with
              scratches, dents, or traffic citations that weren't handled on the
              spot, we will charge for the cost of repairs or fines. However,
              rest assured that we'll always provide proof (photos or invoices)
              for any damage charges for full transparency.
            </p>
          </div>

          {/* Q15 */}
          <div className={styles.faqCard}>
            <h3 className={styles.question}>
              Do you offer long-term rental rates for{" "}
              <span className={styles.capitalize}>{brandName}</span> vehicles?
            </h3>
            <p className={styles.answer}>
              Yes, we do offer long-term rental for our vehicles, including{" "}
              <span className={styles.capitalize}>{brandName}s</span>. We have special
              discounted rates for long-term rentals. Whether you need an{" "}
              <span className={styles.capitalize}>{brandName}</span> for a week or a
              month, just let us know and we'll give you a personalized quote
              for a more cost-effective hire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
// ------------------------------------------------------------------
// Main Component: BrandDescription
// ------------------------------------------------------------------
export const BrandDescription: React.FC<Props> = ({ brandName, cars = [] }) => {
  // ----------------------------------------------------------------
  // LOGIC CHANGE: Check for Cars
  // If there are no cars, we return null immediately.
  // This ensures no details, pricing, or FAQs are shown for this brand.
  // ----------------------------------------------------------------
  if (cars.length == 0) {
    return null;
  } else
    return (
      <>
        <section className={styles.container}>
          <div className={styles.headerWrapper}>
            <div className={styles.textContent}>
              <p>
                Rent an <span className={styles.capitalize}>{brandName}</span> in Dubai
                to experience the effortless fusion of{" "}
                <span className={styles.highlight}>
                  groundbreaking automotive technology
                </span>{" "}
                and sophistication on the city's grandest stage. Let the{" "}
                <span className={styles.capitalize}>{brandName}</span> represent you
                and your ambition amongst Dubai's elite circles. Relish a
                progressive, intelligent luxury, serving your ultimate travel
                goal with confident and executive presence.
              </p>
              <p>
                Top-tier <span className={styles.capitalize}>{brandName}</span>{" "}
                selections instantly elevate your Dubai travel. You are
                guaranteed{" "}
                <span className={styles.highlight}>seamless booking</span> and
                stress-free logistics. Get your{" "}
                <span className={styles.highlight}>
                  <span className={styles.capitalize}>{brandName}</span> rentals in
                  Dubai
                </span>{" "}
                delivered to your doorstep—be it at your hotel, office, or the
                airport terminal.
              </p>
            </div>
          </div>

          <div className={styles.headerWrapper}>
            <h2 className={styles.sectionTitle}>
              Why Rent a <span className={styles.capitalize}>{brandName}</span> in
              Dubai
            </h2>
            <p className={styles.sectionSubtitle}>
              In a city defined by high performance and luxury,{" "}
              <span className={styles.capitalize}>{brandName}</span> perfectly matches
              this executive standard. Stop settling for ordinary transport and
              elevate your entire Dubai experience with a{" "}
              <span className={styles.capitalize}>{brandName}</span>.
            </p>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3 className={styles.cardTitle}>
                  Unmatched Versatility for Every Journey
                </h3>
                <p className={styles.cardText}>
                  <span className={styles.capitalize}>{brandName}</span> doesn't limit
                  you to one type of vehicle. This prestige brand flaunts a{" "}
                  <span className={styles.highlight}>versatile fleet</span>{" "}
                  offering everything from{" "}
                  <span className={styles.highlight}>executive sedans</span> to
                  spacious <span className={styles.highlight}>luxury SUVs</span>{" "}
                  and exhilarating{" "}
                  <span className={styles.highlight}>sports cars</span>. You are
                  always ensured the perfect, high-performance machine for your
                  specific requirement.
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3 className={styles.cardTitle}>
                  Exceptional Value and Accessibility
                </h3>
                <p className={styles.cardText}>
                  These vehicles represent a compelling balance of{" "}
                  <span className={styles.highlight}>high-end luxury</span>,{" "}
                  <span className={styles.highlight}>advanced technology</span>,
                  and truly accessible pricing. While offering undeniable
                  prestige, <span className="capitalize">{brandName}</span>{" "}
                  guarantees{" "}
                  <span className={styles.highlight}>
                    exceptional value for money
                  </span>{" "}
                  without ever compromising on superior quality or the driving
                  experience. It's a smart financial choice, allowing you to
                  command a premium ride.
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3 className={styles.cardTitle}>
                  Understated Executive Elegance
                </h3>
                <p className={styles.cardText}>
                  <span className="capitalize">{brandName}</span> uniquely
                  defines a clean,{" "}
                  <span className={styles.highlight}>
                    timeless sophistication
                  </span>
                  , avoiding the overly flamboyant excesses found elsewhere. It
                  allows you to make a powerful statement of success that is
                  confident, intelligent, and highly contemporary.{" "}
                  <span className="capitalize">{brandName}'s</span>{" "}
                  <span className={styles.highlight}>executive elegance</span>{" "}
                  ensures your reputation across every venue in the Emirates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Masterpieces (NOW DYNAMIC) */}
        <MasterpieceSection brandName={brandName} />

        {/* 3. Pricing Table */}
        <PricingSection brandName={brandName} cars={cars} />

        {/* 4. Partner Section */}
        <PartnerSection brandName={brandName} />

        {/* 5. Contact CTA */}
        <ContactCTA brandName={brandName} />

        {/* 6. FAQ Section */}
        <FAQSection brandName={brandName} />
      </>
    );
};
