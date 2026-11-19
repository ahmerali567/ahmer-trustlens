import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Download,
  Github,
  Layers3,
  Linkedin,
  Menu,
  Network,
  Play,
  Radar,
  ScanLine,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import aiRobotHero from "@/assets/ai-robot-hero.png";

const navItems = [
  ["Services", "services"],
  ["Case Studies", "work"],
  ["Research & Edge AI", "research"],
  ["Architecture", "architecture"],
  ["About", "about"],
  ["Contact", "contact"],
];

const capabilities = [
  {
    icon: Bot,
    number: "01",
    title: "Generative & Agentic AI",
    description:
      "Autonomous LangChain and LangGraph workflows, secure multi-source RAG, local and hosted inference, and multimodal voice agents.",
    tags: ["LangChain", "LangGraph", "RAG", "Groq", "Ollama"],
    features: [
      "Autonomous workflows with LangGraph-based agent orchestration.",
      "Secure, multi-source RAG across connected knowledge sources.",
      "Local and hosted inference, selected to fit data and latency constraints.",
      "Intelligent tool-using agents for repeatable business-process automation.",
    ],
    voiceAI: {
      title: "Voice AI & Calling Agents",
      description:
        "Voice automation for practical business conversations and customer-support workflows.",
      features: [
        "AI voice assistants with speech recognition, conversational voice interaction, and text-to-speech (TTS).",
        "Automated inbound and outbound calling agents for business and customer-support use cases.",
        "Conversational voice automation scoped to the service and telephony requirements.",
      ],
    },
  },
  {
    icon: ScanLine,
    number: "02",
    title: "Enterprise Computer Vision",
    description:
      "Low-latency RTSP systems for detection, persistent identity, tracking, pose intelligence, and adaptive OCR.",
    tags: ["YOLO11", "OSNet", "ByteTrack", "OpenCV"],
  },
  {
    icon: ServerCog,
    number: "03",
    title: "Production MLOps",
    description:
      "Containerized Python microservices designed for concurrency, database reliability, and continuous delivery.",
    tags: ["Docker", "AWS EC2", "Oracle", "CI/CD"],
  },
  {
    icon: Cpu,
    number: "04",
    title: "Edge & Applied Research",
    description:
      "Embedded vision, diffusion-based spatial modeling, multimodal security, and research translated into systems.",
    tags: ["PyTorch", "IoT", "U-Net", "Edge AI"],
  },
];

const expertiseAreas = [
  {
    title: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Model Training",
      "Model Fine-Tuning",
      "Model Evaluation",
      "Inference Optimization",
      "AI Integration",
    ],
  },
  {
    title: "LLM Engineering",
    items: [
      "Custom LLM Development",
      "LLM Fine-Tuning",
      "Prompt Engineering",
      "RAG Pipelines",
      "Embeddings",
      "Vector Databases",
      "Conversational AI",
    ],
  },
  {
    title: "Agentic AI",
    items: [
      "AI Agents",
      "Multi-Agent Workflows",
      "LangChain",
      "LangGraph",
      "Tool Calling",
      "Autonomous Workflows",
      "AI Automation",
    ],
  },
  {
    title: "Computer Vision",
    items: [
      "Object Detection",
      "Image Classification",
      "Face Recognition",
      "OCR",
      "Object Tracking",
      "Real-Time Video Analytics",
      "YOLO",
    ],
  },
  {
    title: "IoT & Intelligent Systems",
    items: [
      "IoT Integrations",
      "Connected Devices",
      "Sensor-Based Systems",
      "Intelligent Monitoring",
      "Automation",
    ],
  },
  {
    title: "Backend Engineering",
    items: [
      "Python",
      "FastAPI",
      "Django",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Oracle Database",
      "System Architecture",
    ],
  },
  {
    title: "Android & App Development",
    items: [
      "Android Development",
      "Kotlin",
      "MVVM Architecture",
      "Clean Architecture",
      "API Integration",
      "Authentication Systems",
      "Mobile Backend Development",
      "Full-Stack Mobile Applications",
    ],
  },
  {
    title: "Full-Stack Development",
    items: [
      "Frontend Development",
      "Backend Development",
      "Database Design",
      "API Architecture",
      "Application Integration",
      "Production Deployment",
    ],
  },
] as const;

const expandedServices = [
  "Android & Mobile App Development",
  "Full-Stack Mobile Application Development",
  "Custom Android Applications",
  "Backend & REST API Development",
  "Mobile App Backend Integration",
  "AI-Powered Mobile Applications",
  "Custom LLM Development & Fine-Tuning",
  "RAG-Based Knowledge Assistants",
  "Agentic AI & Automation",
  "Computer Vision Solutions",
  "IoT & Intelligent Monitoring Systems",
  "Full-Stack Web Application Development",
] as const;

