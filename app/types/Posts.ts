export type PostType = {
    title: string
    id: string
    createdAd: string
    user: {
        name: string 
        image: string
    }
    Comment?: {
        createdAt: string
        id: string
        postId: string
    }[]
}