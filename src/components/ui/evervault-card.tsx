"use client"
import { useAnimate, useInView, useMotionValue } from "framer-motion"
import React, { useState, useEffect, useRef } from "react"
import { useMotionTemplate, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const EvervaultCard = ({ text, className }: { text?: string; className?: string }) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [ref, animate] = useAnimate()

  const [randomString, setRandomString] = useState("")
  const [hasAnimated, setHasAnimated] = useState(false)

  const isInView = useInView(ref, { amount: 1, margin: "0px 0px -20% 0px" })

  useEffect(() => {
    let str = generateRandomString(1500)
    setRandomString(str)
  }, [])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let str = generateRandomString(1500)
      setRandomString(str)
      animate(mouseX, 500, { duration: 1.5, ease: "easeOut" })

      setHasAnimated(true)
    }
  }, [isInView, hasAnimated, mouseX, animate])

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLElement
    clientX: number
    clientY: number
  }) {
    let { left, top } = currentTarget.getBoundingClientRect()

    animate(mouseX, clientX - left, { duration: 1 }).cancel()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    const str = generateRandomString(1500)
    setRandomString(str)
  }

  return (
    <div
      ref={ref}
      className={cn("relative flex h-full w-full items-center justify-center bg-transparent p-0.5", className)}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} hasAnimated={hasAnimated} />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full text-4xl font-bold text-white">
            <div className="absolute h-full w-full blur-sm" />
            <span ref={ref} className="z-20 text-black dark:text-white">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardPattern({ mouseX, mouseY, randomString, hasAnimated }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500"
        animate={hasAnimated ? { opacity: 1 } : {}}
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay"
        animate={hasAnimated ? { opacity: 1 } : {}}
        style={style}
      >
        <p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  )
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export const generateRandomString = (length: number) => {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
