import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * Creates scroll snapping for a set of elements
 * @param sections Array of HTML elements to snap to
 * @param options Configuration options
 */
export function createScrollSnapping(
  sections: HTMLElement[],
  options: {
    duration?: number
    ease?: string
    offsetY?: number
    threshold?: number
    debounceTime?: number
  } = {},
) {
  const { duration = 0.8, ease = "power2.out", offsetY = 0, threshold = 0.5, debounceTime = 150 } = options

  if (!sections.length) return () => {}

  // Create ScrollTrigger for each section
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: `top ${threshold * 100}%`,
      end: `bottom ${threshold * 100}%`,
      onEnter: () => {
        gsap.to(window, {
          duration,
          scrollTo: {
            y: section,
            offsetY,
            autoKill: false,
          },
          ease,
          overwrite: "auto",
        })
      },
      onEnterBack: () => {
        gsap.to(window, {
          duration,
          scrollTo: {
            y: section,
            offsetY,
            autoKill: false,
          },
          ease,
          overwrite: "auto",
        })
      },
    })
  })

  // Handle manual scrolling and snap to closest section when scrolling stops
  let isScrolling = false
  let scrollTimeout: NodeJS.Timeout

  const handleScroll = () => {
    isScrolling = true
    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      isScrolling = false

      // Find the closest section to snap to when scrolling stops
      const scrollPosition = window.scrollY + window.innerHeight * threshold
      let closestSection = sections[0]
      let closestDistance = Math.abs(closestSection.getBoundingClientRect().top + window.scrollY - scrollPosition)

      sections.forEach((section) => {
        const sectionPosition = section.getBoundingClientRect().top + window.scrollY
        const distance = Math.abs(sectionPosition - scrollPosition)

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section
        }
      })

      // Snap to the closest section
      gsap.to(window, {
        duration: duration * 0.75, // Slightly faster for manual scrolling
        scrollTo: {
          y: closestSection,
          offsetY,
          autoKill: false,
        },
        ease,
        overwrite: "auto",
      })
    }, debounceTime)
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll)

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll)
    clearTimeout(scrollTimeout)
  }
}
