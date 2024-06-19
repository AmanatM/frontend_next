"use client"
import { MotionValue, useAnimate, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import React, { useState, useEffect, useRef } from "react"
import { useMotionTemplate, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const EvervaultCard = ({ text, className }: { text?: string; className?: string }) => {
  let mouseX = useSpring(-400, { stiffness: 100, damping: 20 })
  let mouseY = useSpring(-20, { stiffness: 100, damping: 20 })

  const [randomString, setRandomString] = useState("")

  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const isInView = useInView(ref, { amount: 1, margin: "0px 0px -20% 0px", once: true })

  useEffect(() => {
    let str = generateRandomString(1500)
    setRandomString(str)
  }, [])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      mouseX.set(150)
      mouseY.set(0)

      setHasAnimated(true)
    }
  }, [isInView, hasAnimated, mouseX, mouseY])

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

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div className={cn("relative flex h-full w-full items-center justify-center bg-transparent p-0.5", className)}>
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

type CardPatternProps = {
  mouseX: MotionValue<any>
  mouseY: MotionValue<any>
  randomString: string
  hasAnimated: boolean
}
export function CardPattern({ mouseX, mouseY, randomString, hasAnimated }: CardPatternProps) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  const opacity = hasAnimated ? 1 : 0
  console.log(opacity)
  let style = { maskImage, opacity }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl"
        style={style}
      />
      <motion.div className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay" style={style}>
        {randomString && (
          <p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white">
            {randomString}
          </p>
        )}
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
