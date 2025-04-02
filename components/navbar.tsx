"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, User, LogOut } from "lucide-react"
import SearchBar from "@/components/search-bar"
import { getCurrentUser, signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ firstName: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser ? { firstName: currentUser.firstName, email: currentUser.email } : null)
      } catch (error) {
        // If there's an error, assume user is not logged in
        console.error("Error checking user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [pathname]) // Re-check when pathname changes to update after login/logout

  const isActive = (path: string) => pathname === path

  // Update the navItems array to replace 'About' with 'Interactive Map'
  const navItems = [
    { name: "Home", path: "/" },
    { name: "How We Work", path: "/how-we-work" },
    { name: "Destinations", path: "/destinations" },
    { name: "Tours", path: "/tours" },
    { name: "Interactive Map", path: "/map" },
    { name: "Contact", path: "/contact" },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="AfroTour Nexus" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:block mx-4 flex-1 max-w-md">
          <SearchBar />
        </div>

        {/* Improve spacing in the navbar by updating the nav flex container */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.firstName || "Account"}
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="default">Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b py-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <img src="/images/logo.png" alt="AfroTour Nexus" className="h-8 w-auto" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <div className="py-4">
                <SearchBar />
              </div>

              <nav className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-2 py-1 text-lg font-medium transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t py-6 flex flex-col gap-4">
                {!isLoading && (
                  <>
                    {user ? (
                      <>
                        <div className="px-2 py-2">
                          <p className="font-medium">Signed in as:</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full flex items-center justify-center">
                            <User className="h-4 w-4 mr-2" />
                            My Dashboard
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full" onClick={handleSignOut}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full">Login</Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="default" className="w-full">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

