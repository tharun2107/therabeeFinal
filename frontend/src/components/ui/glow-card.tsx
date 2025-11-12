import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowIntensity?: number
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  glowIntensity = 0.5
}) => {
  // Map color names to RGB values
  const colorMap: { [key: string]: string } = {
    blue: '59, 130, 246',
    purple: '147, 51, 234',
    green: '34, 197, 94',
    red: '239, 68, 68',
    yellow: '234, 179, 8'
  }
  const rgbColor = colorMap[glowColor] || colorMap.blue
  
  const glowVariants = {
    hover: {
      boxShadow: `0 0 20px rgba(${rgbColor}, ${glowIntensity}), 0 0 40px rgba(${rgbColor}, ${glowIntensity * 0.5})`,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    rest: {
      boxShadow: `0 0 0px rgba(${rgbColor}, 0)`,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <motion.div
      variants={glowVariants}
      initial="rest"
      whileHover="hover"
      className={cn(
        "relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-lg transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