type ProjectCategory =
  | "Computer Vision"
  | "Agentic AI"
  | "Edge & Research"
  | "Product Engineering"
  | "RegTech"
  | "Full-Stack Android & Social Media Application"
  | "AI-Powered Healthcare Assistant";
type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  status?: string;
  secondaryStatus?: { label: string; status: string };
  contribution: string;
  stack?: string[];
  technologyGroups?: { label: string; technologies: string[] }[];
  features?: string[];
  videoPlaceholder?: string;
  videos?: { src: string; poster: string; label: string }[];
  images?: { src: string; label: string; caption?: string }[];
  terminal?: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "Stock Exchange Market Intelligence Assistant",
    category: "Agentic AI",
    summary:
      "A voice-to-voice financial intelligence assistant for Stock Exchange Market disclosures and company research, supporting spoken questions and spoken answers.",
    challenge:
      "Make stock-market disclosures and company research easier to query by voice while preserving the source context behind each answer.",
    approach:
      "Whisper transcribes voice input; OCR extracts text from financial disclosures, and RAG retrieves context from ChromaDB alongside Oracle company data. Generated speech delivers the response, completing the voice-to-voice exchange.",
    outcome:
      "A spoken-question-to-spoken-answer workflow that retains the existing OCR, retrieval, and Oracle data path; the 900+ line system was refactored into clearer modules and hardened to reduce false company-symbol matches.",
    status: "Completed · Testing",
    contribution: "TrustLens · AI and backend engineering",
    stack: ["FastAPI", "Oracle DB", "ChromaDB", "Whisper", "ElevenLabs"],
    images: [
      {
        src: "/psx-notifier-one.png.jpeg",
        label: "Stock Exchange Market Intelligence Assistant answering company earnings questions",
      },
      {
        src: "/psx-notifier-two.png.jpeg",
        label:
          "Stock Exchange Market Intelligence Assistant answering live market disclosure questions",
      },
    ],
  },
  {
    number: "02",
    title: "Medicine Packaging Scanner",
    category: "Computer Vision",
    summary:
      "A live camera system that identifies medicine packaging and matches it against a large product catalog.",
    challenge:
      "Read package text reliably from a live RTSP feed despite motion, glare, and imperfect OCR output.",
    approach:
      "OpenCV detects a stable frame before adaptive OCR; fuzzy matching and confidence-gated language-model checks resolve candidate products against Oracle data.",
    outcome: "Constant-latency matching against a production catalog of more than 1,200 SKUs.",
    status: "Completed · Testing",
    contribution: "TrustLens · Computer vision and integration",
    stack: ["OpenCV", "EasyOCR", "Groq", "RapidFuzz", "Oracle"],
    videos: [
      { src: "/medicine.mp4.mp4", poster: "", label: "Live medicine recognition interface" },
    ],
  },
  {
    number: "03",
    title: "Multi-Camera Re-ID & Activity",
    category: "Computer Vision",
    summary:
      "A multi-camera vision pipeline for linking people across views and classifying activity in live office streams.",
    challenge:
      "Maintain useful identity continuity between cameras while avoiding brittle one-frame matching decisions.",
    approach:
      "YOLO detection and ByteTrack tracking feed OSNet re-identification and pose-based activity analysis, with configurable perimeter logic.",
    outcome: "Temporal voting helps suppress false re-matches across live camera streams.",
    status: "Completed · Testing",
    contribution: "TrustLens · Vision pipeline and model integration",
    stack: ["YOLO11", "ByteTrack", "OSNet", "SQLite"],
    videos: [
      { src: "/activity.mp4.mp4", poster: "", label: "Office activity classification demo" },
      { src: "/reid.mp4.mp4", poster: "", label: "Person re-identification demo" },
    ],
  },
  {
    number: "04",
    title: "Face Biometric Attendance",
    category: "Computer Vision",
    summary:
      "A deployed attendance service that processes camera input and connects face recognition to an existing enterprise database.",
    challenge:
      "Handle continuous recognition requests safely while preserving reliable database access in a production environment.",
    approach:
      "A FastAPI service uses a thread-locked queue for concurrent work and integrates with Oracle 11g through its thick client.",
    outcome: "Deployed on AWS EC2 with SSL and CI/CD delivery.",
    status: "Completed · Testing",
    contribution: "TrustLens · Service engineering and deployment",
    stack: ["FastAPI", "Oracle 11g", "AWS EC2", "Docker"],
    videos: [
      { src: "/biometric.mp4.mp4", poster: "", label: "Live face biometric recognition demo" },
    ],
  },
  {
    number: "05",
    title: "Spatial Prediction & PlantSR",
    category: "Edge & Research",
    summary:
      "Applied deep-learning research spanning wildfire-spread scenarios and crop-image super-resolution.",
    challenge:
      "Translate noisy, variable-resolution imagery into useful inputs for spatial and agricultural analysis.",
    approach:
      "Conditional diffusion models spatial scenarios, while PlantSR enhances UAV crop imagery for downstream disease classification.",
    outcome:
      "Purpose-built model architectures connect image enhancement to a practical classification task.",
    status: "Completed · Testing",
    contribution: "TrustLens · Applied ML research and model development",
    stack: ["PyTorch", "Conditional U-Net", "GOES-16", "UAV Vision"],
    images: [
      {
        src: "/plantsr-result.png.jpeg",
        label: "PlantSR super-resolution and crop disease classification result",
      },
    ],
  },
  {
    number: "06",
    title: "WhatsApp Intelligence Chatbot",
    category: "Agentic AI",
    summary:
      "Domain-focused WhatsApp assistants for patient support and donor communication, powered by a custom self-trained language model.",
    challenge:
      "Support natural business-specific conversations across distinct service journeys, rather than generic one-off responses.",
    approach:
      "A custom language model, conversation context, and workflow-specific handling support patient inquiries, urgent-care escalation, donor campaigns, and appointments.",
    outcome:
      "A reusable conversational foundation demonstrated across healthcare and donor-management use cases.",
    status: "Completed · Testing",
    contribution: "TrustLens · Language-model and conversational system engineering",
    stack: ["Custom LLM", "Python", "WhatsApp", "NLP", "Conversation Memory"],
    images: [
      {
        src: "/hospital-connect.png.jpeg",
        label: "Healthcare WhatsApp patient journey and urgent-care escalation demo",
      },
      {
        src: "/donor-management.png.jpeg",
        label: "Donor management WhatsApp campaign and appointment journey",
      },
    ],
  },
  {
    number: "07",
    title: "Business Website & Contact Platform",
    category: "Product Engineering",
    summary:
      "A responsive business website connecting a polished customer experience with working contact and email services.",
    challenge:
      "Bring a clear, animated brand experience together with practical lead capture and a production-ready backend.",
    approach:
      "React and Vite power the responsive frontend; FastAPI supports contact automation and the deployed VPS application.",
    outcome: "Delivered across interface, backend email functionality, and production deployment.",
    status: "Completed",
    contribution: "TrustLens · Full-stack engineering and delivery",
    stack: ["React", "Vite", "Tailwind", "FastAPI"],
    videos: [
      { src: "/netwave.mp4.mp4", poster: "", label: "Responsive business website walkthrough" },
    ],
  },
  {
    number: "08",
    title: "Bank Compliance & Transaction Management",
    category: "RegTech",
    summary:
      "A conversational assistant for navigating banking compliance guidance, paired with a transaction-monitoring module in development.",
    challenge:
      "Make banking compliance guidance easier to explore through plain-language questions while setting a clear path toward transaction monitoring.",
    approach:
      "A dedicated compliance overview pairs with a conversational interface for exploring banking regulations; transaction monitoring is being developed as a separate module.",
    outcome:
      "Compliance assistant completed and in testing, with a dedicated overview and chat interface; transaction monitoring remains in development.",
    status: "Completed · Testing",
    secondaryStatus: {
      label: "Transaction Monitoring module",
      status: "In Development",
    },
    contribution: "TrustLens · Compliance assistant and transaction management",
    stack: ["Regulatory AI", "Conversational interface", "Banking compliance"],
    images: [
      {
        src: "/trustlens-law-assistant.png",
        label: "Bank compliance assistant overview screen",
      },
      {
        src: "/trustlens-law-chat.png",
        label: "Bank compliance assistant conversational screen",
      },
    ],
  },
  {
    number: "09",
    title: "Hospital OPD Voice Queue Management System",
    category: "Product Engineering",
    summary:
      "A hospital outpatient queue-calling solution that notifies waiting patients by voice when their turn arrives.",
    challenge:
      "Coordinate OPD patient calling and make the next turn clear to people waiting in the hospital.",
    approach:
      "As a patient reaches the front of the OPD queue, a Python-based workflow sends the call text to pyttsx3 and plays a spoken announcement in the waiting area.",
    outcome:
      "A voice-based patient queue workflow that announces the next call when a patient’s turn arrives.",
    contribution: "Python queue workflow · pyttsx3 voice announcements",
    stack: ["Python", "pyttsx3", "Text-to-speech"],
    images: [
      {
        src: "/hospital-opd-voice-queue.png",
        label:
          "Concept visual of a modern OPD waiting area with a digital queue display and voice announcement system",
        caption: "Concept visual",
      },
    ],
  },
  {
    number: "10",
    title: "Fanfare",
    category: "Full-Stack Android & Social Media Application",
    summary:
      "A full-stack social media application developed from scratch, spanning Android development, backend engineering, API design, authentication, database architecture, and media handling.",
    challenge:
      "Build a cohesive social product across a feature-rich Android application and the backend services that support its everyday workflows.",
    approach:
      "The Android client is built with Kotlin, MVVM, and Clean Architecture. A Node.js and Express backend connects PostgreSQL through Prisma with Cloudinary media storage, email and SMS OTP, and Firebase Google Sign-In.",
    outcome:
      "An independently engineered product covering the Android application, backend, authentication, data layer, and media workflows.",
    contribution: "Ahmer Ali · Independently built from Android application to backend",
    technologyGroups: [
      {
        label: "Android application",
        technologies: [
          "Kotlin",
          "MVVM",
          "Clean Architecture",
          "Dagger Hilt",
          "Coroutines / Flow",
          "XML",
          "Retrofit",
          "Moshi",
          "ExoPlayer",
          "Navigation Component",
          "Room Database",
        ],
      },
      {
        label: "Backend",
        technologies: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Cloudinary"],
      },
      {
        label: "Authentication",
        technologies: ["Email OTP", "SMS OTP", "Firebase Google Sign-In"],
      },
    ],
    features: [
      "Social Media Feed",
      "Reels and Stories",
      "Automatically Generated Thumbnails",
      "Chat and Notifications",
      "Explore and Full-Text Search",
      "Hashtags",
      "Follow System",
      "Comments, Likes and Shares",
      "User Profiles",
      "Settings and Privacy Controls",
      "Live Cricket Scores",
      "Breaking News",
    ],
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_37636-18vjYadvou5yc6ryFQykrl9lPK7cNK.png",
        label: "Fanfare social story composer with photo and emoji controls",
        caption: "Stories & media composer",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_21315-eBJdSjeBoXJTaRUuAHhBWt4Ngy9nMz.png",
        label: "Fanfare social home feed with live cricket and breaking news cards",
        caption: "Feed, cricket & news",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_11946-2nHO0Kz6ZGSVDpt93RrcyqdICpToGn.png",
        label: "Fanfare six-digit verification screen on a mobile device",
        caption: "Authentication flow",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_31046-GGP48r55xquUf09oBaUsjzTWyVcnY6.png",
        label: "Fanfare social feed showing a restaurant post and engagement controls",
        caption: "Social feed post",
      },
    ],
    videoPlaceholder: "The Fanfare demo video will be added here.",
  },
  {
    number: "11",
    title: "SehatCare",
    category: "AI-Powered Healthcare Assistant",
    summary:
      "An AI-powered healthcare chatbot designed to simplify access to healthcare information and hospital services, including healthcare queries, appointment assistance, clinic timings, and hospital-specific information.",
    challenge:
      "Make hospital-specific information and routine service guidance easier to access through a contextual mobile conversation.",
    approach:
      "A custom LLM and retrieval-augmented generation bring hospital-specific knowledge into context-aware conversations, with mobile application integration for patient access.",
    outcome:
      "A reusable knowledge-assistant architecture that can also be adapted for business-specific support, intelligent customer service, and AI-powered mobile applications.",
    contribution: "TrustLens · Healthcare assistant and knowledge retrieval",
    technologyGroups: [
      {
        label: "AI and integration",
        technologies: [
          "Custom LLM",
          "Retrieval-Augmented Generation (RAG)",
          "Hospital-Specific Knowledge Retrieval",
          "Mobile Integration",
        ],
      },
    ],
    features: [
      "Context-Aware Healthcare Conversations",
      "Hospital-Specific Information Retrieval",
      "Appointment Assistance",
      "Clinic Timing Queries",
      "AI-Powered Healthcare Support",
      "Mobile Application Integration",
    ],
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_44285-iCZogsUhr1a9EGLbTip4h0CbmCCbxc.png",
        label: "SehatCare assistant answering a clinic-hours question in a dark mobile chat",
        caption: "Clinic-hours support",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_35516-qTLLIs1ACWIAcgSoGWzTfSk5QN7G6K.png",
        label: "SehatCare mobile chat composing a clinic-hours question",
        caption: "Mobile chat experience",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/videoframe_9250-KMuBcSSndrxxzjuJrVlyScxVHwsqzK.png",
        label: "SehatCare appointment guidance conversation in a light mobile chat",
        caption: "Appointment assistance",
      },
    ],
    videoPlaceholder: "The SehatCare demo video will be added here.",
  },
];

