"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Link2 } from "lucide-react"
import MarkdownText from "../MarkdownText"
import AudioChat from "../AudioChat"

interface ProjectDetailProps {
  id?: string
  title: string
  subTitle: string
  overview?: string
  url?: string
  imageUrl?: string
  problemTitle?: string
  problemOverview?: string
  problems?: string[]
  solutionTitle?: string
  solutionOverview?: string
  solutions?: string[]
  problemImage?: string
  solutionImage?: string
  videoUrl?: string
  videoThumbnail?: string
  videoTitle?: string
  videoOverview?: string
}

export default function ProjectDetail({
  id,
  title,
  subTitle,
  url,
  imageUrl,
  problemTitle = "Problem",
  problemOverview,
  problems = [],
  solutionTitle = "Solution",
  solutionOverview,
  solutions = [],
  problemImage,
  solutionImage,
  videoUrl,
  videoThumbnail,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Function to handle video play
  const handlePlay = () => {
    console.log(isPlaying)
    // Pause all other videos on the page
    const allVideos = document.querySelectorAll("video")
    allVideos.forEach((video) => {
      if (video !== videoRef.current) {
        video.pause()
      }
    })
    setIsPlaying(true)
  }

  // Function to handle video pause
  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <section id={id} ref={sectionRef} className={`flex flex-col text-foreground bg-background {bgColor} .max-lg:min-h-max max-lg:bg-white/10 max-lg:p-2 rounded-[30px] max-lg:mt-4`}>
      {/* Header Section */}
      <div className="h-full w-full flex flex-col lg:flex-row-reverse items-center lg:gap-4 {max-lg:mt-10}">
        <div className="w-full md:py-5 lg:h-[calc(100dvh-64px)] flex items-center">
          <div className="relative w-full aspect-[16/9] md:rounded-3xl overflow-hidden rounded-3xl">
            <Image src={imageUrl! || "/placeholder.svg"} alt="Header visual" fill className="object-cover" />
          </div>
        </div>

        {/* Small Heading */}
        <div className="lg:w-1/3 space-y-1 lg:space-y-4 max-lg:text-center max-md:p-6 max-md:pb-0">
          <h1 className="text-2xl sm:text-[3.5dvw] leading-none font-semibold">
            <MarkdownText>{title}</MarkdownText>
          </h1>
          <div className="text-zinc-400 sm:text-[1.8dvw]">
            <MarkdownText>{subTitle}</MarkdownText>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 rounded-full py-1 px-2 lg:py-2 lg:px-4 hover:bg-white/20 transition-colors lg:mt-4 text-sm sm:text-[1.5dvw]"
            >
              <Link2 className="w-5 h-5" />
              Visit Project
            </a>
          )}
        </div>
      </div>

      {/* Problem and Solution Sections - Mobile Optimized */}
      <div className="pt-6 sm:px-6">
        {/* Mobile: Stacked Layout, Desktop: Side by Side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Problem Section */}
          <div className="bg-foreground text-background rounded-3xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              <MarkdownText>{problemTitle}</MarkdownText>
            </h2>

            {problemOverview && (
              <div className="text-sm sm:text-base lg:text-lg leading-relaxed">
                <MarkdownText>{problemOverview}</MarkdownText>
              </div>
            )}

            {problems.length > 0 && (
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 pl-4 sm:pl-5 list-disc">
                {problems.map((item, idx) => (
                  <li key={idx} className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    <MarkdownText>{item}</MarkdownText>
                  </li>
                ))}
              </ul>
            )}

            {problemImage && (
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden mt-4">
                <Image
                  src={problemImage || "/placeholder.svg"}
                  alt="Problem illustration"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Solution Section */}
          <div className="bg-bright-yellow text-background rounded-3xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              <MarkdownText>{solutionTitle}</MarkdownText>
            </h2>

            {solutionOverview && (
              <div className="text-sm sm:text-base lg:text-lg leading-relaxed">
                <MarkdownText>{solutionOverview}</MarkdownText>
              </div>
            )}

            {solutions.length > 0 && (
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 pl-4 sm:pl-5 list-disc">
                {solutions.map((item, idx) => (
                  <li key={idx} className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    <MarkdownText>{item}</MarkdownText>
                  </li>
                ))}
              </ul>
            )}

            {solutionImage && (
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden mt-4">
                <Image
                  src={solutionImage || "/placeholder.svg"}
                  alt="Solution illustration"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Section */}
      {videoUrl && (
        <>
          {id === "smart-plab-assistant" ? (
            <div className="sm:px-6">
              <AudioChat
                assistantId={process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID}
                chatTitle="Talk to Robert"
                chatOverview="Experience our solution firsthand with a live conversation. Talk to Robert, a frustrated patient and try to diagnose and solve their problems!"
              />
            </div>
          ) : (
            <div className="flex items-center rounded-3xl mt-4 sm:my-6 sm:px-6">
              <div className="mx-auto w-full">
                <div className="aspect-[16/9] sm:aspect-[16/9] lg:aspect-[20/9] rounded-3xl overflow-hidden w-full bg-white/10 backdrop-blur-xl">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={videoUrl}
                    poster={videoThumbnail}
                    controls
                    playsInline
                    preload="none"
                    onPlay={handlePlay}
                    onPause={handlePause}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
