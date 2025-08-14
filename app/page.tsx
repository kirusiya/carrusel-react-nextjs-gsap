"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { gsap } from "gsap"
import { XIcon, ChevronRightIcon, InfoIcon } from "lucide-react" // Import InfoIcon

// Definición de las propiedades para cada "slot" o posición de los autos
const getResponsiveSlots = (windowWidth: number) => {
  // Valores para pantallas mayores a 1600px de ancho
  console.log("ancho " + windowWidth)
  if (windowWidth >= 1536) {
    return {
      front: {
        bottom: "-5%",
        left: "50%",
        width: "min(70vw, 1400px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1400px",
      },
      leftBack: {
        bottom: "27%",
        left: "25%",
        width: "min(21vw, 500px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "500px",
      },
      rightBack: {
        bottom: "27%",
        left: "75%",
        width: "min(21vw, 500px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "500px",
      },
      leftSide: {
        bottom: "10%",
        left: "0%",
        width: "min(56vw, 1000px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "1000px",
      },
      rightSide: {
        bottom: "10%",
        left: "100%",
        width: "min(56vw, 1000px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftDetail: {
        bottom: "13%",
        left: "30%",
        width: "min(45vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for large screens
        bottom: "25%",
        left: "0%",
        width: "min(35vw, 800px)",
        height: "min(35vw, 800px)",
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for large screens
        top: "40px",
        right: "40px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "10%",
        right: "18%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 1366) {
    return {
      front: {
        bottom: "-8%",
        left: "50%",
        width: "min(68vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        bottom: "24%",
        left: "23%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "24%",
        left: "75%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "5%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        bottom: "5%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        bottom: "-8%", // Ajustado para centrado vertical
        left: "30%", // Ajustado para mover el auto más al centro
        width: "min(68vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        bottom: "27%",
        left: "0%",
        width: "min(33vw, 600px)",
        height: "min(33vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "15%",
        right: "12%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 1280) {
    return {
      front: {
        bottom: "-8%",
        left: "50%",
        width: "min(68vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        bottom: "24%",
        left: "23%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "24%",
        left: "75%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "5%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        bottom: "5%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        bottom: "-8%", // Ajustado para centrado vertical
        left: "30%", // Ajustado para mover el auto más al centro
        width: "min(68vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        bottom: "27%",
        left: "0%",
        width: "min(33vw, 600px)",
        height: "min(33vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "15%",
        right: "12%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 1024) {
    return {
      front: {
        bottom: "-8%",
        left: "50%",
        width: "min(68vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        bottom: "24%",
        left: "23%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "24%",
        left: "75%",
        width: "min(21vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "5%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        bottom: "5%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        bottom: "-8%", // Ajustado para centrado vertical
        left: "30%", // Ajustado para mover el auto más al centro
        width: "min(68vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        bottom: "27%",
        left: "0%",
        width: "min(33vw, 600px)",
        height: "min(33vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "15%",
        right: "12%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 991) {
    return {
      front: {
        bottom: "22%",
        left: "50%",
        width: "min(75vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        bottom: "37%",
        left: "18%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "37%",
        left: "80%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "30%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        bottom: "30%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        bottom: "30%", // Ajustado para centrado vertical
        left: "50%", // Ajustado para mover el auto más al centro
        width: "min(55vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        bottom: "40%",
        left: "0%",
        width: "min(40vw, 600px)",
        height: "min(40vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "0%",
        right: "12%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 979) {
    return {
      front: {
        bottom: "22%",
        left: "50%",
        width: "min(75vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        bottom: "37%",
        left: "18%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        bottom: "37%",
        left: "80%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        bottom: "30%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        bottom: "30%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        bottom: "30%", // Ajustado para centrado vertical
        left: "50%", // Ajustado para mover el auto más al centro
        width: "min(55vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        bottom: "40%",
        left: "0%",
        width: "min(40vw, 600px)",
        height: "min(40vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        top: "0%",
        right: "12%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
      },
    }
  } else if (windowWidth >= 767) {
    return {
      front: {
        top: "55%",
        left: "50%",
        width: "min(75vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        top: "51%",
        left: "18%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        top: "51%",
        left: "80%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        top: "50%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        top: "50%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        top: "53%", // Ajustado para centrado vertical
        left: "50%", // Ajustado para mover el auto más al centro
        width: "min(55vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        top: "45%",
        left: "0%",
        width: "min(40vw, 600px)",
        height: "min(40vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
        yPercent: -50,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        bottom: "0%",
        left: "50%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
        xPercent: -50,
        yPercent: -50,
      },
    }
  } else {
    return {
      front: {
        top: "55%",
        left: "50%",
        width: "min(75vw, 1000px)",
        zIndex: 20,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "1000px",
      },
      leftBack: {
        top: "51%",
        left: "18%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "300px",
      },
      rightBack: {
        top: "51%",
        left: "80%",
        width: "min(23vw, 300px)",
        zIndex: 10,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "300px",
      },
      leftSide: {
        top: "50%",
        left: "0%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "800px",
      },
      rightSide: {
        top: "50%",
        left: "100%",
        width: "min(55vw, 800px)",
        zIndex: 15,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "800px",
      },
      leftDetail: {
        top: "53%", // Ajustado para centrado vertical
        left: "50%", // Ajustado para mover el auto más al centro
        width: "min(55vw, 1000px)",
        zIndex: 25,
        xPercent: -50,
        yPercent: -50,
        maxWidth: "1000px",
      },
      overlay: {
        // New overlay slot properties for small screens
        top: "45%",
        left: "0%",
        width: "min(40vw, 600px)",
        height: "min(40vw, 600px)", // Assuming square icons for better fit
        zIndex: 21,
        xPercent: 0,
        yPercent: -50,
      },
      infoBox: {
        // New info box slot properties for small screens
        top: "20px",
        right: "20px",
        zIndex: 50,
      },
      detailOverlay: {
        bottom: "0%",
        left: "50%",
        width: "min(50vw, 300px)",
        height: "calc(min(50vw, 300px) / 2)",
        zIndex: 31,
        xPercent: -50,
        yPercent: -50,
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

// Mapeo de IDs de auto a las imágenes de superposición
const carOverlayMap = {
  "auto-1": "/img/detailing.png",
  "auto-5": "/img/taller.png",
  "auto-2": "/img/ocacion.png",
  "auto-3": "/img/custom.png",
  "auto-4": "/img/tienda.png",
}

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
  const overlayImageRef = useRef(null) // Ref for the new overlay image
  const infoBoxRef = useRef(null) // Ref for the new info box container
  const infoTextRef = useRef(null) // Ref for the text part of the info box
  const infoIconCircleRef = useRef(null) // Ref for the icon's background circle
  const mainContainerRef = useRef(null) // Ref for the main draggable container
  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Ref for the animation interval ID
  const hasInfoBoxAnimatedInitially = useRef(false) // New ref to track initial info box animation
  const isInfoBoxInitializedRef = useRef(false)
  const detailOverlayImageRef = useRef(null) // Nueva ref para la imagen de superposición en detalle

  const linksRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Estados
  // Establecido a las posiciones iniciales exactas que el usuario ha especificado
  const [currentSlotAssignment, setCurrentSlotAssignment] = useState(["auto-1", "auto-3", "auto-2", "auto-4", "auto-5"])
  const [isDetailView, setIsDetailView] = useState(false)
  const [selectedCarNumber, setSelectedCarNumber] = useState(0)
  const [currentWindowWidth, setCurrentWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  )
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false) // Nuevo estado para la animación del carrusel

  // Dragging states
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const dragThreshold = 50 // pixels to trigger a rotation

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
    (carId: string, assignmentOrder: string[], slotsConfig: ReturnType<typeof getResponsiveSlots>) => {
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

  // Function to animate car movement
  const animateCarMovement = useCallback(
    (newAssignment: string[]) => {
      setIsCarouselAnimating(true) // Start carousel animation state

      // Hide the current overlay image immediately when carousel animation starts
      if (overlayImageRef.current && gsap.getProperty(overlayImageRef.current, "opacity") > 0) {
        gsap.to(overlayImageRef.current, {
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)",
          duration: 0.1,
          display: "none",
        })
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSlotAssignment(newAssignment)
          setIsCarouselAnimating(false) // End carousel animation state
        },
      })

      initialCarConfig.forEach((car) => {
        const carRef = carRefs[car.id].current
        if (carRef) {
          const newSlot = getSlotPropsForCar(car.id, newAssignment, currentSlots)
          // Determine the target filter based on the new slot
          const targetFilter = newSlot === currentSlots.leftSide ? "brightness(0.3)" : "brightness(1)"

          tl.to(
            carRef,
            {
              bottom: newSlot.bottom !== undefined ? newSlot.bottom : "auto",
              ...(currentWindowWidthRef.current < 979 ? { 
                top: newSlot.top !== undefined ? newSlot.top : "auto",
                yPercent: newSlot.yPercent !== undefined ? newSlot.yPercent : 0,
                } : {}),
              //top: newSlot.top !== undefined ? newSlot.top : "auto",
              left: newSlot.left,
              width: newSlot.width,
              zIndex: newSlot.zIndex,
              xPercent: newSlot.xPercent,
              //yPercent: newSlot.yPercent !== undefined ? newSlot.yPercent : 0,
              filter: targetFilter,
              duration: 1.5,
              ease: "expo.inOut",
            },
            0,
          ) // All animations start at the same time in the timeline
        }
      })
    },
    [getSlotPropsForCar, currentSlots],
  )

  // Function for counter-clockwise rotation (cars move left, sentido horario)
  const rotateCarouselLeft = useCallback(() => {
    const latestAssignment = currentSlotAssignmentRef.current
    // La secuencia de rotación es:
    // rightSide (4) -> front (0)
    // leftSide (3) -> leftBack (1)
    // leftBack (1) -> rightBack (2)
    // front (0) -> leftSide (3)
    // rightBack (2) -> rightSide (4)
    const correctNewAssignment = [
      latestAssignment[4], // El auto de rightSide va a front
      latestAssignment[3], // El auto de leftSide va a leftBack
      latestAssignment[1], // El auto de leftBack va a rightBack
      latestAssignment[0], // El auto de front va a leftSide
      latestAssignment[2], // El auto de rightBack va a rightSide
    ]
    animateCarMovement(correctNewAssignment)
  }, [animateCarMovement])

  // Function for clockwise rotation (cars move right, sentido anti-horario)
  const rotateCarouselRight = useCallback(() => {
    const latestAssignment = currentSlotAssignmentRef.current
    // La secuencia de rotación inversa es:
    // leftSide (3) -> front (0)
    // rightBack (2) -> leftBack (1)
    // rightSide (4) -> rightBack (2)
    // leftBack (1) -> leftSide (3)
    // front (0) -> rightSide (4)
    const newAssignment = [
      latestAssignment[3], // El auto de leftSide va a front
      latestAssignment[2], // El auto de rightBack va a leftBack
      latestAssignment[4], // El auto de rightSide va a rightBack
      latestAssignment[1], // El auto de leftBack va a leftSide
      latestAssignment[0], // El auto de front va a rightSide
    ]
    animateCarMovement(newAssignment)
  }, [animateCarMovement])

  // Function to restart automatic carousel animation
  const restartAutoCarousel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(rotateCarouselLeft, 4000)
  }, [rotateCarouselLeft])

  // Función para manejar click en el auto del frente
  const handleFrontCarClick = () => {
    if (isDetailViewRef.current || isCarouselAnimating) return // Deshabilitar clic si está en vista detalle o animando

    // AÑADIDO: Detener cualquier animación en curso y ocultar la imagen de superposición inmediatamente
    if (overlayImageRef.current) {
      gsap.killTweensOf(overlayImageRef.current) // Detener animaciones en curso
      gsap.set(overlayImageRef.current, { opacity: 0, display: "none" }) // Ocultar instantáneamente
    }

    const frontCarId = currentSlotAssignmentRef.current[0] // Usar ref
    const frontCar = initialCarConfig.find((car) => car.id === frontCarId)
    if (!frontCar) return

    setIsDetailView(true)
    isDetailViewRef.current = true // Actualizar ref
    setSelectedCarNumber(frontCar.number)

    // Detener la animación del carrusel
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null // Clear the ref
    }

    // Hide info box
    const infoBoxElement = infoBoxRef.current
    if (infoBoxElement) {
      gsap.to(infoBoxElement, { opacity: 0, duration: 0.3, ease: "power2.in", display: "none" })
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
        bottom: currentSlots.leftDetail.bottom !== undefined ? currentSlots.leftDetail.bottom : "auto",

        ...(currentWindowWidthRef.current < 979 ? { 
        top: currentSlots.leftDetail.top !== undefined ? currentSlots.leftDetail.top : "auto",
        yPercent: currentSlots.leftDetail.yPercent !== undefined ? currentSlots.leftDetail.yPercent : 0,
        } : {}),

        //top: currentSlots.leftDetail.top !== undefined ? currentSlots.leftDetail.top : "auto",
        left: currentSlots.leftDetail.left,
        width: currentSlots.leftDetail.width,
        zIndex: currentSlots.leftDetail.zIndex,
        xPercent: currentSlots.leftDetail.xPercent,
        //yPercent: currentSlots.leftDetail.yPercent !== undefined ? currentSlots.leftDetail.yPercent : 0,
        duration: 1.5,
        ease: "expo.inOut", // Mantener expo.inOut
        filter: "brightness(1)", // Ensure full brightness in detail view
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

          // AÑADIDO: Animación para mostrar detailOverlayImageRef
          const detailOverlayElement = detailOverlayImageRef.current
          const overlaySrc = carOverlayMap[frontCarId as keyof typeof carOverlayMap]
          const detailOverlaySlotProps = currentSlots.detailOverlay

          if (detailOverlayElement && overlaySrc) {
            gsap.set(detailOverlayElement, {
              top: detailOverlaySlotProps.top,
              right: detailOverlaySlotProps.right,
              zIndex: detailOverlaySlotProps.zIndex,
              width: detailOverlaySlotProps.width,
              height: detailOverlaySlotProps.height,
            })
            gsap.fromTo(
              detailOverlayElement,
              { opacity: 0, scale: 0.8, filter: "blur(10px)", display: "none" },
              {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
                display: "block",
              },
            )
          }
        },
      })
    }
  }

  // Función para cerrar la vista detalle
  const handleCloseDetail = () => {
    if (!isDetailViewRef.current) return // Usar ref

    // AÑADIDO: Ocultar detailOverlayImageRef inmediatamente
    const detailOverlayElement = detailOverlayImageRef.current
    if (detailOverlayElement) {
      gsap.to(detailOverlayElement, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0.3, // Duración similar a los otros elementos que se ocultan
        ease: "power2.in",
        onComplete: () => {
          gsap.set(detailOverlayElement, { display: "none" })
        },
      })
    }

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
        bottom: currentSlots.front.bottom !== undefined ? currentSlots.front.bottom : "auto",

        ...(currentWindowWidthRef.current < 979 ? { 
        top: currentSlots.front.top !== undefined ? currentSlots.front.top : "auto",
        Percent: currentSlots.front.yPercent !== undefined ? currentSlots.front.yPercent : 0,
        } : {}),

        //top: currentSlots.front.top !== undefined ? currentSlots.front.top : "auto",
        left: currentSlots.front.left,
        width: currentSlots.front.width,
        zIndex: currentSlots.front.zIndex,
        xPercent: currentSlots.front.xPercent,
        //yPercent: currentSlots.front.yPercent !== undefined ? currentSlots.front.yPercent : 0,
        duration: 1.5,
        ease: "expo.inOut",
        filter: "brightness(1)",
      })
    }

    // Mostrar los otros autos
    initialCarConfig.forEach((car) => {
      if (car.id !== frontCarId) {
        const carRef = carRefs[car.id].current
        if (carRef) {
          const slot = getSlotPropsForCar(car.id, currentSlotAssignmentRef.current, currentSlots)
          gsap.to(carRef, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5,
            filter: slot === currentSlots.leftSide ? "brightness(0.3)" : "brightness(1)", // Apply filter if it's leftSide
          })
        }
      }
    })

    // Reanudar la animación del carrusel inmediatamente después de que el auto principal regrese
    setTimeout(() => {
      setIsDetailView(false)
      isDetailViewRef.current = false // Actualizar ref
      setSelectedCarNumber(0)
      restartAutoCarousel()
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
          bottom: slotsForResize.leftDetail.bottom !== undefined ? slotsForResize.leftDetail.bottom : "auto",

          ...(currentWindowWidthRef.current < 979 ? { 
            top: slotsForResize.leftDetail.top !== undefined ? slotsForResize.leftDetail.top : "auto",
            yPercent: slotsForResize.leftDetail.yPercent !== undefined ? slotsForResize.leftDetail.yPercent : 0, 
            } : {}),  


          //top: slotsForResize.leftDetail.top !== undefined ? slotsForResize.leftDetail.top : "auto",
          left: slotsForResize.leftDetail.left,
          width: slotsForResize.leftDetail.width,
          xPercent: slotsForResize.leftDetail.xPercent,
          //yPercent: slotsForResize.leftDetail.yPercent !== undefined ? slotsForResize.leftDetail.yPercent : 0,
          filter: "brightness(1)",
        })
      }
    } else {
      initialCarConfig.forEach((car) => {
        const carRef = carRefs[car.id].current
        if (carRef) {
          const slot = getSlotPropsForCar(car.id, currentSlotAssignmentRef.current, slotsForResize)
          gsap.set(carRef, {
            bottom: slot.bottom !== undefined ? slot.bottom : "auto",

            ...(currentWindowWidthRef.current < 979 ? { 
            top: slot.top !== undefined ? slot.top : "auto",
            yPercent: slot.yPercent !== undefined ? slot.yPercent : 0,
            } : {}),


            //top: slot.top !== undefined ? slot.top : "auto",
            left: slot.left,
            width: slot.width,
            zIndex: slot.zIndex,
            xPercent: slot.xPercent,
            //yPercent: slot.yPercent !== undefined ? slot.yPercent : 0,
            filter: slot === slotsForResize.leftSide ? "brightness(0.3)" : "brightness(1)",
          })
        }
      })
    }

    // Update overlay image position on resize
    const overlayElement = overlayImageRef.current
    if (overlayElement) {
      const currentFrontCarId = currentSlotAssignmentRef.current[0]
      const overlaySrc = carOverlayMap[currentFrontCarId as keyof typeof carOverlayMap]
      const overlaySlotProps = slotsForResize.overlay

      if (!(isDetailViewRef.current || isCarouselAnimating || !overlaySrc)) {
        // Only update if currently visible
        gsap.set(overlayElement, {
          bottom: overlaySlotProps.bottom !== undefined ? overlaySlotProps.bottom : "auto",


          ...(currentWindowWidthRef.current < 979 ? { 
            top: overlaySlotProps.top !== undefined ? overlaySlotProps.top : "auto",
            yPercent: overlaySlotProps.yPercent !== undefined ? overlaySlotProps.yPercent : 0,
            } : {}),  

          //top: overlaySlotProps.top !== undefined ? overlaySlotProps.top : "auto",
          left: overlaySlotProps.left,
          width: overlaySlotProps.width,
          height: overlaySlotProps.height,
          xPercent: overlaySlotProps.xPercent,
          //yPercent: overlaySlotProps.yPercent !== undefined ? overlaySlotProps.yPercent : 0,
        })
      }
    }

    // Update info box position on resize
    const infoBoxElement = infoBoxRef.current
    if (infoBoxElement) {
      const infoBoxSlotProps = slotsForResize.infoBox
      gsap.set(infoBoxElement, {
        top: infoBoxSlotProps.top,
        right: infoBoxSlotProps.right,
        zIndex: infoBoxSlotProps.zIndex,
      })
    }
  }, [getSlotPropsForCar, isCarouselAnimating]) // Added isCarouselAnimating to dependencies

  // Effect to manage overlay image visibility and animation
  useEffect(() => {
    const frontCarId = currentSlotAssignment[0]
    const overlayImageElement = overlayImageRef.current
    const overlaySrc = carOverlayMap[frontCarId as keyof typeof carOverlayMap]
    const overlaySlotProps = currentSlots.overlay

    if (!overlayImageElement) return

    if (isDetailView || isCarouselAnimating || !overlaySrc) {
      // Hide immediately if in detail view, carousel animating, or no specific overlay for the current front car
      gsap.to(overlayImageElement, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 0, // Quick hide
        display: "none", // Ensure it's truly hidden
      })
    } else {
      // Position and show with animation
      gsap.set(overlayImageElement, {
        // Set properties immediately before animating
        bottom: overlaySlotProps.bottom !== undefined ? overlaySlotProps.bottom : "auto",

        ...(currentWindowWidthRef.current < 979 ? { 
        top: overlaySlotProps.top !== undefined ? overlaySlotProps.top : "auto",
        yPercent: overlaySlotProps.yPercent !== undefined ? overlaySlotProps.yPercent : 0,
        } : {}),


        //top: overlaySlotProps.top !== undefined ? overlaySlotProps.top : "auto",
        left: overlaySlotProps.left,
        zIndex: overlaySlotProps.zIndex,
        xPercent: overlaySlotProps.xPercent,
        //yPercent: overlaySlotProps.yPercent !== undefined ? overlaySlotProps.yPercent : 0,
        width: overlaySlotProps.width,
        height: overlaySlotProps.height,
      })
      gsap.fromTo(
        overlayImageElement,
        { opacity: 0, scale: 0.8, filter: "blur(10px)", display: "none" }, // Start with blur
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out", delay: 0.2, display: "block" }, // Animate to no blur
      )
    }
  }, [currentSlotAssignment, isDetailView, isCarouselAnimating, currentSlots])

  // Efecto para gestionar la visibilidad inicial y el ocultamiento de la imagen de superposición en detalle
  useEffect(() => {
    const detailOverlayElement = detailOverlayImageRef.current
    if (!detailOverlayElement) return

    // Asegurar que esté oculto por defecto o cuando no esté en vista de detalle
    if (!isDetailView) {
      gsap.set(detailOverlayElement, { opacity: 0, scale: 0.8, filter: "blur(10px)", display: "none" })
    }
    // La animación de aparición se manejará en handleFrontCarClick
    // La animación de ocultamiento se manejará en handleCloseDetail
  }, [isDetailView]) // Solo depende de isDetailView para su estado inicial/ocultamiento

  // Effect to manage info box visibility and animation
  useEffect(() => {
    const infoBoxElement = infoBoxRef.current
    const infoTextElement = infoTextRef.current
    const infoIconCircleElement = infoIconCircleRef.current
    if (!infoBoxElement || !infoTextElement || !infoIconCircleElement) return

    // Kill any existing tweens on these elements to prevent conflicts
    gsap.killTweensOf([infoBoxElement, infoTextElement, infoIconCircleElement])

    const infoBoxSlotProps = currentSlots.infoBox

    if (isDetailView) {
      // Hide info box when in detail view
      gsap.to(infoBoxElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(infoBoxElement, { display: "none" })
          // Reset elements to initial state for next appearance animation
          gsap.set(infoTextElement, { opacity: 0, width: 0 })
          gsap.set(infoIconCircleElement, { scale: 1 })
        },
      })
    } else {
      // Ensure info box container is visible and positioned
      gsap.set(infoBoxElement, {
        top: infoBoxSlotProps.top,
        right: infoBoxSlotProps.right,
        zIndex: infoBoxSlotProps.zIndex,
        display: "flex", // Ensure it's displayed as flex for layout
      })

      if (!hasInfoBoxAnimatedInitially.current) {
        // Initial animation only once
        const tl = gsap.timeline({ delay: 0.5 }) // Add a small delay before animation starts

        // Animate the text and icon elements from their initial (collapsed) state
        tl.fromTo(
          infoTextElement,
          { opacity: 0, width: 0 },
          {
            opacity: 1,
            width: "auto", // Animate to auto width
            duration: 0.8, // Duration for text expansion
            ease: "power2.out",
          },
          0, // Start at the beginning of the timeline
        )
        tl.to(
          infoIconCircleElement,
          {
            scale: 0.8, // Animate to final scale
            duration: 0.8, // Duration for icon scaling
            ease: "power2.out",
          },
          0, // Start at the beginning of the timeline
        )

        // Ensure the entire infoBox is visible (opacity 1) during and after its children animate
        tl.set(infoBoxElement, { opacity: 1 }, 0) // Set opacity to 1 immediately for the duration of children animation

        hasInfoBoxAnimatedInitially.current = true
      } else {
        // After initial animation, simply ensure it's visible and in final expanded state
        gsap.set(infoBoxElement, { opacity: 1, display: "flex" })
        gsap.set(infoTextElement, { opacity: 1, width: "auto" })
        gsap.set(infoIconCircleElement, { scale: 0.8 })
      }
    }
  }, [isDetailView, currentSlots])

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isDetailViewRef.current || isCarouselAnimating) return
      setIsDragging(true)
      startX.current = e.clientX
      // Stop auto carousel
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      // Prevent text selection
      e.preventDefault()
    },
    [isCarouselAnimating],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      // Prevent text selection
      e.preventDefault()
    },
    [isDragging],
  )

  // REEMPLAZAR handleMouseUp con el siguiente código:
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      setIsDragging(false) // This will trigger the useEffect to potentially restart the carousel
      const dragDistance = e.clientX - startX.current

      if (Math.abs(dragDistance) > dragThreshold) {
        if (dragDistance > 0) {
          // Dragged right, rotate carousel clockwise
          rotateCarouselRight()
        } else {
          // Dragged left, rotate carousel counter-clockwise
          rotateCarouselLeft()
        }
      }
      // REMOVIDO: setTimeout(restartAutoCarousel, 2000)
    },
    [isDragging, rotateCarouselRight, rotateCarouselLeft], // restartAutoCarousel ya no es una dependencia aquí, ya que no se llama directamente
  )

  // REEMPLAZAR handleTouchEnd con el siguiente código:
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      setIsDragging(false) // This will trigger the useEffect to potentially restart the carousel
      const dragDistance = e.changedTouches[0].clientX - startX.current

      if (Math.abs(dragDistance) > dragThreshold) {
        if (dragDistance > 0) {
          // Dragged right, rotate carousel clockwise
          rotateCarouselRight()
        } else {
          // Dragged left, rotate carousel counter-clockwise
          rotateCarouselLeft()
        }
      }
      // REMOVIDO: setTimeout(restartAutoCarousel, 2000)
    },
    [isDragging, rotateCarouselRight, rotateCarouselLeft], // restartAutoCarousel ya no es una dependencia aquí, ya que no se llama directamente
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isDetailViewRef.current || isCarouselAnimating) return
      setIsDragging(true)
      startX.current = e.touches[0].clientX
      // Stop auto carousel
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    },
    [isCarouselAnimating],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      // Prevent scrolling
      e.preventDefault()
    },
    [isDragging],
  )

  // NUEVA FUNCIÓN: Variable para controlar si el carrusel debe iniciarse automáticamente - edward
  const shouldCarouselAutoStart = true // Cambiado a 'true' para iniciar automáticamente

  // Initial effect and event listeners setup
  useEffect(() => {
    // Initial positioning of cars
    initialCarConfig.forEach((car) => {
      const carRef = carRefs[car.id].current
      if (carRef) {
        const slot = getSlotPropsForCar(
          car.id,
          currentSlotAssignmentRef.current,
          getResponsiveSlots(currentWindowWidthRef.current),
        )
        gsap.set(carRef, {
          bottom: slot.bottom !== undefined ? slot.bottom : "auto",

          ...(currentWindowWidthRef.current < 979 ? { 
            top: slot.top !== undefined ? slot.top : "auto",
            yPercent: slot.yPercent !== undefined ? slot.yPercent : 0, 
            } : {}),  


          //top: slot.top !== undefined ? slot.top : "auto",
          left: slot.left,
          width: slot.width,
          zIndex: slot.zIndex,
          xPercent: slot.xPercent,
          //yPercent: slot.yPercent !== undefined ? slot.yPercent : 0,
          // ELIMINADO: filter:
          //   slot === getResponsiveSlots(currentWindowWidthRef.current).leftSide ? "brightness(0.3)" : "brightness(1)",
        })
      }
    })

    // Initialize overlay image properties
    const overlayElement = overlayImageRef.current
    if (overlayElement) {
      const overlaySlotProps = getResponsiveSlots(currentWindowWidth).overlay
      gsap.set(overlayElement, { opacity: 0, scale: 0.8, filter: "blur(10px)", display: "none", ...overlaySlotProps })
    }

    // Initialize info box elements to their *initial* states for animation
    const infoBoxElement = infoBoxRef.current
    const infoTextElement = infoTextRef.current
    const infoIconCircleElement = infoIconCircleRef.current
    if (infoBoxElement && infoTextElement && infoIconCircleElement && !isInfoBoxInitializedRef.current) {
      const infoBoxSlotProps = getResponsiveSlots(currentWindowWidth).infoBox
      gsap.set(infoBoxElement, {
        top: infoBoxSlotProps.top,
        right: infoBoxSlotProps.right,
        zIndex: infoBoxSlotProps.zIndex,
        opacity: 1, // Start visible
        display: "flex", // Ensure it's visible as flex
      })
      gsap.set(infoTextElement, { opacity: 0, width: 0 }) // Text starts hidden/collapsed
      gsap.set(infoIconCircleElement, { scale: 1 }) // Icon starts at full size (before scaling down)
      isInfoBoxInitializedRef.current = true
    }

    // Add event listeners for drag functionality
    const container = mainContainerRef.current
    if (container) {
      container.addEventListener("mousedown", handleMouseDown as EventListener)
      container.addEventListener("touchstart", handleTouchStart as EventListener)
    }
    window.addEventListener("mousemove", handleMouseMove as EventListener)
    window.addEventListener("mouseup", handleMouseUp as EventListener)
    window.addEventListener("touchmove", handleTouchMove as EventListener)
    window.addEventListener("touchend", handleTouchEnd as EventListener)
    window.addEventListener("resize", handleResize)

    // REMOVED: Condición para iniciar el carrusel automáticamente
    // if (shouldCarouselAutoStart) {
    //   restartAutoCarousel()
    // }

    return () => {
      // Cleanup event listeners
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown as EventListener)
        container.removeEventListener("touchstart", handleTouchStart as EventListener)
      }
      window.removeEventListener("mousemove", handleMouseMove as EventListener)
      window.removeEventListener("mouseup", handleMouseUp as EventListener)
      window.removeEventListener("touchmove", handleTouchMove as EventListener)
      window.removeEventListener("touchend", handleTouchEnd as EventListener)
      window.removeEventListener("resize", handleResize)
      // Cleanup the interval using the ref (this cleanup is now also handled by the new useEffect)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleResize,
    // REMOVED: restartAutoCarousel,
    // REMOVED: shouldCarouselAutoStart,
  ]) // Dependencies for useEffect

  // Add a new useEffect to manage the carousel interval based on isDetailView
  useEffect(() => {
    // Condition to start/continue carousel: Not in detail view, auto-start is true, NOT animating, AND NOT dragging.
    if (!isDetailView && shouldCarouselAutoStart && !isCarouselAnimating && !isDragging) {
      restartAutoCarousel() // This will clear existing and set new interval
    } else {
      // Clear the interval if in detail view, auto-start is off, OR carousel is animating, OR dragging is active.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    // Cleanup function for this specific effect
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isDetailView, shouldCarouselAutoStart, restartAutoCarousel, isCarouselAnimating, isDragging]) // All relevant states as dependencies

  // New effect to ensure filter persistence after slot assignments change
  useEffect(() => {
    initialCarConfig.forEach((car) => {
      const carRef = carRefs[car.id].current
      if (carRef) {
        const currentSlot = getSlotPropsForCar(car.id, currentSlotAssignment, currentSlots)
        // Ensure the comparison identifies the leftSide slot by checking if its properties match
        // the leftSide properties of the currentSlots object, which is memoized.
        const isLeftSideCar =
          currentSlot.bottom === currentSlots.leftSide.bottom &&
          currentSlot.left === currentSlots.leftSide.left &&
          currentSlot.width === currentSlots.leftSide.width &&
          currentSlot.zIndex === currentSlots.leftSide.zIndex &&
          currentSlot.xPercent === currentSlots.leftSide.xPercent

        const targetFilter = isLeftSideCar ? "brightness(0.3)" : "brightness(1)"


        gsap.set(carRef, {
          bottom: currentSlot.bottom !== undefined ? currentSlot.bottom : "auto",

          ...(currentWindowWidthRef.current < 979 ? { 
            top: currentSlot.top !== undefined ? currentSlot.top : "auto",
            yPercent: currentSlot.yPercent !== undefined ? currentSlot.yPercent : 0,
            } : {}),  


          //top: currentSlot.top !== undefined ? currentSlot.top : "auto",
          xPercent: currentSlot.xPercent,
          //yPercent: currentSlot.yPercent !== undefined ? currentSlot.yPercent : 0,
          filter: targetFilter,
        })
      }
    })
  }, [currentSlotAssignment, currentSlots, getSlotPropsForCar])

  // Get texts for the selected car
  const currentLinkTexts = linkTexts[selectedCarNumber as keyof typeof linkTexts] || linkTexts[1]

  return (
    <div
      ref={mainContainerRef}
      className="relative w-screen h-screen overflow-hidden flex items-end justify-center bigScreen"
    >
      {/* Render each car */}
      {initialCarConfig.map((car) => {
        const currentSlotProps = getSlotPropsForCar(car.id, currentSlotAssignment, currentSlots)
        const isFrontCar = currentSlotAssignment[0] === car.id
        // No necesitamos isLeftSideCar aquí, GSAP lo manejará.

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
            quality={75}
            priority={true}
            placeholder="blur"
            className={`absolute ${
              isFrontCar && !isDetailView && !isCarouselAnimating
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : ""
            }`}
            ref={carRefs[car.id]}
            onClick={isFrontCar && !isDetailView && !isCarouselAnimating ? handleFrontCarClick : undefined}
            style={{
              bottom: currentSlotProps.bottom,
              left: currentSlotProps.left,
              zIndex: currentSlotProps.zIndex,
              width: currentSlotProps.width,
              height: "auto",
              // ELIMINADO: filter: isLeftSideCar ? "brightness(0.3)" : "brightness(1)", // Esto ahora lo maneja GSAP
              // AÑADIDO: Oculta el auto si estamos en vista de detalle y no es el auto frontal
              display: isDetailView && car.id !== currentSlotAssignment[0] ? "none" : "block",
            }}
          />
        )
      })}

      {/* Overlay Image (always rendered, visibility controlled by GSAP) */}
      <div
        ref={overlayImageRef}
        className="absolute"
        style={{
          pointerEvents: "none", // Make it not clickable
          // Initial styling for GSAP to take over, or just let GSAP.set handle it on first render
          // opacity and scale are handled by useEffect
        }}
      >
        <Image
          src={carOverlayMap[currentSlotAssignment[0] as keyof typeof carOverlayMap] || "/placeholder.svg"}
          alt="Icono de servicio" // Generic alt text for the overlay icons
          width={500} // Intrinsic width for Next.js optimization (actual size controlled by parent div)
          height={500} // Intrinsic height
          fill // Usar 'fill' en lugar de 'layout="fill"'
          objectFit="contain"
          // Eliminar width y height cuando se usa fill
        />
      </div>

      {/* Info Box */}
      <div
        ref={infoBoxRef}
        className={`absolute flex items-center bg-white rounded-full ${currentWindowWidth <= 480 ? "aviso" : ""} `}
        style={{
          top: currentSlots.infoBox.top,
          right: currentSlots.infoBox.right,
          zIndex: currentSlots.infoBox.zIndex,
          pointerEvents: "none", // Not clickable
          // Initial opacity and display are set by the useEffect/GSAP
        }}
      >
        {/* Icon part - will be animated and then fixed */}
        <span
          ref={infoIconCircleRef}
          className="bg-black rounded-full p-2 flex items-center justify-center flex-shrink-0"
        >
          <InfoIcon className="h-6 w-6 text-white" />
        </span>
        {/* Text part - will be animated and then fixed */}
        <span
          ref={infoTextRef}
          className={`bg-white text-black px-3 py-2 rounded-r-full whitespace-nowrap  ${currentWindowWidth <= 480 ? "avisoTxt" : ""} `}
          style={{
            overflow: "hidden",
            display: "flex", // Keep flex for alignment
            alignItems: "center",
          }}
        >
          Pulsa en un vehículo para descubrir más
        </span>
      </div>

      {isDetailView && (
        <>
          {/* Nuevo componente de imagen para la vista de detalle */}
          <div
            ref={detailOverlayImageRef}
            className="absolute logoDetail"
            style={{
              pointerEvents: "none", // No es clickeable
              // Las propiedades de posición y visibilidad inicial serán controladas por GSAP en el useEffect
            }}
          >
            <Image
              src={carOverlayMap[currentSlotAssignment[0] as keyof typeof carOverlayMap] || "/placeholder.svg"}
              alt="Icono de servicio en detalle"
              width={500} // Ancho intrínseco para Next.js (el tamaño real lo controla el div padre)
              height={250} // Altura intrínseca
              fill // Para que la imagen llene el div padre
              objectFit="contain"
            />
          </div>

          {/* Links that appear when clicked (el div existente) */}
          <div
            ref={linksRef}
            className={`absolute transform -translate-y-1/2 flex flex-col space-y-4 z-30 detail-links-container ${currentWindowWidth <= 576 ? "compact" : ""}`}
          >
            <a
              href="#"
              className="flex items-center detail-link-item px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[350px]"
            >
              <span className="flex-1 text-center">{currentLinkTexts.ceramic}</span>
              <ChevronRightIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[350px]"
            >
              <span className="flex-1 text-center">{currentLinkTexts.ppf}</span>
              <ChevronRightIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[350px]"
            >
              <span className="flex-1 text-center">{currentLinkTexts.polished}</span>
              <ChevronRightIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 bg-black text-orange-500 border border-white rounded-md text-lg font-semibold uppercase hover:bg-gray-900 transition-colors duration-200 min-w-[350px]"
            >
              <span className="flex-1 text-center">{currentLinkTexts.paddockLine}</span>
              <ChevronRightIcon className="h-5 w-5" />
            </a>
          </div>
        </>
      )}

      {/* Close button */}
      {isDetailView && (
        <button
          ref={closeButtonRef}
          onClick={handleCloseDetail}
          className="absolute top-8 right-8 text-white hover:text-gray-300 bg-black bg-opacity-50 p-3 rounded-full transition-colors duration-200 z-40"
          aria-label="Cerrar vista detalle"
          style={{ visibility: "hidden" }} // Initially hidden
        >
          <XIcon className="h-8 w-8" />
        </button>
      )}

      {/* Aquí iría el <style> tag */}
      <style jsx>{`

        .bigScreen {
            background: url(/img/fondo-mobile-ok.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: top center;
            min-height: 100dvh;
            height: 100dvh;
        }

        .detail-links-container {
          right: auto;
          bottom: 0%;
          visibility: hidden;
        }

        .detail-link-item {
          min-width: 280px; /* Ancho por defecto para pantallas pequeñas */
        }
          
        .compact a {
          min-width: calc(100vw - 40px);
          margin: 0 auto;
          padding: 7px 30px;
          margin-top: 10px !important;
          font-size: 16px;
        }

        .logoDetail {
          margin-right: -100000px;
        }

        .aviso {
          max-width: calc(100vw - 10vw);             
        }

        .aviso .avisoTxt {
            padding: 0;
            padding-right: 14px;
            font-size: 12px;
        }

        @media (min-width: 375px) {
          .detail-links-container {
            right: auto;
            bottom: -10%;
          }
          .detail-link-item {
            min-width: 350px;
          }

          .aviso {
            max-width: calc(100vw - 20vw);             
          }
        }

        @media (min-width: 414px) {
          .detail-links-container {
            right: auto;
            bottom: -5%;
          }
          .detail-link-item {
            min-width: 350px;
          }

          .aviso {
            max-width: calc(100vw - 20vw);             
          }
        }

        @media (min-width: 480px) {
          .detail-links-container {
            right: auto;
            bottom: 0%;
          }
          .detail-link-item {
            min-width: 350px;
          }

          .aviso {
            max-width: calc(100vw - 20vw);             
          }
        }

        @media (min-width: 575px) {
          .detail-links-container {
            right: auto;
            bottom: -5%;
          }
          .detail-link-item {
            min-width: 400px;
          }
        }

        @media (min-width: 580px) {
          .detail-links-container {
            right: auto;
            bottom: -12%;
          }
          .detail-link-item {
            min-width: 400px;
          }
        }

        
        @media (min-width: 767px) {
          .detail-links-container {
            right: auto;
            bottom: 5%;
          }
          .detail-link-item {
            min-width: 450px;
          }

          .bigScreen {
            background-position: center center;
          }

        }

        @media (min-width: 979px) {
          .detail-links-container {
            right: auto;
            bottom: 0%;
          }
          .detail-link-item {
            min-width: 450px;
          }

          .bigScreen {
            background-position: center center;
          }
          
        }

        @media (min-width: 991px) {
          .detail-links-container {
            right: auto;
            bottom: 1%;
          }
          .detail-link-item {
            min-width: 450px;
          }
          .logoDetail {
            margin-right: -100000px;
          } 
            
          .bigScreen {
            background-position: center center;
          }

 
        }

        @media (min-width: 1024px) {
          .detail-links-container {
            right: 10%;
            bottom: -8%;
          }
          .detail-link-item {
            min-width: 350px;
          }
          
          .logoDetail {
            margin-right: 0px;
          }

          .bigScreen {
              background: url(/img/background-new.jpg) center center;
              background-size: cover;
          }
        }

        @media (min-width: 1280px) {
          .detail-links-container {
            right: 10%;
            bottom: -8%;
          }
          .detail-link-item {
            min-width: 350px;
          }
          .logoDetail {
            margin-right: 0px;
          }
          .bigScreen {
              background: url(/img/background-new.jpg) center center;
              background-size: cover;
          }    
        }

        @media (min-width: 1366px) {
          .detail-links-container {
            right: 10%;
            bottom: -8%;
          }
          .detail-link-item {
            min-width: 350px;
          }
          .logoDetail {
            margin-right: 0px;
          }
          .bigScreen {
              background: url(/img/background-new.jpg) center center;
              background-size: cover;
          }    
        }

        @media (min-width: 1536px) {
          .detail-links-container {
            right: 15%;
            bottom: 10%;
          }
          .detail-link-item {
            min-width: 450px;
          }
          .logoDetail {
            margin-right: 0px;
          }
          .bigScreen {
              background: url(/img/background-new.jpg) center center;
              background-size: cover;
          }    
        }

        

      `}</style>
    </div>
  )
}
