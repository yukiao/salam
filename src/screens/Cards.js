import { Container, Title, Button, Modal, useMantineTheme, Text, Image } from '@mantine/core';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../firebase'

const Cards = () => {
    
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false)
    const params = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        const id = params.id
        const docRef = doc(db, 'posts', id)
        getDoc(docRef).then(snapshot => setCard(snapshot.data()))
    }, [])
    
    return (
        <>
            <Container fluid sx={{
                height: "100vh",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
            >
                <Title order={1} sx={{
                    textAlign: "center",
                    color: "#313131"
                }}>Buka Kartu Kamu</Title>
                <Button mt={30} onClick={() => setOpened(true)}>Buka</Button>
            </Container>

            <Modal 
                transition={"scale"}
                transitionDuration={500}
                transitionTimingFunction="ease"
                withCloseButton={false}
                opened={opened}
                size="sm"
                centered
                onClose={() => setOpened(false)}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4]}
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <Image src={card?.cover}/>
                <Text mt={"md"} weight="bold">Hai, {card?.penerima}</Text>
                <Text mt={"md"} weight="normal">{card?.pesan}</Text>

            </Modal>
        </>
    )
}

export default Cards;