const filters = [
  "All",
  "Computer Vision",
  "Agentic AI",
  "Edge & Research",
  "Product Engineering",
  "RegTech",
  "Full-Stack Android & Social Media Application",
  "AI-Powered Healthcare Assistant",
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-signal">
      <span className="h-px w-8 bg-signal" />
      {children}
    </div>
  );
}

function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();
    const budget = String(form.get("budget") ?? "").trim();
    const timeline = String(form.get("timeline") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();
    if (!name || !company || !project || !budget || !timeline) {
      setError("Please complete all required fields.");
      return;
    }
    if ([name, company, project, budget, timeline, details].some((value) => value.length > 1000)) {
      setError("Please shorten your response.");
      return;
    }
    const subject = encodeURIComponent(`Architecture review request — ${company}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nProject type: ${project}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject context:\n${details}`,
    );
    setError("");
    setSent(true);
    window.location.href = `mailto:aliahmer056@gmail.com?subject=${subject}&body=${body}`;
  }

  if (sent) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center" role="status">
        <CheckCircle2 className="mb-5 size-10 text-signal" />
        <h3 className="text-xl font-semibold">Your email draft is ready.</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Send it from your email app and Ahmer will respond with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-4" : "space-y-5"} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-muted-foreground">
          Name *
          <Input
            name="name"
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className="mt-2 h-11"
          />
        </label>
        <label className="space-y-2 text-sm text-muted-foreground">
          Company *
          <Input
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Company name"
            className="mt-2 h-11"
          />
        </label>
        <label className="space-y-2 text-sm text-muted-foreground">
          Project type *
          <select
            name="project"
            defaultValue=""
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select a focus
            </option>
            <option>Computer Vision</option>
            <option>LLM / Agent</option>
            <option>Full-Stack AI System</option>
            <option>Android / Mobile Application</option>
            <option>Full-Stack Application</option>
            <option>Healthcare AI / RAG</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-muted-foreground">
          Budget *
          <select
            name="budget"
            defaultValue=""
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select range
            </option>
            <option>$2k – $5k</option>
            <option>$5k – $15k</option>
            <option>$15k – $40k</option>
            <option>$40k+</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2 text-sm text-muted-foreground">
        Timeline *
        <Input
          name="timeline"
          maxLength={120}
          placeholder="e.g. MVP in 8–10 weeks"
          className="mt-2 h-11"
        />
      </label>
      <label className="block space-y-2 text-sm text-muted-foreground">
        Project context
        <Textarea
          name="details"
          maxLength={1000}
          placeholder="Current system, data sources, constraints, and desired outcome..."
          className="mt-2 min-h-28"
        />
      </label>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" variant="signal" size="lg" className="w-full">
        Prepare request <Send />
      </Button>
    </form>
  );
}

function BookingDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-glass bg-surface-strong sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book an architecture review</DialogTitle>
          <DialogDescription>
            Share the system you are building. You’ll receive a focused technical response.
          </DialogDescription>
        </DialogHeader>
        <InquiryForm compact />
      </DialogContent>
    </Dialog>
  );
}

function Metric({ value, suffix, label }: { value?: number; suffix?: string; label: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!value || !ref.current) return;
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 900, 1);
        setDisplay(Number((value * (1 - Math.pow(1 - progress, 3))).toFixed(value % 1 ? 1 : 0)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="min-w-0 border-l border-border px-4 first:border-l-0 sm:px-6">
      <div className="font-mono text-lg font-semibold text-foreground sm:text-xl">
        {value ? display : "Global"}
        {suffix}
      </div>
      <div className="mt-1 text-xs leading-5 text-muted-foreground">{label}</div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-8">
        <button
          onClick={() => scrollTo("top")}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label="TrustLens home"
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-signal/40 bg-signal/10 text-signal">
            <ShieldCheck className="size-4" />
          </span>
          <span className="truncate text-base font-semibold tracking-tight">TrustLens</span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => id && scrollTo(id)}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </button>
          ))}
          <BookingDialog>
            <Button variant="signal" size="sm">
              Book Architecture Review <ArrowUpRight />
            </Button>
          </BookingDialog>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => {
                if (id) scrollTo(id);
                setOpen(false);
              }}
              className="block w-full border-b border-border py-3 text-left text-sm text-muted-foreground"
            >
              {label}
            </button>
          ))}
          <div className="pt-4">
            <BookingDialog>
              <Button variant="signal" className="w-full">
                Book Architecture Review
              </Button>
            </BookingDialog>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] scroll-mt-20 items-center overflow-hidden border-b border-border pt-24"
    >
      <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="hero-glow absolute right-0 top-16 h-2/3 w-2/3" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-12 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] xl:gap-12">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-signal">
              <Radar className="size-3.5" /> APPLIED AI · AGENTIC SYSTEMS · PRODUCT ENGINEERING
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem] xl:text-[4.75rem]">
              Trustworthy AI. <span className="text-signal">Engineered for the Real World.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              TrustLens is an AI and software engineering company founded by Ahmer Ali, building
              intelligent systems, AI-powered applications, mobile products, and scalable digital
              solutions through applied AI and production-grade engineering.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="signal" size="lg" onClick={() => scrollTo("work")}>
                Explore projects <ArrowDownRight />
              </Button>
              <BookingDialog>
                <Button variant="outlineGlow" size="lg">
                  Discuss a project <ArrowUpRight />
                </Button>
              </BookingDialog>
            </div>
          </div>
          <div className="relative hidden min-h-[34rem] lg:block">
            <div
              className="absolute inset-x-[8%] bottom-[5%] top-[8%] rounded-full border border-signal/20 bg-signal/5 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-[4%] top-[8%] aspect-square rounded-full border border-dashed border-signal/25 ai-orbit"
              aria-hidden="true"
            />
            <img
              src={aiRobotHero}
              alt="Futuristic AI robot with an illuminated neural network"
              width={1024}
              height={1280}
              className="ai-float relative z-10 mx-auto h-[34rem] w-full object-contain object-bottom drop-shadow-[0_0_32px_color-mix(in_oklab,var(--signal)_12%,transparent)]"
            />
            <div className="terminal-panel absolute bottom-4 left-0 z-20 w-64 rounded-md border border-glass bg-background/85 p-4 shadow-panel backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-destructive" />
                <span className="size-2 rounded-full bg-warning" />
                <span className="size-2 rounded-full bg-signal" />
                <span className="ml-auto font-mono text-[9px] text-muted-foreground">
                  TRUSTLENS / SYSTEMS
                </span>
              </div>
              <div className="space-y-2 font-mono text-[10px]">
                <p>
                  <span className="text-signal">›</span> vision · rtsp / tracking / ocr
                </p>
                <p>
                  <span className="text-signal">›</span> agents · retrieval / voice
                </p>
                <p>
                  <span className="text-signal">›</span> delivery · aws / docker / oracle
                </p>
              </div>
            </div>
            <div className="absolute right-0 top-24 z-20 rounded-sm border border-glass bg-background/75 px-3 py-2 font-mono text-[9px] uppercase text-signal backdrop-blur-md">
              Human-led · systems-minded
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 border-y border-border py-5 sm:grid-cols-4">
          <Metric value={2.5} suffix="+" label="Years in production" />
          <Metric value={10} suffix="+" label="Production deployments" />
          <Metric value={1200} suffix="+" label="SKUs at constant latency" />
          <Metric label="& enterprise delivery" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Core capabilities</SectionLabel>
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            Engineering intelligence that survives production.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            From camera feeds and model orchestration to databases and deployment, every layer is
            designed as one dependable system.
          </p>
        </div>
        <div className="grid border-l border-t border-border md:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group relative border-b border-r border-border bg-surface/30 p-7 transition-colors hover:bg-surface sm:p-9"
              >
                <div className="mb-12 flex items-start justify-between">
                  <Icon className="size-7 text-signal" />
                  <span className="font-mono text-xs text-muted-foreground">/{item.number}</span>
                </div>
                <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {item.features && (
                  <ul className="mt-6 grid gap-2 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-signal" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.voiceAI && (
                  <div className="mt-7 border-t border-border pt-5">
                    <h4 className="text-sm font-semibold text-foreground">{item.voiceAI.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.voiceAI.description}
                    </p>
                    <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
                      {item.voiceAI.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5">
                          <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-signal" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <div className="mt-16 border-t border-border pt-12">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel>Technical expertise</SectionLabel>
              <h3 className="text-2xl font-semibold sm:text-3xl">
                Full-cycle product engineering.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
              TrustLens builds complete products, from AI models and backend systems to Android
              applications and web platforms.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {expertiseAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-md border border-border bg-background p-5"
              >
                <h4 className="font-semibold">{area.title}</h4>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-border px-2 py-1 text-[10px] leading-4 text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <h4 className="font-semibold">Expanded services</h4>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {expandedServices.map((service) => (
                <li
                  key={service}
                  className="flex min-w-0 items-start gap-2.5 rounded-sm border border-border bg-background/70 px-3 py-3 text-sm leading-5 text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.images?.length || project.videos?.length || project.videoPlaceholder) {
    return (
      <div className="grid gap-3">
        {project.images?.length ? (
          <div className={`grid h-full gap-2 ${project.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {project.images.map((image) => (
              <figure
                key={image.src}
                className="relative min-h-64 overflow-hidden rounded-md border border-glass bg-panel"
              >
                <img
                  src={image.src}
                  alt={image.label}
                  loading="lazy"
                  className="h-full min-h-64 w-full object-contain"
                />
                <figcaption className="absolute left-3 top-3 rounded-sm border border-glass bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-signal backdrop-blur-md">
                  {image.caption ?? "System output"}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {project.videos?.length ? (
          <div className={`grid h-full gap-2 ${project.videos.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {project.videos.map((video) => (
              <div
                key={video.src}
                className="video-frame group/video relative min-h-64 overflow-hidden rounded-md border border-glass bg-panel"
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full min-h-64 w-full object-cover"
                  aria-label={video.label}
                />
                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-sm border border-glass bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-signal backdrop-blur-md">
                  <Play className="size-3 fill-current" /> Live demo
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {project.videoPlaceholder ? (
          <figure className="video-frame flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-glass bg-panel p-6 text-center">
            <Play className="mb-3 size-7 text-signal" aria-hidden="true" />
            <figcaption className="font-mono text-[10px] uppercase tracking-widest text-signal">
              Demo video · Coming soon
            </figcaption>
            <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
              {project.videoPlaceholder}
            </p>
          </figure>
        ) : null}
      </div>
    );
  }
  return (
    <div className="terminal-panel flex min-h-64 flex-col justify-center rounded-md border border-glass bg-panel p-6 shadow-panel">
      <div className="mb-5 flex items-center gap-2 border-b border-border pb-3 font-mono text-[10px] text-muted-foreground">
        <span className="size-2 rounded-full bg-signal" /> TRUSTLENS.RUNTIME
      </div>
      <div className="space-y-3 font-mono text-xs sm:text-sm">
        {project.terminal?.map((line, index) => (
          <p
            key={line}
            className={
              index === (project.terminal?.length ?? 0) - 1
                ? "text-signal"
                : "text-muted-foreground"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => projects.filter((item) => filter === "All" || item.category === filter),
    [filter],
  );
  return (
    <section id="work" className="scroll-mt-20 border-y border-border bg-surface/25 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Selected systems</SectionLabel>
        <div className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Proof, not promises.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Production systems engineered across finance, healthcare, security, research, and
              enterprise operations.
            </p>
          </div>
          <div
            className="flex min-w-0 max-w-full flex-wrap gap-2"
            role="group"
            aria-label="Filter case studies"
          >
            {filters.map((item) => (
              <Button
                key={item}
                variant={filter === item ? "signal" : "filter"}
                size="sm"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          {visible.map((project) => (
            <article
              key={project.number}
              className="animate-fade-in grid overflow-hidden rounded-md border border-border bg-card lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex flex-col p-6 sm:p-9">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-signal">CASE / {project.number}</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm border border-border px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground">
                      {project.category}
                    </span>
                    {project.status && (
                      <span className="rounded-sm border border-signal/30 bg-signal/5 px-2 py-1 font-mono text-[9px] uppercase text-signal">
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.summary}</p>
                {project.secondaryStatus && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs">
                    <span className="text-muted-foreground">{project.secondaryStatus.label}</span>
                    <span className="rounded-sm border border-accent/30 bg-accent/5 px-2 py-1 font-mono text-[9px] uppercase text-accent">
                      {project.secondaryStatus.status}
                    </span>
                  </div>
                )}
                <dl className="mt-6 grid gap-4 border-t border-border pt-5 text-sm leading-6">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-signal">
                      The challenge
                    </dt>
                    <dd className="mt-1.5 text-muted-foreground">{project.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-signal">
                      The approach
                    </dt>
                    <dd className="mt-1.5 text-muted-foreground">{project.approach}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-signal">
                      The outcome
                    </dt>
                    <dd className="mt-1.5 text-foreground">{project.outcome}</dd>
                  </div>
                </dl>
                {project.features?.length ? (
                  <details className="group mt-5 border-t border-border pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-signal">
                      <span>Product features · {project.features.length}</span>
                      <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
                    </summary>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 text-xs leading-5 text-muted-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-3.5 shrink-0 text-signal"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                <div className="mt-5 border-l-2 border-signal pl-4 text-xs leading-5 text-muted-foreground">
                  {project.contribution}
                </div>
                {project.technologyGroups ? (
                  <div className="mt-auto space-y-3 pt-7">
                    {project.technologyGroups.map((group) => (
                      <div key={group.label}>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-signal">
                          {group.label}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                          {group.technologies.map((technology) => (
                            <li
                              key={technology}
                              className="font-mono text-[10px] uppercase text-muted-foreground"
                            >
                              {technology}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : project.stack?.length ? (
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-7">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="min-h-64 border-t border-border bg-panel p-3 lg:border-l lg:border-t-0">
                <ProjectMedia project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const items = [
    [Database, "Data layer", "Oracle · SQL · ChromaDB"],
    [BrainCircuit, "Intelligence", "Agents · Vision · RAG"],
    [Layers3, "Services", "FastAPI · Queues · REST"],
    [Network, "Delivery", "Docker · AWS · CI/CD"],
  ] as const;
  return (
    <section id="architecture" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>System architecture</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
              Built for the messy reality between model and market.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Reliable AI is a systems problem. TrustLens engineers the data, inference, service,
              and infrastructure layers as one system.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {items.map(([Icon, title, detail], index) => (
              <div key={title} className="bg-background p-6">
                <div className="mb-9 flex items-center justify-between">
                  <Icon className="size-6 text-signal" />
                  <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section
      id="research"
      className="scroll-mt-20 border-y border-border bg-surface/25 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Research & edge AI</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-md border border-glass bg-card p-7 shadow-panel sm:p-10">
            <div className="mb-12 flex items-center justify-between">
              <ShieldCheck className="size-8 text-signal" />
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                Manuscript · In revision
              </span>
            </div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              MCAN: Multimodal Fusion for IoT Camera Security.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
              A decision-level cyber-physical fusion system for detecting replay attacks on IoT
              camera feeds—joining visual and network intelligence where single-mode defenses fail.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] text-signal">
                MULTIMODAL FUSION
              </span>
              <span className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
                REPLAY ATTACKS
              </span>
              <span className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
                IOT VISION
              </span>
            </div>
          </article>
          <div className="grid gap-4">
            <div className="rounded-md border border-border bg-background p-7">
              <Zap className="mb-8 size-6 text-accent" />
              <h3 className="text-xl font-semibold">Real-world constraints first.</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Thread safety, network latency, camera failure, model confidence, and database
                contention are treated as first-class engineering inputs.
              </p>
            </div>
            <div className="rounded-md border border-border bg-background p-7">
              <Sparkles className="mb-8 size-6 text-signal" />
              <h3 className="text-xl font-semibold">Research with a deployment path.</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                From conditional diffusion to task-aware super-resolution, experimentation stays
                connected to practical applications and measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleTags({ roles }: { roles: string[] }) {
  return (
    <ul aria-label="Professional roles" className="mt-4 flex flex-wrap gap-2">
      {roles.map((role) => (
        <li
          key={role}
          className="rounded-full border border-signal/20 bg-signal/5 px-3 py-1 text-xs text-foreground/90"
        >
          {role}
        </li>
      ))}
    </ul>
  );
}

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-border bg-surface/25 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Founder & company</SectionLabel>
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Independently founded. Built for the real world.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
            TrustLens is an AI and software engineering company founded and independently operated
            by Ahmer Ali.
          </p>
        </div>
        <div className="grid gap-5">
          <article className="overflow-hidden rounded-md border border-border bg-card sm:grid sm:grid-cols-[0.75fr_1fr]">
            <div className="relative min-h-72 sm:min-h-0">
              <img
                src="/ahmer-ali-portrait.png.jpeg"
                alt="Ahmer Ali, Founder of TrustLens"
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-top grayscale-[12%]"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  Founder | AI/ML Engineer | Software Developer
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Ahmer Ali</h3>
                <RoleTags
                  roles={[
                    "Founder",
                    "AI/ML Engineer",
                    "Machine Learning Engineer",
                    "LLM Engineer",
                    "Computer Vision Engineer",
                    "IoT Developer",
                    "Full-Stack & App Developer",
                  ]}
                />
                <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                  <p>
                    Ahmer Ali is the Founder of TrustLens, an AI and software engineering company
                    focused on developing intelligent, scalable, and production-ready technology
                    solutions.
                  </p>
                  <p>
                    He specializes in artificial intelligence, machine learning, deep learning, LLM
                    development, model training and fine-tuning, RAG systems, Agentic AI, computer
                    vision, IoT, backend engineering, and mobile application development.
                  </p>
                  <p>
                    His work spans the full development lifecycle—from researching problems and
                    designing system architectures to training and fine-tuning models, building APIs
                    and backend infrastructure, developing Android and web applications, and
                    deploying production-ready systems. He turns complex ideas into practical
                    products through AI engineering, software development, and modern application
                    technologies.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outlineGlow" size="sm">
                  <a href="/ahmer-ali-cv.pdf.pdf" target="_blank" rel="noreferrer">
                    Download CV <Download />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="https://github.com/ahmerali567" target="_blank" rel="noreferrer">
                    GitHub <Github />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a
                    href="https://www.linkedin.com/in/ahmer-ali-592735387"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <Linkedin />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border bg-surface/25 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionLabel>Start a conversation</SectionLabel>
          <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Bring the hard problem.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            Tell me what needs to work, what is failing today, and what production means in your
            environment.
          </p>
          <a
            href="mailto:aliahmer056@gmail.com"
            className="mt-10 inline-flex items-center gap-2 border-b border-signal pb-1 font-mono text-sm text-signal"
          >
            aliahmer056@gmail.com <ArrowUpRight className="size-4" />
          </a>
          <div className="mt-14 space-y-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <p>Available for global engagements</p>
            <p>Consulting & architecture reviews</p>
          </div>
        </div>
        <div className="rounded-md border border-glass bg-card p-6 shadow-panel sm:p-9">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function PortfolioSite() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Architecture />
        <Research />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 TrustLens · Founded by Ahmer Ali.</p>
          <button
            onClick={() => scrollTo("top")}
            className="inline-flex items-center gap-2 font-mono uppercase tracking-widest hover:text-signal"
          >
            Back to top <ChevronRight className="size-3 -rotate-90" />
          </button>
        </div>
      </footer>
    </div>
  );
}
