"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { destinations } from "@/lib/data"

export interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: any[]
  performSearch: (query: string) => void
  isSearching: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)

    // Simple search implementation
    const results = destinations.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.country.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setIsSearching(false)
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        performSearch,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

