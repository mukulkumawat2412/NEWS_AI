import { Avatar, Tabs, Text, Button, Container, Card, Group, Badge, Divider, } from '@mantine/core';
import {motion} from "framer-motion"
import { getCookie } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReadingHistory } from '../redux/slices/ReadingHistory';
import List from '../Comp/List';
import { getBookmarks } from '../redux/slices/bookmarkSlice';



const Profile = () => {

    const dispatch = useDispatch()
    const {readingHistory,} = useSelector((state)=>state.ReadingHistory)

    const {bookmarks} = useSelector((state)=>state.Bookmark)



    useEffect(()=>{
        dispatch(getReadingHistory())
        dispatch(getBookmarks())
    },[])
  
 
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <Container className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
                <Card className="p-6 shadow-md">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex items-center gap-6"
                    >
                        <Avatar
                        
                            size={100}
                            radius="xl"
                            src="https://via.placeholder.com/100"
                            alt="User Avatar"
                        />
                        <Text>{getCookie("name")}</Text>
                        <Text>{getCookie("email")}</Text>
                        <div>
                            <h1 className="text-2xl font-bold">
                               
                            </h1>
                            <h2 className="text-gray-500"></h2>
                        </div>
                    </motion.div>

                    <Group position="left" spacing="md" className="mt-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
                        >
                            <Badge color="blue" size="lg">
                                📌 Bookmarks: {bookmarks.length  > 0 ? bookmarks.length :0}
                            </Badge>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
                        >
                            <Badge color="green" size="lg">
                                
                            Reading History: {readingHistory.length >0 ? readingHistory.length :0}
                            </Badge>
                        </motion.div>
                    </Group>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Button variant="outline" fullWidth color="blue" className="mt-4">
                            Edit Profile
                        </Button>
                    </motion.div>
                </Card>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <Tabs defaultValue="bookmarks" className="mt-6">
                        <Tabs.List>
                            <Tabs.Tab value="bookmarks">📌 Bookmarks</Tabs.Tab>
                            <Tabs.Tab value="liked">❤️ Liked News</Tabs.Tab>
                            <Tabs.Tab value="ai-news">🤖 AI Recommendations</Tabs.Tab>
                            <Tabs.Tab value="preferences">⚙ Preferences</Tabs.Tab>
                            <Tabs.Tab value="reading-history">⚙ Reading History</Tabs.Tab>
                           
                        </Tabs.List>

                        <Tabs.Panel value="bookmarks" className="p-4">
                          <List data={bookmarks}/>
                        </Tabs.Panel>

                        <Tabs.Panel value="liked" className="p-4">
                            <Text className="text-gray-700">No liked news articles.</Text>
                        </Tabs.Panel>

                        <Tabs.Panel value="ai-news" className="p-4">
                            <Text className="text-gray-700">
                                AI-powered news recommendations will appear here.
                            </Text>
                        </Tabs.Panel>

                        <Tabs.Panel value="preferences" className="p-4">
                            <Text className="text-gray-700">No preferences set.</Text>
                        </Tabs.Panel>
                        <Tabs.Panel value="reading-history" className="p-4">
                        {readingHistory.length > 0 ? readingHistory.map((rh)=>(
                            <>
                            <a href={rh.url} className='block p-3 hover:underline transition-all duration-300' target='_blank'>{rh.url}</a>
                            <Divider/>
                            </>
                          
                        )):null}
                        </Tabs.Panel>
                    </Tabs>
                </motion.div>
            </Container>
        </motion.div>
    );
};

export default Profile;