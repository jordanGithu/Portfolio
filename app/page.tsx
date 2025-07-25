"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Download,
  ExternalLink,
  Users,
  Target,
  Shield,
  MessageCircle,
  Music,
  Brush,
  Dumbbell,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react"
import ContactForm from '../components/ContactForm'
import InfoCard from '@/components/ui/InfoCard'
import SkillBadge from '@/components/ui/SkillBadge'
import ProjectCard from '@/components/ui/ProjectCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

export default function OnePunchManPortfolio() {
  const [activeSection, setActiveSection] = useState("accueil")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [themeTransition, setThemeTransition] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const emblaApiRef = useRef<UseEmblaCarouselType[1] | null>(null);
  const [formationHoverDir, setFormationHoverDir] = useState<'left' | 'right' | null>(null);
  const [formationDropped, setFormationDropped] = useState(false);
  const [experienceHoverDir, setExperienceHoverDir] = useState<'left' | 'right' | null>(null);
  const [experienceDropped, setExperienceDropped] = useState(false);
  const [interetHoverDir, setInteretHoverDir] = useState<'left' | 'right' | null>(null);
  const [interetDropped, setInteretDropped] = useState(false);
  const [showDeadpoolDesc, setShowDeadpoolDesc] = useState(false);

  const onomatopeiaPositionMap: Record<string, React.CSSProperties> = {
    whoosh: { top: "20%", left: "10%" },
    click: { top: "30%", right: "12%" },
    zoom: { bottom: "18%", left: "25%" },
    flash: { top: "40%", left: "50%", transform: "translateX(-50%)" },
    pow: { bottom: "10%", right: "25%" },
  };

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["accueil", "apropos", "competences", "projets", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Jordan%20CV.pdf"
    link.download = "Jordan CV.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleThemeChange = () => {
    setThemeTransition(true)
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }, 200)
    setTimeout(() => {
      setThemeTransition(false)
    }, 800)
  }

  const navItems = [
    { id: "accueil", label: "ACCUEIL" },
    { id: "apropos", label: "À PROPOS" },
    { id: "competences", label: "COMPÉTENCES" },
    { id: "projets", label: "PROJETS" },
    { id: "contact", label: "CONTACT" },
  ]

  const hardSkills = [
    { name: "JavaScript", color: "#f7df1e" },
    { name: "HTML/CSS", color: "#e34f26" },
    { name: "React.js", color: "#61dafb" },
    { name: "Laravel", color: "#ff2d20" },
    { name: "PHP", color: "#777bb4" },
    { name: "SQL", color: "#336791" },
    { name: "Python", color: "#3776ab" },
    { name: "Django", color: "#092e20" },
  ]

  const softSkills = [
    { name: "Esprit d'équipe", icon: Users },
    { name: "Autonome", icon: Target },
    { name: "Rigoureux", icon: Shield },
    { name: "Aisance relationnelle", icon: MessageCircle },
    { name: "Résistance au stress", icon: Shield },
  ]

  const formations = [
    {
      title: "École informatique - Epitech",
      period: "2024 - 2026",
      description: "Formation développeur web - Web académie",
    },
    {
      title: "Lycée Tony Garnier",
      period: "2018 - 2021",
      description: "BTS Technicien du bâtiment option B : Étude et économie",
    },
  ]

  const experiences = [
    {
      title: "Barman - Restaurant Maison Grand Large",
      period: "Juin 2023 - Février 2024",
      description: "Production, gestion des stocks",
    },
    {
      title: "Employé polyvalent - Vertu Food: Carrefour",
      period: "Septembre 2021 - Juin 2022",
      description: "Production, responsable de chargement",
    },
  ]

  const projects = [
    {
      title: "Site de Cinéma",
      description:
        "Création d'un site de cinéma complet avec HTML/CSS, JavaScript (fetch), PHP/SQL, intégration BDD et affichage dynamique.",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "SQL"],
      type: "Fullstack",
      detailedDescription: `J'ai créé un site de cinéma en Fullstack (HTML, CSS, JS, PHP, SQL) pour afficher les films, gérer les utilisateurs et les réservations. J'ai appris à faire communiquer le front, le back et à manipuler une vraie base de données.`,
      url: "https://github.com/EpitechWebAcademiePromo2026/W-PHP-501-LYN-1-1-mycinema-jordan.neller",
    },
    {
      title: "Clone Twitter",
      description:
        "Projet en groupe - Frontend (HTML/CSS/JavaScript), backend (PHP), BDD (SQL), système de posts (CRUD).",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "SQL"],
      type: "Full Stack",
      detailedDescription: `Projet de groupe : refaire un mini Twitter. J'ai bossé sur la recherche et le CRUD des posts (hashtags, likes, commentaires). J'ai pu apprendre à utiliser Git en équipe et à organiser un vrai projet web.`,
      url: "https://github.com/jordanGithu/W-WEB-090-LYN-1-1-academie-aliyo.moussa",
    },
    {
      title: "Clone Spotify",
      description:
        "Création d'un clone Spotify en groupe avec hooks, state management, requêtes API et intégration backend.",
      technologies: ["React.js", "JavaScript", "API"],
      type: "Backend",
      detailedDescription: `Projet Spotify en React : j'ai fait les pages (albums, artistes, recherche) et les requêtes API/SQL pour afficher les données. J'ai appris à connecter un front React à une API et à gérer les données en JSON.`,
      url: "https://github.com/EpitechWebAcademiePromo2026/W-WEB-090-LYN-1-1-spotify-jihad.bakari",
    },
    {
      title: "Explorateur de Fichiers",
      description: "Développement d'un explorateur de fichiers utilisant Django (Python).",
      technologies: ["Python", "Django"],
      type: "Backend",
      detailedDescription: `Explorateur de fichiers Django en groupe. Je me suis occupé des routes, de l'arborescence et du tri/recherche. J'ai pu apprendre la gestion des fichiers en Python et la récursivité.`,
      url: "https://github.com/EpitechWebAcademiePromo2026/W-WEB-502-LYN-2-1-H5AI-aliyo.moussa",
    },
  ]

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    const form = e.currentTarget;
    const nom = (form.elements.namedItem('nom') as HTMLInputElement)?.value.trim() || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim() || '';
    const sujet = (form.elements.namedItem('sujet') as HTMLInputElement)?.value.trim() || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim() || '';
    if (!nom || !email || !sujet || !message) {
      setFormError('Merci de remplir tous les champs obligatoires (nom, email, sujet, message).');
      return;
    }
    try {
      const res = await fetch('https://formspree.io/f/myzjowra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nom, email, sujet, message })
      });
      if (res.ok) {
        setFormSuccess('Votre message a bien été envoyé !');
        setFormSubmitted(true);
        form.reset();
      } else {
        setFormError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      setFormError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Simple but Impactful Theme Transition */}
      <AnimatePresence>
        {themeTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {/* Screen Shake Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 2, -2, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {/* Ultra Rapid Color Switch Effect with Flash - SEMI-TRANSPARENT */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  backgroundColor: [
                    isDark ? "rgba(255,255,255,0.3)" : "rgba(31,41,55,0.3)",
                    isDark ? "rgba(31,41,55,0.3)" : "rgba(255,255,255,0.3)",
                    "rgba(255,255,255,0.4)", // Flash blanc semi-transparent
                    isDark ? "rgba(255,255,255,0.3)" : "rgba(31,41,55,0.3)",
                    isDark ? "rgba(31,41,55,0.3)" : "rgba(255,255,255,0.3)",
                    "rgba(255,255,255,0.4)", // Flash blanc semi-transparent
                    isDark ? "rgba(255,255,255,0.3)" : "rgba(31,41,55,0.3)",
                    isDark ? "rgba(31,41,55,0.3)" : "rgba(255,255,255,0.3)",
                  ],
                  opacity: [0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: 0.7,
                  times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
                  ease: "easeInOut",
                }}
              />

              {/* Intense Flash Overlay - REDUCED OPACITY */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.4, 0, 0.3, 0, 0.5, 0],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.15, 0.25, 0.45, 0.55, 0.75, 1],
                  ease: "easeInOut",
                }}
              />

              {/* Subtle Crack Lines for Impact - REDUCED OPACITY */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`crack-${i}`}
                    className="absolute bg-black opacity-30"
                    style={{
                      width: "2px",
                      height: "0px",
                      left: `${20 + i * 10}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      transform: `rotate(${-30 + i * 15}deg)`,
                      transformOrigin: "center top",
                    }}
                    animate={{
                      height: ["0px", `${100 + Math.random() * 200}px`, "0px"],
                      opacity: [0, 0.3, 0],
                      scaleX: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.02,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Speed Lines for Extra Impact - REDUCED OPACITY */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`speed-${i}`}
                    className="absolute bg-black opacity-20"
                    style={{
                      width: "3px",
                      height: "0px",
                      left: "50%",
                      top: "50%",
                      transformOrigin: "center top",
                      transform: `rotate(${i * 30}deg)`,
                    }}
                    animate={{
                      height: ["0px", "120vh", "0px"],
                      opacity: [0, 0.2, 0],
                      scaleY: [0, 2, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.01,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Subtle Speed Lines Background */}
      <motion.div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ y: backgroundY }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute bg-gradient-to-r from-transparent to-transparent opacity-10 ${
              isDark ? "via-gray-600" : "via-gray-200"
            }`}
            style={{
              width: "1px",
              height: "200vh",
              left: `${i * 8}%`,
              transform: `rotate(${-10 + Math.sin(i) * 3}deg)`,
            }}
            animate={{
              x: ["-50px", "50px", "-50px"],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Better positioned Onomatopoeia */}
      <AnimatePresence>
        {hoveredElement && (
          <motion.div
            key={hoveredElement}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed pointer-events-none z-40"
            style={onomatopeiaPositionMap[hoveredElement]}
          >
            <div
              className={`text-6xl font-black relative ${isDark ? "text-white/40" : "text-black/40"} jojo-vibrate`}
            >
              {hoveredElement === "whoosh" && (
                <span className="opm-gooo">ゴォォ</span>
              )}
              {hoveredElement === "click" && (
                <span className="opm-don">ドン!!</span>
              )}
              {hoveredElement === "zoom" && (
                <span className="opm-bofu">ボフッ</span>
              )}
              {hoveredElement === "flash" && (
                <span className="opm-baki">バキッ</span>
              )}
              {hoveredElement === "pow" && (
                <span className="opm-pan">パンッ</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full backdrop-blur-sm border-b-4 z-40 shadow-lg transition-colors duration-300 ${
          isDark ? "bg-gray-900/95 border-white" : "bg-white/95 border-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className={`font-black text-2xl relative cursor-pointer transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredElement("flash")}
              onHoverEnd={() => setHoveredElement(null)}
            >
              JORDAN NELLER
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-black transition-all duration-300 cursor-pointer border-2 ${
                    activeSection === item.id
                      ? isDark
                        ? "text-black bg-white border-white"
                        : "text-white bg-black border-black"
                      : isDark
                        ? "text-white hover:bg-gray-800 border-white"
                        : "text-black hover:bg-gray-100 border-black"
                  }`}
                  style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredElement("click")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={handleThemeChange}
                className={`p-2 border-2 transition-colors cursor-pointer ${
                  isDark
                    ? "border-white bg-gray-900 hover:bg-gray-800 text-white"
                    : "border-black bg-white hover:bg-gray-100 text-black"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                onClick={handleThemeChange}
                className={`p-2 border-2 cursor-pointer transition-colors ${
                  isDark ? "border-white bg-gray-900 text-white" : "border-black bg-white text-black"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 border-2 cursor-pointer transition-colors ${
                  isDark ? "border-white bg-gray-900 text-white" : "border-black bg-white text-black"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden border-t-2 transition-colors ${
                  isDark ? "bg-gray-900 border-white" : "bg-white border-black"
                }`}
              >
                <div className="px-4 py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 border-2 font-black transition-all cursor-pointer ${
                        activeSection === item.id
                          ? isDark
                            ? "bg-white text-black border-white"
                            : "bg-black text-white border-black"
                          : isDark
                            ? "bg-gray-900 text-white border-white hover:bg-gray-800"
                            : "bg-white text-black border-black hover:bg-gray-100"
                      }`}
                      style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-colors duration-300"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
          }}
        />

        {/* Panel border */}
        <div
          className={`absolute inset-8 border-4 z-10 transition-colors duration-300 ${
            isDark ? "border-white bg-gray-900/90" : "border-black bg-white/90"
          }`}
        />

        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Speech bubble */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div
                  className={`border-4 p-6 relative transition-colors duration-300 ${
                    isDark ? "bg-gray-800 border-white" : "bg-white border-black"
                  }`}
                >
                  <div
                    className={`absolute -bottom-4 left-8 w-8 h-8 border-l-4 border-b-4 transform rotate-45 transition-colors duration-300 ${
                      isDark ? "bg-gray-800 border-white" : "bg-white border-black"
                    }`}
                  />
                  <p
                    className={`text-lg font-bold transition-colors duration-300 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    Salut ! Je suis Jordan, développeur web passionné à la recherche d'une alternance !
                  </p>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className={`text-6xl lg:text-8xl font-black mb-6 relative transition-colors duration-300 ${
                  isDark ? "text-white" : "text-black"
                }`}
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  textShadow: isDark ? "4px 4px 0px black" : "4px 4px 0px white",
                  WebkitTextStroke: isDark ? "2px white" : "2px black",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                JORDAN
                <br />
                NELLER
              </motion.h1>

              {/* Subtitle with badge */}
              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div
                  className={`px-6 py-3 transform -rotate-1 inline-block border-4 transition-colors duration-300 ${
                    isDark ? "bg-white text-black border-white" : "bg-black text-white border-black"
                  }`}
                >
                  <h2
                    className="text-2xl lg:text-3xl font-black"
                    style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
                  >
                    ALTERNANT DÉVELOPPEUR WEB
                  </h2>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 border-2 border-black transform rotate-12"
                  animate={{ rotate: [12, 18, 12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#ffd700" }}
                >
                  <span className="text-sm font-black text-black">LEVEL: HERO</span>
                </motion.div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className={`px-8 py-4 font-black border-4 text-lg cursor-pointer transition-colors duration-300 ${
                    isDark ? "bg-white text-black border-white" : "bg-black text-white border-black"
                  }`}
                  style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredElement("click")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  CONTACTEZ-MOI !
                </motion.button>

                <motion.button
                  onClick={downloadCV}
                  className={`px-8 py-4 border-4 font-black text-lg cursor-pointer transition-colors duration-300 ${
                    isDark
                      ? "border-white bg-gray-900 text-white hover:bg-gray-800"
                      : "border-black bg-white text-black hover:bg-gray-100"
                  }`}
                  style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredElement("zoom")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  <Download className="mr-2 h-5 w-5 inline" />
                  TÉLÉCHARGER MON CV
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Enhanced Character portrait */}
            <motion.div
              className="flex justify-center relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <div className="relative">
                <div
                  className={`w-80 h-80 border-8 relative overflow-hidden rounded-full transition-colors duration-300 ${
                    isDark ? "border-white" : "border-black"
                  }`}
                  style={{
                    background: isDark
                      ? "radial-gradient(circle at 30% 30%, #374151 0%, #1f2937 100%)"
                      : "radial-gradient(circle at 30% 30%, white 0%, #f0f0f0 100%)",
                  }}
                >
                  {/* Enhanced background pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, ${isDark ? "white" : "black"} 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, ${isDark ? "white" : "black"} 1px, transparent 1px),
                        linear-gradient(45deg, transparent 40%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 50%, transparent 60%)
                      `,
                      backgroundSize: "20px 20px, 15px 15px, 40px 40px",
                    }}
                  />

                  {/* Character initials */}
                  <motion.div
                    className={`absolute inset-0 flex items-center justify-center text-8xl font-black z-10 cursor-pointer transition-colors duration-300 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                    style={{
                      fontFamily: "'Impact', 'Arial Black', sans-serif",
                      textShadow: isDark ? "3px 3px 0px black" : "3px 3px 0px white",
                      WebkitTextStroke: isDark ? "2px white" : "2px black",
                    }}
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={() => setHoveredElement("flash")}
                    onHoverEnd={() => setHoveredElement(null)}
                  >
                    JN
                  </motion.div>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 px-2 py-1 border-2 border-black transform rotate-12"
                  animate={{ rotate: [12, 18, 12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#ff6b6b" }}
                >
                  <span className="text-sm font-black text-white">POWER!</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 px-2 py-1 border-2 border-black transform -rotate-12"
                  animate={{ rotate: [-12, -18, -12] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#4fc3f7" }}
                >
                  <span className="text-xs font-black text-white">CODE!</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* À propos Section */}
      <section
        id="apropos"
        className={`py-20 relative transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div
          className={`absolute inset-8 border-4 transition-colors duration-300 ${
            isDark ? "border-white bg-gray-900/90" : "border-black bg-white/90"
          }`}
        />
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
          <div className="w-full flex justify-center mb-2">
            <h2
              className={`text-3xl lg:text-4xl font-extrabold transition-colors duration-300 drop-shadow pointer-events-none select-none ${isDark ? "text-white" : "text-black"}`}
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
                transform: "rotate(-5deg) scale(1.13)",
                textShadow: isDark
                  ? "2px 2px 0px #000, 1px 1px 0px #fff"
                  : "2px 2px 0px #fff, 1px 1px 0px #000",
                WebkitTextStroke: isDark ? "1.5px white" : "1.5px black",
                background: isDark ? "#222" : "#fff",
                padding: "0.15em 1.3em",
                borderRadius: 10,
                border: isDark ? "3px solid #fff" : "3px solid #000",
                boxShadow: "0 6px 18px #0005",
              }}
            >
              MON PARCOURS
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Story panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`border-4 p-8 relative transition-colors duration-300 ${
                isDark ? "bg-gray-800 border-white" : "bg-white border-black"
              }`}
            >
              <div
                className={`space-y-6 leading-relaxed font-medium transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-black"
                }`}
              >
                <p>
                  Actuellement en première année de formation à la Web académie d'Epitech (2024-2026), je me forme dans
                  le domaine du développement web après avoir découvert cet univers grâce à mon intérêt pour le design.
                </p>

                <p>
                  Diplômé du Lycée Tony Garnier (2018-2021) en tant que Technicien du bâtiment option B, j'ai ensuite
                  découvert le développement web lors d'un concours d'entrée à une école et c'est alors que j'ai poursuivie mon apprentissage à Epitech.
                </p>

                <p>
                  Curieux et motivé, j'ai rapidement développé une passion pour le développement web. Mes projets m'ont
                  permis de me familiariser avec les différents langages.
                </p>

                <div
                  className={`p-4 text-center font-black transform -rotate-1 transition-colors duration-300 ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  <span style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
                    À LA RECHERCHE D'UNE ALTERNANCE !
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info cards */}
            <div className="space-y-6">
              {/* Formation Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className={`border-4 p-6 relative cursor-pointer transition-colors duration-300 ${
                  isDark ? "bg-gray-800 border-white" : "bg-white border-black"
                }`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredElement("whoosh")}
                onHoverEnd={() => setHoveredElement(null)}
              >
                <motion.div
                  className="absolute bottom-2 left-2 px-2 py-1 border-2 border-black transform -rotate-12"
                  animate={{ rotate: [-12, -18, -12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#4fc3f7" }}
                >
                  <span className="text-xs font-black text-white">STUDY!</span>
                </motion.div>

                <motion.h4
                  className={`text-xl font-extrabold mb-4 transition-colors duration-300 absolute -top-6 -left-4 z-20 drop-shadow pointer-events-none select-none ${isDark ? "text-white" : "text-black"}`}
                  style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                    transform: "rotate(-6deg) scale(1.08)",
                    textShadow: isDark
                      ? "2px 2px 0px #000, 1px 1px 0px #fff"
                      : "2px 2px 0px #fff, 1px 1px 0px #000",
                    WebkitTextStroke: isDark ? "1px white" : "1px black",
                    background: isDark ? "#222" : "#fff",
                    padding: "0.1em 0.8em",
                    borderRadius: 8,
                    border: isDark ? "2px solid #fff" : "2px solid #000",
                    boxShadow: "0 4px 12px #0004",
                    cursor: formationDropped ? 'default' : 'pointer',
                  }}
                  initial={false}
                  animate={
                    formationDropped
                      ? { y: '80vh', rotate: 20, opacity: 0.7, transition: { type: 'spring', stiffness: 60, damping: 12 } }
                      : formationHoverDir === 'left'
                        ? { x: -30, rotate: -18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                        : formationHoverDir === 'right'
                          ? { x: 30, rotate: 18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                          : { x: 0, rotate: -6 }
                  }
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    setFormationHoverDir(mouseX < rect.width / 2 ? 'left' : 'right');
                  }}
                  onMouseLeave={() => setFormationHoverDir(null)}
                  onClick={() => setFormationDropped(true)}
                >
                  FORMATION
                </motion.h4>
                <div className="space-y-4">
                  {formations.map((formation, index) => (
                    <div
                      key={index}
                      className={`border-2 p-3 transition-colors duration-300 ${
                        isDark ? "border-gray-600 bg-gray-700" : "border-black bg-gray-50"
                      }`}
                    >
                      <h5
                        className={`font-black transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}
                      >
                        {formation.title}
                      </h5>
                      <p className="text-sm text-gray-500 font-medium">{formation.period}</p>
                      <p
                        className={`text-sm mt-1 transition-colors duration-300 ${
                          isDark ? "text-gray-300" : "text-black"
                        }`}
                      >
                        {formation.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Expériences Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`border-4 p-6 relative cursor-pointer transition-colors duration-300 ${
                  isDark ? "bg-gray-800 border-white" : "bg-white border-black"
                }`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredElement("whoosh")}
                onHoverEnd={() => setHoveredElement(null)}
              >
                <motion.div
                  className="absolute bottom-2 right-2 px-2 py-1 border-2 border-black transform rotate-12"
                  animate={{ rotate: [12, 18, 12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#66bb6a" }}
                >
                  <span className="text-xs font-black text-white">WORK!</span>
                </motion.div>

                <motion.h4
                  className={`text-xl font-extrabold mb-4 transition-colors duration-300 absolute -top-6 right-2 z-20 drop-shadow pointer-events-none select-none ${isDark ? "text-white" : "text-black"}`}
                  style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                    transform: "rotate(5deg) scale(1.07)",
                    textShadow: isDark
                      ? "2px 2px 0px #000, 1px 1px 0px #fff"
                      : "2px 2px 0px #fff, 1px 1px 0px #000",
                    WebkitTextStroke: isDark ? "1px white" : "1px black",
                    background: isDark ? "#222" : "#fff",
                    padding: "0.1em 0.8em",
                    borderRadius: 8,
                    border: isDark ? "2px solid #fff" : "2px solid #000",
                    boxShadow: "0 4px 12px #0004",
                    cursor: experienceDropped ? 'default' : 'pointer',
                  }}
                  initial={false}
                  animate={
                    experienceDropped
                      ? { y: '80vh', rotate: 20, opacity: 0.7, transition: { type: 'spring', stiffness: 60, damping: 12 } }
                      : experienceHoverDir === 'left'
                        ? { x: -30, rotate: -18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                        : experienceHoverDir === 'right'
                          ? { x: 30, rotate: 18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                          : { x: 0, rotate: 5 }
                  }
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    setExperienceHoverDir(mouseX < rect.width / 2 ? 'left' : 'right');
                  }}
                  onMouseLeave={() => setExperienceHoverDir(null)}
                  onClick={() => setExperienceDropped(true)}
                >
                  EXPÉRIENCES
                </motion.h4>
                <div className="space-y-4">
                  {experiences.map((experience, index) => (
                    <div
                      key={index}
                      className={`border-2 p-3 transition-colors duration-300 ${
                        isDark ? "border-gray-600 bg-gray-700" : "border-black bg-gray-50"
                      }`}
                    >
                      <h5
                        className={`font-black transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}
                      >
                        {experience.title}
                      </h5>
                      <p className="text-sm text-gray-500 font-medium">{experience.period}</p>
                      <p
                        className={`text-sm mt-1 transition-colors duration-300 ${
                          isDark ? "text-gray-300" : "text-black"
                        }`}
                      >
                        {experience.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Centres d'intérêt Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className={`border-4 p-6 relative cursor-pointer transition-colors duration-300 ${
                  isDark ? "bg-gray-800 border-white" : "bg-white border-black"
                }`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredElement("flash")}
                onHoverEnd={() => setHoveredElement(null)}
              >
                <motion.div
                  className="absolute -top-2 -left-2 px-2 py-1 border-2 border-black transform -rotate-12"
                  animate={{ rotate: [-12, -18, -12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#ba68c8" }}
                >
                  <span className="text-xs font-black text-white">FUN!</span>
                </motion.div>

                <motion.h4
                  className={`text-xl font-extrabold mb-4 transition-colors duration-300 absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 drop-shadow pointer-events-none select-none ${isDark ? "text-white" : "text-black"}`}
                  style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                    transform: "rotate(-3deg) scale(1.06)",
                    textShadow: isDark
                      ? "2px 2px 0px #000, 1px 1px 0px #fff"
                      : "2px 2px 0px #fff, 1px 1px 0px #000",
                    WebkitTextStroke: isDark ? "1px white" : "1px black",
                    background: isDark ? "#222" : "#fff",
                    padding: "0.1em 0.8em",
                    borderRadius: 8,
                    border: isDark ? "2px solid #fff" : "2px solid #000",
                    boxShadow: "0 4px 12px #0004",
                    cursor: interetDropped ? 'default' : 'pointer',
                  }}
                  initial={false}
                  animate={
                    interetDropped
                      ? { y: '80vh', rotate: 20, opacity: 0.7, transition: { type: 'spring', stiffness: 60, damping: 12 } }
                      : interetHoverDir === 'left'
                        ? { x: -30, rotate: -18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                        : interetHoverDir === 'right'
                          ? { x: 30, rotate: 18, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                          : { x: 0, rotate: -3 }
                  }
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    setInteretHoverDir(mouseX < rect.width / 2 ? 'left' : 'right');
                  }}
                  onMouseLeave={() => setInteretHoverDir(null)}
                  onClick={() => setInteretDropped(true)}
                >
                  CENTRES D'INTÉRÊT
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Music, label: "MUSIQUE" },
                    { icon: Brush, label: "DESSIN" },
                    { icon: Dumbbell, label: "SPORT" },
                  ].map((interest, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2 border-2 font-black cursor-pointer transition-colors duration-300 ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-black text-black"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <interest.icon className="h-4 w-4" />
                      {interest.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Section - Restructured */}
      <section
        id="competences"
        className={`py-20 relative transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl lg:text-6xl font-black mb-4 relative inline-block transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: isDark ? "3px 3px 0px black" : "3px 3px 0px white",
                WebkitTextStroke: isDark ? "2px white" : "2px black",
              }}
            >
              MES COMPÉTENCES
            </h2>
          </motion.div>

          {/* Technical Skills - Outside frame with onomatopoeia style */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 relative"
          >
            <div className="text-center mb-8">
              <motion.h3
                className={`text-lg font-extrabold mb-4 transition-colors duration-300 absolute -top-7 left-1/2 -translate-x-1/2 z-20 drop-shadow pointer-events-none select-none text-red-600`}
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontWeight: 700,
                  letterSpacing: 1,
                  transform: "rotate(-4deg) scale(1.05)",
                  textShadow: "2px 2px 0px #fff, 1px 1px 0px #000",
                  WebkitTextStroke: "1px #fff",
                  background: "#fff",
                  padding: "0.1em 0.7em",
                  borderRadius: 8,
                  border: "2px solid #000",
                  boxShadow: "0 4px 12px #0004",
                }}
              >
                IMPORTANT
              </motion.h3>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {hardSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 border-2 border-black font-black text-white cursor-pointer relative"
                  style={{
                    background: skill.color,
                    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                    transform: `rotate(${-5 + Math.random() * 10}deg)`,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 0,
                    zIndex: 10,
                  }}
                  onHoverStart={() => setHoveredElement("pow")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  {skill.name}
                  {/* Impact effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 pointer-events-none"
                    whileHover={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Skills - In frame */}
          <div
            className={`border-4 transition-colors duration-300 ${
              isDark ? "border-white bg-gray-800/90" : "border-black bg-gray-50/90"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 relative"
            >
              <h3
                className={`text-lg font-extrabold mb-4 transition-colors duration-300 absolute -top-7 left-1/2 -translate-x-1/2 z-20 drop-shadow pointer-events-none select-none ${isDark ? "text-white" : "text-black"}`}
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontWeight: 700,
                  letterSpacing: 1,
                  transform: "rotate(3deg) scale(1.04)",
                  textShadow: isDark
                    ? "2px 2px 0px #000, 1px 1px 0px #fff"
                    : "2px 2px 0px #fff, 1px 1px 0px #000",
                  WebkitTextStroke: isDark ? "1px white" : "1px black",
                  background: isDark ? "#222" : "#fff",
                  padding: "0.1em 0.7em",
                  borderRadius: 8,
                  border: isDark ? "2px solid #fff" : "2px solid #000",
                  boxShadow: "0 4px 12px #0004",
                }}
              >
                COMPÉTENCES PERSONNELLES
              </h3>

              <div className="grid gap-4">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-4 p-4 border-2 relative cursor-pointer transition-colors duration-300 ${
                      isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-black text-black"
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onHoverStart={() => setHoveredElement("flash")}
                    onHoverEnd={() => setHoveredElement(null)}
                  >
                    <skill.icon className="h-6 w-6" />
                    <span className="font-black text-lg">{skill.name}</span>
                    <motion.div
                      className="absolute -top-1 -right-1 px-2 py-1 text-xs font-black text-black border border-black"
                      style={{ background: "#ffd700" }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    >
                      MAX
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Langues */}
              <motion.div
                className={`mt-8 p-4 border-4 relative transition-colors duration-300 ${
                  isDark ? "bg-white text-black border-white" : "bg-black text-white border-black"
                }`}
              >
                <motion.div
                  className="absolute -top-2 -left-2 px-2 py-1 border-2 border-black transform -rotate-12"
                  animate={{ rotate: [-12, -18, -12] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ background: "#ffd700" }}
                >
                  <span className="text-xs font-black text-black">BONUS!</span>
                </motion.div>

                <h4 className="font-black mb-3" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
                  LANGUES
                </h4>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 font-black transition-colors duration-300 ${
                    isDark ? "bg-black text-white border-black" : "bg-white text-black border-black"
                  }`}
                >
                  ANGLAIS B2
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projets Section */}
      <section
        id="projets"
        className={`py-20 relative transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div
          className={`absolute inset-8 border-4 transition-colors duration-300 ${
            isDark ? "border-white bg-gray-900/90" : "border-black bg-white/90"
          }`}
        />
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl lg:text-6xl font-black mb-4 relative inline-block transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: isDark ? "3px 3px 0px black" : "3px 3px 0px white",
                WebkitTextStroke: isDark ? "2px white" : "2px black",
              }}
            >
              MES PROJETS
            </h2>
          </motion.div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-black impact-title flex items-center gap-4 relative">
              {/* Chibi Deadpool + bulle de chat descriptif à gauche du bouton Random page */}
              <div className="flex flex-col items-center mr-2 select-none relative" style={{ minWidth: 80 }}>
                <motion.img
                  src="/chibi_deadpool .png"
                  alt="Chibi Deadpool"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.08, rotate: -8 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: 64, height: 64, objectFit: 'contain', cursor: 'pointer', zIndex: 10 }}
                  title="Clique sur moi pour voir le descriptif !"
                  onClick={() => setShowDeadpoolDesc(v => !v)}
                />
                <span
                  className="mt-1 px-2 py-1 text-xs font-black rounded-full border-2 border-black bg-white shadow"
                  style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", color: '#e3342f', boxShadow: '2px 2px 0 #0002' }}
                >
                  Clique sur moi !
                </span>
                {/* Bulle de chat Deadpool */}
                {showDeadpoolDesc && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="deadpool-bubble"
                  >
                    <span
                      style={{ display: 'inline-block', animation: 'deadpool-pop 0.45s cubic-bezier(.36,1.5,.64,1)' }}
                      dangerouslySetInnerHTML={{
                        __html:
                          (projects[currentIndex]?.detailedDescription || "Pas de descriptif disponible.")
                            .replace(/(React|PHP|HTML|CSS|JavaScript|Django|API|SQL)/gi, '<strong>$1</strong>')
                            .replace(/(publier|recherche|CRUD|tri|tags|arborescence|gérer|afficher|écouter|organiser)/gi, '<span class="bubble-key">$1</span>')
                            .replace(/(groupe|équipe|projet)/gi, '<span class="bubble-flash">$1</span>')
                      }}
                    />
                    {/* Flèche animée */}
                    <span className="deadpool-bubble-arrow">
                      <svg width="36" height="36" viewBox="0 0 24 24">
                        <path d="M24 0 Q8 24 0 24" fill="#fff" stroke="#111" strokeWidth="3" />
                      </svg>
                    </span>
                  </motion.div>
                )}
              </div>
              <span style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: 2 }}>
                {`Chapitre ${currentIndex + 1} : ${projects[currentIndex]?.title || ''}`}
              </span>
              {/* Onomatopée animée */}
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.2, 1] }}
                exit={{ opacity: 0, y: 20, scale: 0.7 }}
                transition={{ duration: 0.5 }}
                className="ml-2 text-3xl font-black text-black/60 select-none pointer-events-none"
                style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textShadow: '2px 2px 0 #fff, 4px 4px 0 #000' }}
              >
                パラッ
              </motion.span>
            </div>
            {/* Bouton Random page */}
            <button
              onClick={() => {
                if (!emblaApiRef.current) return;
                const random = Math.floor(Math.random() * projects.length);
                emblaApiRef.current.scrollTo(random);
              }}
              className="px-6 py-2 border-4 border-black bg-white text-black font-black rounded-lg shadow-lg text-lg hover:bg-yellow-200 active:scale-95 transition-all duration-200"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: 1, boxShadow: '0 2px 8px #0002' }}
            >
              Random page
            </button>
          </div>
          <div className="relative">
            <Carousel
              className="w-full"
              opts={{ loop: true }}
              setApi={(api) => {
                emblaApiRef.current = api;
                if (api) {
                  api.on('select', () => setCurrentIndex(api.selectedScrollSnap()));
                }
              }}
            >
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="px-2">
                    <motion.div
                      initial={false}
                      animate={{
                        rotateY: currentIndex === index ? 0 : (index < currentIndex ? -90 : 90),
                        opacity: currentIndex === index ? 1 : 0.5,
                        zIndex: currentIndex === index ? 2 : 1,
                        scale: currentIndex === index ? 1 : 0.95,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                      style={{ perspective: 1200 }}
                    >
                      <ProjectCard project={project} isDark={isDark} index={index} currentIndex={currentIndex} total={projects.length} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 relative transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div
          className={`absolute inset-8 border-4 transition-colors duration-300 ${
            isDark ? "border-white bg-gray-800/90" : "border-black bg-gray-50/90"
          }`}
        />
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl lg:text-6xl font-black mb-4 relative inline-block transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: isDark ? "3px 3px 0px black" : "3px 3px 0px white",
                WebkitTextStroke: isDark ? "2px white" : "2px black",
              }}
            >
              CONTACTEZ-MOI
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`border-4 p-8 relative transition-colors duration-300 ${
                isDark ? "bg-gray-800 border-white" : "bg-white border-black"
              }`}
            >
              <motion.div
                className="absolute -top-2 -left-2 px-2 py-1 border-2 border-black transform -rotate-12"
                animate={{ rotate: [-12, -18, -12] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ background: "#ff6b6b" }}
              >
                <span className="text-xs font-black text-white">INFO!</span>
              </motion.div>

              <h3
                className={`text-3xl font-black mb-6 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
              >
                INFORMATIONS DE CONTACT
              </h3>

              <div className="space-y-4">
                <motion.div
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-colors duration-300 ${
                    isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-black text-black"
                  }`}
                  whileHover={{ x: 10 }}
                  onHoverStart={() => setHoveredElement("click")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  <Phone className="h-6 w-6" />
                  <span className="font-black">06-99-31-23-30</span>
                </motion.div>

                <motion.div
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-colors duration-300 ${
                    isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-black text-black"
                  }`}
                  whileHover={{ x: 10 }}
                  onHoverStart={() => setHoveredElement("click")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  <Mail className="h-6 w-6" />
                  <span className="font-black">jordan.neller@epitech.eu</span>
                </motion.div>

                <motion.div
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-colors duration-300 ${
                    isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-black text-black"
                  }`}
                  whileHover={{ x: 10 }}
                  onHoverStart={() => setHoveredElement("zoom")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  <ExternalLink className="h-6 w-6" />
                  <a
                    href="https://www.linkedin.com/in/jordan-neller-43aa91273"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black hover:underline"
                  >
                    LINKEDIN
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact form with submission effect */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`border-4 p-8 relative transition-colors duration-300 ${
                isDark ? "bg-gray-800 border-white" : "bg-white border-black"
              }`}
            >
              <motion.div
                className="absolute -top-2 -right-2 px-2 py-1 border-2 border-black transform rotate-12"
                animate={{ rotate: [12, 18, 12] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ background: "#4fc3f7" }}
              >
                <span className="text-xs font-black text-white">SEND!</span>
              </motion.div>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t-4 relative transition-colors duration-300 ${
          isDark ? "bg-black text-white border-white" : "bg-black text-white border-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p
              className="text-2xl font-black text-white mb-2"
              style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
            >
              © 2024 JORDAN NELLER. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="bg-white text-black px-4 py-2 inline-block border-4 border-white transform -rotate-1">
              <p className="font-black">DÉVELOPPEUR WEB EN FORMATION - À LA RECHERCHE D'UNE ALTERNANCE</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
