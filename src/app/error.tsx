'use client'

import { Error, ErrorPageProps } from '@/components/error'

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <Error error={error} reset={reset} />
}
