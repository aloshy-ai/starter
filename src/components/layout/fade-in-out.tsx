import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

export const FadeInOut = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      className={cn('', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}
