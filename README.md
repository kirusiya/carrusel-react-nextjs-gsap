# Interactive Content Carousel

Este proyecto es una aplicación web interactiva que presenta un carrusel de elementos visuales con animaciones fluidas y una vista de detalle inmersiva. Está diseñado para mostrar una experiencia de usuario dinámica y visualmente atractiva, destacando el uso de tecnologías modernas de desarrollo frontend.

## Visión General del Proyecto

El objetivo principal de este proyecto es crear una interfaz de usuario altamente interactiva donde los usuarios puedan navegar a través de una serie de elementos (representados como autos) en un carrusel dinámico. Al hacer clic en el elemento central, se activa una vista de detalle que revela más información y opciones, con transiciones suaves y responsivas.

## Características

*   **Carrusel Interactivo:** Navegación automática y manual a través de una colección de elementos.
*   **Animaciones Fluidas:** Transiciones suaves y dinámicas entre los elementos del carrusel y las vistas de detalle, impulsadas por GSAP.
*   **Vista de Detalle Inmersiva:** Al hacer clic en un elemento, se expande a una vista de detalle con información adicional y enlaces.
*   **Diseño Responsivo:** La interfaz se adapta y funciona correctamente en diferentes tamaños de pantalla y dispositivos.
*   **Control de Clics:** Los clics están deshabilitados durante las animaciones del carrusel para evitar desajustes visuales.

## Tecnologías Utilizadas

*   **React:** Biblioteca de JavaScript para construir interfaces de usuario.
*   **Next.js:** Framework de React para aplicaciones web de producción, con soporte para Server Components y optimizaciones.
*   **GSAP (GreenSock Animation Platform):** Una potente biblioteca de animación JavaScript para crear animaciones de alto rendimiento.
*   **Tailwind CSS:** Framework CSS para un desarrollo rápido y responsivo.
*   **Lucide React:** Colección de iconos personalizables.

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO] https://github.com/kirusiya/carrusel-react-nextjs-gsap.git
    cd interactive-content-carousel
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Ejecuta la aplicación en modo desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```

    La aplicación estará disponible en `http://localhost:3000`.

## Uso

Una vez que la aplicación esté en funcionamiento:

*   El carrusel de elementos se moverá automáticamente.
*   Puedes hacer clic en el elemento que se encuentra en la posición central/frontal para acceder a su vista de detalle.
*   Dentro de la vista de detalle, puedes hacer clic en el botón de cerrar (X) para regresar al carrusel.
*   El clic en el elemento central está deshabilitado mientras el carrusel está en movimiento para asegurar una experiencia fluida.

## Diseño Responsivo

El diseño de la aplicación es completamente responsivo, adaptándose a diferentes anchos de ventana. Las posiciones y tamaños de los elementos se ajustan dinámicamente para proporcionar la mejor experiencia visual en dispositivos de escritorio y móviles.

## Animaciones

Las animaciones son un componente clave de este proyecto. Se utiliza GSAP para orquestar transiciones suaves y complejas, incluyendo:

*   Movimiento de los elementos en el carrusel.
*   Transiciones de entrada y salida de la vista de detalle.
*   Animaciones de los enlaces y el botón de cerrar en la vista de detalle.

Se ha prestado especial atención a la optimización de las animaciones para garantizar un rendimiento fluido.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una sugerencia de mejora, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

**Developer**: Ing. Edward Avalos  

- **Ing. Edward Avalos** - *Full Stack Developer y Desarrollador Principal* - [GitHub](https://github.com/kirusiya/) | [LinkedIn](https://www.linkedin.com/in/edward-avalos-severiche/)
- 📧 **Email**: edward@ajamba.org
- 📱 **WhatsApp Business**: (+591 61781119) | [Whatsapp](https://wa.me/59161781119)
---

*For technical support or questions about this implementation, please refer to the troubleshooting section or review the comprehensive code documentation within the project files.*
