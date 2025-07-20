"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { gsap } from "gsap"
import { XIcon, ChevronRightIcon } from "lucide-react"

// Definición de las propiedades para cada "slot" o posición de los autos
const getResponsiveSlots = (windowWidth: number) => {
  // Valores para pantallas mayores a 1366px de ancho
  if (windowWidth > 1366) {
    return {
      front: {
        bottom: "0%",
        left: "50%",
        width: "min(55vw, 1400px)", // Aumentado para pantallas grandes
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1400px", // Aumentado para pantallas grandes
      },
      leftBack: {
        bottom: "25%",
        left: "29%",
        width: "min(18vw, 500px)", // Aumentado para pantallas grandes
        zIndex: 10,
        xPercent: -50,
        maxWidth: "500px", // Aumentado para pantallas grandes
      },
      rightBack: {
        bottom: "25%",
        left: "71%",
        width: "min(18vw, 500px)", // Aumentado para pantallas grandes
        zIndex: 10,
        xPercent: -50,
        maxWidth: "500px", // Aumentado para pantallas grandes
      },
      leftSide: {
        bottom: "13%",
        left: "0%",
        width: "min(45vw, 1000px)", // Aumentado para pantallas grandes
        zIndex: 15,
        xPercent: -50,
        maxWidth: "1000px", // Aumentado para pantallas grandes
      },
      rightSide: {
        bottom: "13%",
        left: "100%",
        width: "min(45vw, 1000px)", // Aumentado para pantallas grandes
        zIndex: 15,
        xPercent: -50,
        maxWidth: "1000px", // Aumentado para pantallas grandes
      },
      leftDetail: {
        bottom: "13%", // Ajustado para centrado vertical
        left: "30%", // Ajustado para mover el auto más al centro
        width: "min(45vw, 1000px)", // Aumentado para pantallas grandes
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px", // Aumentado para pantallas grandes
      },
    }
  } else {
    // Valores originales para pantallas de 1366x768 y menores
    return {
      front: {
        bottom: "0%",
        left: "50%",
        width: "min(55vw, 800px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftBack: {
        bottom: "25%",
        left: "29%",
        width: "min(18vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "25%",
        left: "71%",
        width: "min(18vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "13%",
        left: "0%",
        width: "min(45vw, 600px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "600px",
      },
      rightSide: {
        bottom: "13%",
        left: "100%",
        width: "min(45vw, 600px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "600px",
      },
      leftDetail: {
        bottom: "13%", // Ajustado para centrado vertical
        left: "30%", // Ajustado para mover el auto más al centro
        width: "min(45vw, 600px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "600px",
      },
    }
  }
}

// Configuración inicial de los autos
const initialCarConfig = [
  { id: "auto-1", src: "/img/auto-1.png", alt: "BMW M4", number: 1 },
  { id: "auto-5", src: "/img/auto-5.png", alt: "Mercedes Benz Plateado", number: 5 },
  { id: "auto-4", src: "/img/auto-4.png", alt: "Carrito de Compras con Ruedas", number: 4 },
  { id: "auto-3", src: "/img/auto-3.png", alt: "McLaren F1 Coche de Carreras", number: 3 },
  { id: "auto-2", src: "/img/auto-2.png", alt: "Lexus con Lazo Rojo", number: 2 },
]

// Textos de los enlaces para cada auto
const linkTexts = {
  1: {
    ceramic: "CERÁMICOS",
    ppf: "PPF",
    polished: "PULIDOS",
    paddockLine: "PADDOCK LINE",
  },
  2: {
    ceramic: "CAMBIO DE ACEITE",
    ppf: "NEUMÁTICOS",
    polished: "EMBRAGUES",
    paddockLine: "MANTENIMIENTO",
  },
  3: {
    ceramic: "PINTADO",
    ppf: "SISTEMA STARLINE",
    polished: "PASTILLAS",
    paddockLine: "DISCOS",
  },
  4: {
    ceramic: "ACCESORIOS",
    ppf: "LLANTAS",
    polished: "DETALLADO",
    paddockLine: "REPUESTOS",
  },
  5: {
    ceramic: "MECÁNICA GENERAL",
    ppf: "DIAGNÓSTICO",
    polished: "FRENOS",
    paddockLine: "SUSPENSIÓN",
  },
}

