export interface Comment {
    id: number
    username: string
    content: string
    date: string
}

export interface Photo {
    id: number
    url: string
    caption: string
    comments: Comment[]
}

export interface UserData {
    id: number
    name: string
    avatar: string
    photos: Photo[]
}

export const users: UserData[] = [
    {
        id: 1,
        name: 'Alice',
        avatar: '/placeholder.svg?height=40&width=40',
        photos: [
            {
                id: 1,
                url: '/placeholder.svg?height=300&width=300',
                caption: 'Beautiful sunset',
                comments: [
                    { id: 1, username: 'Bob', content: 'Lovely!', date: '2023-06-01' },
                    { id: 2, username: 'Charlie', content: 'Great shot!', date: '2023-06-02' },
                    { id: 3, username: 'David', content: 'Amazing colors!', date: '2023-06-03' },
                    { id: 4, username: 'Eve', content: 'Where was this taken?', date: '2023-06-04' },
                    { id: 5, username: 'Frank', content: 'I wish I was there!', date: '2023-06-05' },
                    { id: 6, username: 'Grace', content: 'Stunning view!', date: '2023-06-06' },
                ]
            },
            {
                id: 2,
                url: '/placeholder.svg?height=300&width=300',
                caption: 'City lights',
                comments: [
                    { id: 7, username: 'Henry', content: 'Amazing view!', date: '2023-06-07' },
                    { id: 8, username: 'Ivy', content: 'I love night photography!', date: '2023-06-08' },
                ]
            },
        ]
    },
    {
        id: 2,
        name: 'Bob',
        avatar: '/placeholder.svg?height=40&width=40',
        photos: [
            {
                id: 3,
                url: '/placeholder.svg?height=300&width=300',
                caption: 'Mountain hike',
                comments: [
                    { id: 9, username: 'Jack', content: 'Breathtaking!', date: '2023-06-09' },
                    { id: 10, username: 'Kate', content: 'Where is this?', date: '2023-06-10' },
                    { id: 11, username: 'Liam', content: 'I need to go there!', date: '2023-06-11' },
                ]
            },
        ]
    },
    {
        id: 3,
        name: 'Charlie',
        avatar: '/placeholder.svg?height=40&width=40',
        photos: [
            {
                id: 4,
                url: '/placeholder.svg?height=300&width=300',
                caption: 'Beach day',
                comments: [
                    { id: 12, username: 'Mia', content: 'Wish I was there!', date: '2023-06-12' },
                    { id: 13, username: 'Noah', content: 'Looks relaxing', date: '2023-06-13' },
                    { id: 14, username: 'Olivia', content: 'Perfect weather!', date: '2023-06-14' },
                ]
            },
        ]
    },
]