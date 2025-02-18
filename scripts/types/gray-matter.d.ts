declare module 'gray-matter' {
  interface GrayMatterData {
    data: Record<string, any>
    content: string
    excerpt?: string
  }

  function matter(input: string): GrayMatterData

  export = matter
} 