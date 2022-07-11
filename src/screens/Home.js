import {
    Container,
    Title,
    useMantineTheme,
    Button,
    AppShell,
    Header
} from '@mantine/core';
import {Link} from 'react-router-dom'
const Home = () => {

    const theme = useMantineTheme();

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
                }}>Buat Kartu Ucapan Selamat Kamu</Title>
                <Link to="new">
                    <Button mt={30}>Mulai</Button>
                </Link>
            </Container>
        </AppShell>
    )
}

export default Home;