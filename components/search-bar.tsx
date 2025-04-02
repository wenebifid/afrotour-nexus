"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/lib/search-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, X } from "lucide-react"

export default function SearchBar() {
  const { searchQuery, setSearchQuery, performSearch, searchResults } = useSearch()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      setIsOpen(true)
    }
  }

  const handleResultClick = (destination: string) => {
    setIsOpen(false)
    router.push(`/destinations/${destination.toLowerCase().replace(/\s+/g, "-")}`)
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search destinations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setIsOpen(true)}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => {
                setSearchQuery("")
                setIsOpen(false)
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        <Button type="submit">Search</Button>
      </form>

      {isOpen && searchResults.length > 0 && (
        <Card className="absolute z-10 mt-1 w-full max-h-80 overflow-auto p-2">
          <ul className="space-y-1">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-2 hover:bg-muted rounded-md cursor-pointer"
                onClick={() => handleResultClick(result.name)}
              >
                <div className="flex items-center">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.name}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <p className="font-medium">
                      {result.name}, {result.country}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{result.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isOpen && searchQuery && searchResults.length === 0 && (
        <Card className="absolute z-10 mt-1 w-full p-4 text-center">
          <p className="text-muted-foreground">No destinations found</p>
        </Card>
      )}
    </div>
  )
}

