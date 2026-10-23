import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, RotateCcw } from "lucide-react";
import { useState } from "react";
import alojamento from "./assets/projects/alojamento.webp";
import laundry from "./assets/projects/laundry.jpg";
import logovideira from "./assets/projects/logovideira.png";
import { WHATSAPP_LINK } from "./lib/whatsappButton";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  image?: string;
  imageFit?: "cover" | "contain";
  link?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-[1600px]"
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${project.title}: ${flipped ? "voltar" : "ver problema e solução"}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={`group grid h-full cursor-pointer transform-3d transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Front */}
        <article
          aria-hidden={flipped}
          className="[grid-area:1/1] backface-hidden flex flex-col border border-border-dim bg-bg transition-colors group-hover:border-ink/40 rounded-lg"
        >
          <div className="aspect-4/3 overflow-hidden border-b border-border-dim bg-surface rounded-t-lg">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${project.imageFit === "contain" ? "object-contain p-10" : "object-cover object-top"}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif italic text-6xl text-ink/25">{pad(index + 1)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-text-dim mb-4">
              <span>{pad(index + 1)} — {project.category}</span>
            </div>
            <h3 className="text-3xl font-serif leading-tight mb-3">{project.title}</h3>
            <p className="text-sm text-text-dim leading-relaxed mb-8">{project.description}</p>
            <span className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-accent">
              <RotateCcw className="w-3.5 h-3.5" />
              Problema e solução
            </span>
          </div>
        </article>

        {/* Back */}
        <article
          aria-hidden={!flipped}
          className="[grid-area:1/1] backface-hidden rotate-y-180 flex flex-col p-6 bg-ink text-bg rounded-lg"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-bg/50 mb-6">{pad(index + 1)} — {project.title}</span>

          <h4 className="font-serif italic text-2xl mb-2">O problema</h4>
          <p className="text-sm text-bg/70 leading-relaxed mb-8">{project.problem}</p>

          <h4 className="font-serif italic text-2xl mb-2">A solução</h4>
          <p className="text-sm text-bg/70 leading-relaxed mb-8">{project.solution}</p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-bg/15 text-xs uppercase tracking-[0.15em]">
            <span className="flex items-center gap-2 text-bg/50">
              <RotateCcw className="w-3.5 h-3.5" />
              Voltar
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={flipped ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="flex items-center gap-1 border-b border-bg/40 pb-0.5 hover:border-bg transition-colors"
              >
                Ver projeto
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </article>
      </div>
    </motion.li>
  );
}

export function App() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Reservas Diretas para Alojamento Local",
      category: "Full Stack",
      description: "Site de reservas em quatro idiomas com painel de gestão para dois alojamentos no Algarve.",
      problem: "A proprietária dependia de plataformas como Airbnb e Booking para receber reservas e não conseguia decidir quem ficava em cada alojamento.",
      solution: "Um site de reservas para dois alojamentos, em quatro idiomas, com pedidos de reserva, aprovação pela proprietária, pagamento e calendário de ocupação. Pedidos, preços, fotos e disponibilidade são geridos num único painel.",
      image: alojamento,
      link: "https://peragoldenstay.com/"
    },
    {
      id: 2,
      title: "Plataforma para Igrejas",
      category: "Full Stack",
      description: "Eventos, inscrições, amigo secreto e financeiro em um só lugar.",
      problem: "A gestão de contribuições, eventos, conteúdos e atividades da igreja estava espalhada, sem um lugar único para a equipe acompanhar tudo.",
      solution: "Site e painel de gestão para dízimos, ofertas, eventos, amigo secreto e banners. A equipe passou a ter a informação centralizada e uma rotina mais organizada.",
      image: logovideira,
      imageFit: "contain",
      link: "https://videiraportimao.pt/"
    },
    {
      id: 3,
      title: "Sistema de Apontamentos para Lavanderias",
      category: "Full Stack",
      description: "Controle de entradas, status do processo e entregas com histórico e busca.",
      problem: "Uma lavanderia industrial que atende hotéis precisava acompanhar máquinas, pesagens de roupa e os produtos usados na operação.",
      solution: "Sistema próprio para registrar lavagens, calandra, dobradora, pesagens e stock, com alertas de stock mínimo. A operação diária ficou reunida num sistema adaptado ao trabalho real da lavanderia.",
      image: laundry,
    },
  ];

  const services = [
    {
      title: "Desenvolvimento Frontend",
      description: "Interfaces responsivas e performáticas utilizando React, Next.js e Tailwind CSS.",
    },
    {
      title: "Sistemas Backend",
      description: "APIs robustas e escaláveis com Node.js, Express e bancos de dados modernos.",
    },
    {
      title: "UI/UX Design",
      description: "Design focado no usuário, priorizando clareza, estética e funcionalidade.",
    },
  ];

  const contacts = [
    { label: "Email", value: "brianrangel.dev@gmail.com", href: "mailto:brianrangel.dev@gmail.com" },
    { label: "LinkedIn", value: "in/brianrangel", href: "https://www.linkedin.com/in/brianrangel/" },
    { label: "GitHub", value: "brianrangeldev", href: "https://github.com/brianrangeldev" },
    { label: "WhatsApp", value: "+351 910 025 357", href: WHATSAPP_LINK },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border-dim bg-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif text-3xl italic text-accent">BR.</span>
          <div className="hidden md:flex items-center gap-10 text-sm text-text-dim">
            <a href="#about" className="hover:text-ink transition-colors">Sobre</a>
            <a href="#projects" className="hover:text-ink transition-colors">Projetos</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contato</a>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <button className="flex items-center justify-center gap-2 bg-ink text-bg px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-accent transition-colors" type="button">
              <span>Contrate-me</span>
              <WhatsappLogo size={18} />
            </button>
          </a>
        </div>
      </nav>

      <main className="relative pt-40 pb-16 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          id="about"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-40"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-border-dim pb-4 mb-12 text-xs uppercase tracking-[0.2em] text-text-dim">
            <span>Desenvolvedor de Software</span>
            <span className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Disponível para projetos
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[3.5rem] sm:text-7xl md:text-[9rem] font-serif leading-[0.9] tracking-tight mb-12"
          >
            Criando <br />
            Experiências <span className="italic text-accent">Digitais</span>.
          </motion.h1>

          <motion.div variants={itemVariants} className="grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 md:col-start-7 text-lg text-text-dim leading-relaxed">
              Olá, eu sou o Brian. Desenvolvedor focado em criar interfaces de alta performance
              e experiências memoráveis. Especialista em transformar ideias complexas em
              soluções elegantes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 mt-10 md:justify-end text-sm">
            <a href="https://github.com/brianrangeldev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-ink/30 pb-1 hover:text-accent hover:border-accent transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/brianrangel/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-ink/30 pb-1 hover:text-accent hover:border-accent transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </motion.div>
        </motion.section>

        {/* Projects */}
        <section id="projects" className="mb-40">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-5xl md:text-6xl font-serif">
              Projetos <span className="italic">Selecionados</span>
            </h2>
            <span className="font-serif text-2xl text-text-dim">({pad(projects.length)})</span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </ul>
        </section>

        {/* Skills / Services */}
        <section className="mb-40">
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-dim mb-10">O que eu faço</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, idx) => (
              <div key={service.title} className="border-t border-ink pt-6 space-y-4">
                <span className="font-serif italic text-accent text-xl">({String.fromCharCode(97 + idx)})</span>
                <h3 className="text-3xl font-serif">{service.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <footer id="contact" className="border-t border-ink pt-16 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.2em] text-text-dim mb-6">Contato</p>
              <h2 className="text-5xl md:text-6xl font-serif leading-[1.05] mb-6">
                Vamos <span className="italic text-accent">conversar</span>.
              </h2>
              <p className="text-text-dim leading-relaxed max-w-md mb-10">
                Estou disponível para oportunidades como desenvolvedor full stack, projetos freelance
                e colaborações. Mande uma mensagem e eu retorno o mais rápido possível.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:brianrangel.dev@gmail.com"
                  className="inline-flex items-center gap-2 bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Enviar email
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/25 px-6 py-3 rounded-full text-sm font-medium hover:border-ink transition-colors"
                >
                  <WhatsappLogo size={16} />
                  WhatsApp
                </a>
              </div>
            </div>

            <ul className="md:col-span-6 md:col-start-7 border-t border-border-dim self-end">
              {contacts.map((contact) => (
                <li key={contact.label} className="border-b border-border-dim">
                  <a
                    href={contact.href}
                    {...(contact.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-5"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim">{contact.label}</span>
                    <span className="truncate transition-colors group-hover:text-accent">{contact.value}</span>
                    <ArrowUpRight className="w-4 h-4 text-text-dim transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-24 pt-6 border-t border-border-dim flex justify-between gap-4 text-xs text-text-dim">
            <span>© {new Date().getFullYear()} Brian Rangel</span>
            <a href="#about" className="hover:text-ink transition-colors">Voltar ao topo ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
