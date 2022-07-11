import { Text, Container, AppShell, Header, Title } from "@mantine/core";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import CardListSingle from "../components/CardListSingle";
import { db } from "../firebase";

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'posts'))
        onSnapshot(q, (querySnapshot) => {
            setCards(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [])
    return (
        <AppShell
            padding={"md"}
            header={<Header height={60} p='xs'>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#131313"
                }}
                className="space-x-5 "
                >
                    <Link style={{
                        color: "#313131",
                        textDecoration: "none"
                    }} to={"/"}>Beranda</Link>
                    <Link 
                        to={"/new"}
                        style={{
                            color: "#313131",
                            marginLeft: 20,
                            textDecoration: "none"
                        }}
                    >Buat</Link>
                    <Link 
                        to={"/list"}
                        style={{
                            color: "#313131",
                            marginLeft: 20,
                            textDecoration: "none"
                        }}
                    >Daftar Kartu</Link>
                </div>
            </Header>}
        >
            <Container size="md">
                <Title order={2}>Daftar Kartu</Title>
                {cards.map(card =>(
                    <CardListSingle 
                        key={card.id} 
                        setToggle={setToggle} 
                        id={card.id}  
                        title={card.judul} 
                        message={card.pesan} 
                        receiver={card.penerima} 
                    />))}
            </Container>
        </AppShell>
    )
}

export default CardList;