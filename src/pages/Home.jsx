import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard,Loading } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import Loading from '../components';

function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setIsLoading(false)
        });
       
    }, []);

    if (isLoading) {
        return <Loading />;
      }

    if (authStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                    <div className="p-2 w-full">
    <h1 className="flex justify-start text-4xl md:text-6xl font-bold mt-6 font-qualigo">
        Life's more colorful,
    </h1>
    <h1 className="flex justify-start text-4xl md:text-6xl font-bold mt-10 md:mt-20 font-qualigo">
        when we connect.
    </h1>
    <div className='mt-8 md:mt-16'>
        <Link to="/login">
            <button className="bg-transparent text-black border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors">
                Login to Read Posts
            </button>
        </Link>
    </div>
</div>
                    </div>
                </Container>
            </div>
        );
    } else if (posts.length === 0 && authStatus === true &&Loading===false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link to="/add-post">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No Posts to Display. Add one!
                                </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        post.status === "public" && (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
