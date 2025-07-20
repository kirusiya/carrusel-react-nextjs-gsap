"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { XIcon, ChevronRightIcon } from "lucide-react" // Iconos de Lucide React

interface CarPopupProps {
  isOpen: boolean
  onClose: () => void
  carSrc: string
  carAlt: string
  carNumber: number // Nuevo prop para el número del auto
}

export default function CarPopup({ isOpen, onClose, carSrc, carAlt, carNumber }: CarPopupProps) {
  const popupRef = useRef(null)
  const contentRef = useRef(null)

  // Define los textos de los enlaces para cada auto
  const linkTexts = {
    1: {
      ceramic: "Cerámicos",
      ppf: "PPF",
      polished: "Pulidos",
      paddockLine: "Paddock Line",
    },
    2: {
      ceramic: "Cambio de aceite",
      ppf: "Neumáticos",
      polished: "Embragues",
      paddockLine: "Mantenimiento",
    },
    3: {
      ceramic: "Pintado",
      ppf: "Sistema Starline",
      polished: "Pastillas",
      paddockLine: "Discos",
    },
    4: {
      ceramic: "Accesorios",
      ppf: "Llantas",
      polished: "Detallado",
      paddockLine: "Repuestos",
    },
    5: {
      ceramic: "Mecánica General",
      ppf: "Diagnóstico",
      polished: "Frenos",
      paddockLine: "Suspensión",
    },
  }

  // Usa los textos correspondientes al carNumber actual
  const currentLinkTexts = linkTexts[carNumber as keyof typeof linkTexts] || linkTexts[1] // Fallback a auto 1 si no se encuentra

  useEffect(() => {
    if (isOpen) {
      // Animación de entrada del popup (similar a Bootstrap: fade-in y slide-up)
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, display: "none" },
        { opacity: 1, display: "flex", duration: 0.3, ease: "power2.out" },
      )
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 },
      )
    } else {
      // Animación de salida del popup (fade-out y slide-down)
      gsap.to(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(popupRef.current, { opacity: 0, display: "none", duration: 0.3 })
        },
      })
    }
  }, [isOpen])

  if (!isOpen && gsap.getProperty(popupRef.current, "opacity") === 0) {
    // No renderiza si no está abierto y ya está completamente oculto
    return null
  }

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 overflow-hidden"
      style={{ display: isOpen ? "flex" : "none" }} // Controla la visibilidad inicial
    >
      {/* Background Image for Popup */}
      <Image
        src="/img/background.jpg"
        alt="Paddock Motors Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center p-4 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 bg-transparent p-2 rounded-full transition-colors duration-200 z-20"
          aria-label="Cerrar popup"
        >
          <XIcon className="h-8 w-8" />
        </button>

        {/* Car Image in Popup */}
        <div className="relative w-full max-w-xl lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0 lg:mr-8">
          <Image
            src={carSrc || "/placeholder.svg"}
            alt={carAlt}
            width={800} // Tamaño intrínseco para el componente Image
            height={500} // Tamaño intrínseco
            className="w-full h-auto object-contain"
            style={{ maxWidth: "80%", maxHeight: "60vh" }} // Controla el tamaño visual
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col space-y-4 w-full max-w-xs md:max-w-sm lg:w-1/2">
          <a
            href="#" // Puedes cambiar esto a la URL real
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200"
          >
            <span>{currentLinkTexts.ceramic}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#" // Puedes cambiar esto a la URL real
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200"
          >
            <span>{currentLinkTexts.ppf}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#" // Puedes cambiar esto a la URL real
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200"
          >
            <span>{currentLinkTexts.polished}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#" // Puedes cambiar esto a la URL real
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200"
          >
            <span>{currentLinkTexts.paddockLine}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
