import {
  ArrowRight,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/heroAbout.jpeg";
const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping to get your favorite products to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Your transactions are protected with industry-standard security.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "Every product is carefully selected to ensure exceptional quality.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Our support team is always ready to help whenever you need us.",
  },
];

const stats = [
  {
    value: "10K+",
    label: "Happy Customers",
  },
  {
    value: "250+",
    label: "Products",
  },
  {
    value: "98%",
    label: "Positive Reviews",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-background text-white">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-28 pb-24 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-orange-primary/10 flex items-center justify-center">
          <Package className="text-orange-primary" size={38} />
        </div>

        <h1 className="mt-8 text-4xl md:text-6xl font-bold">
          About <span className="text-orange-primary">SellOut</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-text-secondary leading-8">
          At SellOut, we believe online shopping should be simple, secure, and
          enjoyable. Our mission is to connect customers with quality products
          while delivering an exceptional shopping experience from start to
          finish.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-10 inline-flex items-center gap-2 bg-orange-primary hover:opacity-90 transition px-6 py-3 rounded-lg font-semibold"
        >
          Shop Now
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-2xl bg-surface h-105 flex items-center justify-center w-8-10 overflow-hidden">
            <img src={heroImg} className="w-full h-full object-cover" alt="" />
          </div>

          <div>
            <span className="text-orange-primary font-semibold uppercase tracking-wider">
              Our Story
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Building trust through every order
            </h2>

            <p className="mt-6 text-text-secondary leading-8">
              SellOut was created with one goal: to make online shopping easier,
              faster, and more reliable. We carefully select every product to
              ensure quality and value, giving our customers confidence with
              every purchase.
            </p>

            <p className="mt-5 text-text-secondary leading-8">
              Whether you're shopping for everyday essentials or something
              special, we're committed to delivering a seamless experience
              backed by secure payments, fast shipping, and dedicated customer
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-orange-primary">SellOut?</span>
          </h2>

          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Everything we do is focused on creating the best shopping experience
            for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-surface rounded-xl p-6 border border-divider hover:border-orange-primary transition"
              >
                <div className="w-14 h-14 rounded-lg bg-orange-primary/10 flex items-center justify-center">
                  <Icon size={28} className="text-orange-primary" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 text-text-secondary leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface rounded-xl py-10 text-center"
            >
              <h3 className="text-4xl font-bold text-orange-primary">
                {stat.value}
              </h3>

              <p className="mt-3 text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-surface rounded-2xl p-10 text-center">
          <h2 className="text-4xl font-bold">
            Our <span className="text-orange-primary">Mission</span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-text-secondary leading-8">
            We strive to make every shopping experience effortless by offering
            premium products, transparent pricing, secure checkout, and
            outstanding customer service. Every order is an opportunity to earn
            your trust.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-2xl bg-orange-primary text-center py-16 px-8">
          <h2 className="text-4xl font-bold">
            Ready to discover amazing products?
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-white/90">
            Explore our collection and experience shopping designed around
            quality, convenience, and trust.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-background text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition"
          >
            Start Shopping
          </button>
        </div>
      </section>
    </main>
  );
}
