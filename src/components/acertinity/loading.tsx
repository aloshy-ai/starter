'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { FadeInOut } from '@/components/layout/fade-in-out'

export function Loading({ className }: { className?: string }) {
  return (
    <FadeInOut className={cn('', className)}>
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="duration-600 relative h-40 w-[40rem] animate-pulse transition-all">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        </div>
      </div>
    </FadeInOut>
  )
}
