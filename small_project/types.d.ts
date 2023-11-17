type Result = {
    pageId: string,
    title: string,
    extract: string,
    thumbnail?: {
        src: string,
        width: number,
        height: number
    }
}

type SearchResult = {
    query?: {
        pages?:Result[]
    }
}