export default function HomePage() {
  // Referencias para los elementos DOM
  const carRefs = {
    "auto-1": useRef(null),
    "auto-2": useRef(null),
    "auto-3": useRef(null),
    "auto-4": useRef(null),
    "auto-5": useRef(null),
  }

  const linksRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Estados
  const [currentSlotAssignment, setCurrentSlotAssignment] = useState(["auto-1", "auto-3", "auto-2", "auto-4", "auto-5"])
  const [isDetailView, setIsDetailView] = useState(false)
  const [selectedCarNumber, setSelectedCarNumber] = useState(0)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)
  const [currentWindowWidth, setCurrentWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  )
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false) // Nuevo estado para la animación del carrusel

  // Refs para almacenar el valor más reciente de los estados
  const isDetailViewRef = useRef(isDetailView)
  const currentSlotAssignmentRef = useRef(currentSlotAssignment)
  const currentWindowWidthRef = useRef(currentWindowWidth)

  // Efectos para mantener las refs actualizadas
  useEffect(() => {
    isDetailViewRef.current = isDetailView
  }, [isDetailView])

  useEffect(() => {
    currentSlotAssignmentRef.current = currentSlotAssignment
  }, [currentSlotAssignment])

  useEffect(() => {
    currentWindowWidthRef.current = currentWindowWidth
  }, [currentWindowWidth])

  // Obtener las propiedades de los slots actuales basadas en el ancho de la ventana
  const currentSlots = useMemo(() => getResponsiveSlots(currentWindowWidth), [currentWindowWidth])

  // Función auxiliar para obtener las propiedades del slot
  const getSlotPropsForCar = useCallback(
    (carId: string, assignmentOrder: string[], slotsConfig: typeof currentSlots) => {
      const index = assignmentOrder.indexOf(carId)
      if (index === 0) return slotsConfig.front
      if (index === 1) return slotsConfig.leftBack
      if (index === 2) return slotsConfig.rightBack
      if (index === 3) return slotsConfig.leftSide
      if (index === 4) return slotsConfig.rightSide
      return {}
    },
    [],
  )

  // Función principal de animación del carrusel
  const animateCarousel = useCallback(() => {
    if (isDetailViewRef.current) return // Usar ref

    setIsCarouselAnimating(true) // Iniciar animación del carrusel

    const latestAssignment = currentSlotAssignmentRef.current // Usar ref
    const newAssignment = [
      latestAssignment[4], // El que estaba en rightSide va a front
      latestAssignment[3], // El que estaba en leftSide va a leftBack
      latestAssignment[1], // El que estaba en leftBack va a rightBack
      latestAssignment[0], // El que estaba en front va a leftSide
      latestAssignment[2], // El que estaba en rightBack va a rightSide
    ]

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlotAssignment(newAssignment)
        setIsCarouselAnimating(false) // Finalizar animación del carrusel
      },
    })

    initialCarConfig.forEach((car) => {
      const carRef = carRefs[car.id].current
      if (carRef) {
        const newSlot = getSlotPropsForCar(car.id, newAssignment, currentSlots)
        tl.to(
          carRef,
          {
            bottom: newSlot.bottom,
            left: newSlot.left,
            width: newSlot.width,
            zIndex: newSlot.zIndex,
            xPercent: newSlot.xPercent,
            duration: 1.5,
            ease: "expo.inOut", // Mantener expo.inOut
          },
          0,
        ) // Todas las animaciones comienzan al mismo tiempo en el timeline
      }
    })
  }, [getSlotPropsForCar, currentSlots]) // Dependencias estables

  // Función para manejar click en el auto del frente
  const handleFrontCarClick = () => {
    if (isDetailViewRef.current || isCarouselAnimating) return // Deshabilitar clic si está en vista detalle o animando

    const frontCarId = currentSlotAssignmentRef.current[0] // Usar ref
    const frontCar = initialCarConfig.find((car) => car.id === frontCarId)
    if (!frontCar) return

    setIsDetailView(true)
    isDetailViewRef.current = true // Actualizar ref
    setSelectedCarNumber(frontCar.number)

    // Detener la animación del carrusel
    if (animationInterval) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }

    // Ocultar los otros autos
    initialCarConfig.forEach((car) => {
      if (car.id !== frontCarId) {
        const carRef = carRefs[car.id].current
        if (carRef) {
          gsap.to(carRef, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          })
        }
      }
    })

    // Mover el auto del frente a la izquierda
    const frontCarRef = carRefs[frontCarId].current
    if (frontCarRef) {
      gsap.to(frontCarRef, {
        bottom: currentSlots.leftDetail.bottom,
        left: currentSlots.leftDetail.left,
        width: currentSlots.leftDetail.width,
        zIndex: currentSlots.leftDetail.zIndex,
        xPercent: currentSlots.leftDetail.xPercent,
        duration: 1.5,
        ease: "expo.inOut", // Mantener expo.inOut
        onComplete: () => {
          // Los enlaces y el botón de cerrar se animan DESPUÉS de que el auto llega
          if (linksRef.current) {
            gsap.set(linksRef.current, { visibility: "visible" })
            const links = linksRef.current.children
            gsap.set(links, { opacity: 0, x: 100 })
            gsap.to(links, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "expo.inOut", // Mantener expo.inOut
              stagger: 0.2,
            })
          }

          // Mostrar botón de cerrar
          if (closeButtonRef.current) {
            gsap.set(closeButtonRef.current, { visibility: "visible" })
            gsap.set(closeButtonRef.current, { opacity: 0, scale: 0 })
            gsap.to(closeButtonRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              delay: 0.2,
            })
          }
        },
      })
    }
  }

  // Función para cerrar la vista detalle
  const handleCloseDetail = () => {
    if (!isDetailViewRef.current) return // Usar ref

    const frontCarId = currentSlotAssignmentRef.current[0] // Usar ref

    // Ocultar enlaces y botón de cerrar
    if (linksRef.current) {
      gsap.to(linksRef.current.children, {
        opacity: 0,
        x: 100,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(linksRef.current, { visibility: "hidden" })
        },
      })
    }

    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(closeButtonRef.current, { visibility: "hidden" })
        },
      })
    }

    // Mover el auto de vuelta al centro
    const frontCarRef = carRefs[frontCarId].current
    if (frontCarRef) {
      gsap.to(frontCarRef, {
        bottom: currentSlots.front.bottom,
        left: currentSlots.front.left,
        width: currentSlots.front.width,
        zIndex: currentSlots.front.zIndex,
        xPercent: currentSlots.front.xPercent,
        duration: 1.5,
        ease: "expo.inOut", // Mantener expo.inOut
      })
    }

    // Mostrar los otros autos
    initialCarConfig.forEach((car) => {
      if (car.id !== frontCarId) {
        const carRef = carRefs[car.id].current
        if (carRef) {
          gsap.to(carRef, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5,
          })
        }
      }
    })

    // Reanudar la animación del carrusel inmediatamente después de que el auto principal regrese
    setTimeout(() => {
      setIsDetailView(false)
      isDetailViewRef.current = false // Actualizar ref
      setSelectedCarNumber(0)
      // Limpiar cualquier intervalo anterior antes de establecer uno nuevo
      if (animationInterval) {
        clearInterval(animationInterval)
      }
      const interval = setInterval(animateCarousel, 4000)
      setAnimationInterval(interval)
    }, 1500)
  }

  // Función para manejar el redimensionamiento
  const handleResize = useCallback(() => {
    const newWindowWidth = window.innerWidth
    // Solo actualizar el estado si el ancho ha cambiado para evitar renders innecesarios
    if (newWindowWidth !== currentWindowWidthRef.current) {
      setCurrentWindowWidth(newWindowWidth)
    }

    const slotsForResize = getResponsiveSlots(newWindowWidth)

    if (isDetailViewRef.current) {
      const frontCarId = currentSlotAssignmentRef.current[0]
      const frontCarRef = carRefs[frontCarId].current
      if (frontCarRef) {
        gsap.set(frontCarRef, {
          bottom: slotsForResize.leftDetail.bottom,
          left: slotsForResize.leftDetail.left,
          width: slotsForResize.leftDetail.width,
          xPercent: slotsForResize.leftDetail.xPercent,
        })
      }
    } else {
      initialCarConfig.forEach((car) => {
        const carRef = carRefs[car.id].current
        if (carRef) {
          const slot = getSlotPropsForCar(car.id, currentSlotAssignmentRef.current, slotsForResize)
          gsap.set(carRef, {
            bottom: slot.bottom,
            left: slot.left,
            width: slot.width,
            zIndex: slot.zIndex,
            xPercent: slot.xPercent,
          })
        }
      })
    }
  }, [getSlotPropsForCar]) // Dependencias estables

  // Efecto inicial
  useEffect(() => {
    // Posicionamiento inicial de los autos
    initialCarConfig.forEach((car) => {
      const carRef = carRefs[car.id].current
      if (carRef) {
        const slot = getSlotPropsForCar(
          car.id,
          currentSlotAssignmentRef.current,
          getResponsiveSlots(currentWindowWidthRef.current),
        )
        gsap.set(carRef, {
          bottom: slot.bottom,
          left: slot.left,
          width: slot.width,
          zIndex: slot.zIndex,
          xPercent: slot.xPercent,
        })
      }
    })

    window.addEventListener("resize", handleResize)
    const intervalId = setInterval(animateCarousel, 4000)
    setAnimationInterval(intervalId)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(intervalId)
    }
  }, []) // Dependencias estables

  // Obtener textos para el auto seleccionado
  const currentLinkTexts = linkTexts[selectedCarNumber as keyof typeof linkTexts] || linkTexts[1]

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-end justify-center bigScreen">
      {/* Imagen de fondo */}
      <Image
        src="/img/background.jpg"
        alt="Fondo de Paddock Motors"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Renderiza cada auto */}
      {initialCarConfig.map((car) => {
        const currentSlotProps = getSlotPropsForCar(car.id, currentSlotAssignment, currentSlots)
        const isFrontCar = currentSlotAssignment[0] === car.id

        const getIntrinsicSize = (slotMaxWidth: string) => {
          const maxWidth = Number.parseInt(slotMaxWidth.replace("px", ""))
          return maxWidth
        }

        const baseWidth = getIntrinsicSize(currentSlotProps.maxWidth || "400px")
        const aspectRatio = 0.625
        const baseHeight = baseWidth * aspectRatio

        return (
          <Image
            key={car.id}
            src={car.src || "/placeholder.svg"}
            alt={car.alt}
            width={baseWidth}
            height={baseHeight}
            className={`absolute ${isFrontCar && !isDetailView && !isCarouselAnimating ? "cursor-pointer" : ""}`}
            ref={carRefs[car.id]}
            onClick={isFrontCar && !isDetailView && !isCarouselAnimating ? handleFrontCarClick : undefined}
            style={{
              bottom: currentSlotProps.bottom,
              left: currentSlotProps.left,
              zIndex: currentSlotProps.zIndex,
              width: currentSlotProps.width,
              transform: `translateX(${currentSlotProps.xPercent}%)`,
              height: "auto",
            }}
          />
        )
      })}

      {/* Enlaces que aparecen cuando se hace click */}
      {isDetailView && (
        <div
          ref={linksRef}
          className="absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-30"
          style={{ right: "20%", visibility: "hidden" }} // Inicialmente oculto
        >
          <a
            href="#"
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[250px]"
          >
            <span>{currentLinkTexts.ceramic}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[250px]"
          >
            <span>{currentLinkTexts.ppf}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[250px]"
          >
            <span>{currentLinkTexts.polished}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="flex items-center justify-between px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[250px]"
          >
            <span>{currentLinkTexts.paddockLine}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
        </div>
      )}

      {/* Botón de cerrar */}
      {isDetailView && (
        <button
          ref={closeButtonRef}
          onClick={handleCloseDetail}
          className="absolute top-8 right-8 text-white hover:text-gray-300 bg-black bg-opacity-50 p-3 rounded-full transition-colors duration-200 z-40"
          aria-label="Cerrar vista detalle"
          style={{ visibility: "hidden" }} // Inicialmente oculto
        >
          <XIcon className="h-8 w-8" />
        </button>
      )}
      <style jsx global>{`
      @media (min-width: 1367px) {
        .paddock-container {
          transform: scale(1.5);
          transform-origin: center center;
        }

        .paddock-links {
          right: 15% !important;
        }

        .paddock-close-btn {
            right: 6% !important;
            top: 12% !important;
            transform: scale(1.5) !important;
        }
        .bigScreen{
          margin-top: -50px;
          overflow: visible;
        }
        .fongoBig{
          margin-top: 50px !important;
        }
    `}</style>
    </div>
  )
}
