'use client'

export function signInWithGitHubAction() {
  window.location.href = '/auth/github'
}

export function signOutAction() {
  window.location.href = '/auth/sign-out'
}
