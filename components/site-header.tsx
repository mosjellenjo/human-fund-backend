import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-0 bg-dark-green text-light-green-text">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <span className="text-xl font-bold tracking-tight">The Human Fund</span>
          </Link>
          <span className="text-xs text-light-green-text hidden sm:inline-block">Money for People</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#mission" className="text-sm font-medium transition-colors text-light-green-text px-2 py-1 hover:bg-white hover:text-black hover:rounded-md">
            Mission
          </Link>
          <Link href="#impact" className="text-sm font-medium transition-colors text-light-green-text px-2 py-1 hover:bg-white hover:text-black hover:rounded-md">
            Impact
          </Link>
          <Link href="#team" className="text-sm font-medium transition-colors text-light-green-text px-2 py-1 hover:bg-white hover:text-black hover:rounded-md">
            Team
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors text-light-green-text px-2 py-1 hover:bg-white hover:text-black hover:rounded-md">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex bg-button-yellow text-black border-button-yellow hover:bg-white hover:text-black">
            Sign In
          </Button>
          <Button size="sm" asChild className="bg-button-yellow text-black hover:bg-white hover:text-black">
            <a href="#contact">Donate Now</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
