import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    quote: "Big effort - high quality. Best Framer content out there.",
    author: "Jan Dittrich",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new website and it's absolutely ridiculous how valuable your content has been.",
    author: "Michael Riddering",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote: "Way too much value for free to be honest.",
    author: "James Traf",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of James Traf",
  },
];

export default function DemoOne() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <ScrollReelTestimonials testimonials={TESTIMONIALS} />
    </div>
  );
}
