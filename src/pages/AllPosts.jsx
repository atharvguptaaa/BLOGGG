import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
    
                console.log(posts.documents);
                setPosts(posts.documents)
            }
        })
    }, [])
  
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    post.status==="public"&&(
                    <div key={post.$id} className='p-2 w-1/4'>
                        {console.log(post.status)}
                        <PostCard {...post} />
                    </div>)
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts