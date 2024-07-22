import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
function MyPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {

                setPosts(posts.documents)
            }
        })
    },[])
    
    const userPosts= posts.filter((post)=>post.userId===userData.$id)

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {userPosts.length > 0 ? (
                        userPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center">
                            <p>You haven't added any post yet.</p>
                        </div>
                    )}
            </div>
            </Container>
    </div>
  )
}

export default MyPosts