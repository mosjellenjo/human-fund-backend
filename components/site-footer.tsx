import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t-0 py-6 md:py-0 bg-dark-green text-white">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-300 md:text-left">
          © {new Date().getFullYear()} The Human Fund. All rights reserved. Money for People.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Terms
          </Link>
          <Link href="/festivus" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Festivus
          </Link>
        </div>
      </div>
    </footer>
  )
}
