import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSite } from "@/components/portfolio-site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustLens — AI & Software Engineering by Ahmer Ali" },
      {
        name: "description",
        content:
          "TrustLens is an AI and software engineering company founded by Ahmer Ali, building intelligent systems, AI-powered applications, mobile products, and scalable digital solutions through applied AI and production-grade engineering.",
      },
      { property: "og:title", content: "TrustLens — AI & Software Engineering by Ahmer Ali" },
      {
        property: "og:description",
        content:
          "TrustLens is an AI and software engineering company founded by Ahmer Ali, building intelligent systems, AI-powered applications, mobile products, and scalable digital solutions through applied AI and production-grade engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PortfolioSite />;
}
