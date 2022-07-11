import {Container, Image, Box, Modal, Text, LoadingOverlay, Loader} from '@mantine/core'
import { useMantineTheme, Textarea, TextInput, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { X, Check } from 'tabler-icons-react';
import dropzoneChildren from '../helpers/dropzoneChildren';
import fileToDataUri from '../helpers/fileToDataUri';
import { db, storage } from '../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useClipboard } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../CONSTANT';


const New = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cover, setCover] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [isImageHover, setIsImageHover] = useState(false);
    const [isUpload, setIsUpload] = useState(false);

    const [urlLink, setUrlLink] = useState("");
    const navigate = useNavigate();

    const clipboard = useClipboard({timeout: 1000})

    const form  = useForm({
        initialValues: {
            judul: '',
            penerima: "",
            pesan: ""
        }
    })

    const onImagesChange = (files) => {
        if(files.length === 0){
            setCover("");
            return
        }

        fileToDataUri(files[0])
        .then(dataUri => {
            setCover(dataUri);
            setCoverFile(files[0])
        })
    }

    const onMouseHover = (e) => {
        setIsImageHover(true)
    }

    const onMouseOut = (e) => {
        setIsImageHover(false);
    }

    const onCloseClick = (e) => {
        setCover("");
        setCoverFile(null);
    }

    const theme = useMantineTheme();
    return (
        <>
        <Container fluid sx={{
            backgroundColor: "#efefef",
            margin: 0
        }}
        py={"xl"}
        >
            <Container sx={{
                backgroundColor: "white",
                minHeight: "100vh",
                borderRadius: "10px",
                padding: 40
            }}
            >
                {!cover && !coverFile ? (<Dropzone
                    multiple={false}
                    onDrop={onImagesChange}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                >
                    {(status) => dropzoneChildren(status, theme)}
                </Dropzone>)
                : 
                (
                <Box sx={{
                    position: "relative"
                }} 
                onMouseOver={onMouseHover}
                onMouseOut={onMouseOut}
                >
                    {isImageHover && (
                        <X size={24} color="white"  style={{
                            position: "absolute",
                            right: 5,
                            top: 5,
                            zIndex: 99
                        }}
                        cursor="pointer"
                        onClick={onCloseClick}
                        />
                    )}
                    <Image src={cover} />  
                </Box>
                )
            }

            <form style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column"
            }}
            onSubmit={form.onSubmit(async (values) => {
                setIsUpload(true)
                try{
                    if(!coverFile){
                        alert('Harap mengupload gambar sampul')
                    }

                    const storageRef = ref(storage, `/files/${coverFile.name}`)

                    const uploadTask = uploadBytesResumable(storageRef, coverFile);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {

                        },(err) => console.log(err),
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref)
                            const data = await addDoc(collection(db, 'posts'), {
                                judul: values.judul,
                                penerima: values.penerima,
                                pesan: values.pesan,
                                cover: url,
                                created: Timestamp.now()
                            })
                            setUrlLink(`${BASE_URL}/cards/${data._key.path.segments[1]}`)
                            setModalOpen(true)
                            setIsUpload(false)
                        }
                    )

                }catch(err){
                    setIsUpload(false)
                    alert(err)
                }
            })}
            >
                <TextInput 
                    required
                    disabled={isUpload}
                    label="Judul"
                    placeholder='Ucapan Selemat buat ...'
                    {...form.getInputProps('judul')}
                />
                <TextInput 
                    required
                    disabled={isUpload}
                    mt={"md"}
                    label="Penerima"
                    placeholder='John Doe'
                    {...form.getInputProps('penerima')}
                />
                <Textarea
                    required
                    disabled={isUpload}
                    mt={"md"}
                    label="Pesan"
                    placeholder='....'
                    {...form.getInputProps('pesan')}
                />
                <Button type='submit' mt={"xl"}>
                    {isUpload ? (
                    <Loader color={"#fff"} variant="dots" size="sm" my="lg" />
                    ): "Simpan"}
                </Button>
            </form>
            </Container>
        </Container>
        <Modal
            centered
            opened={modalOpen}
            onClose={() => {
                setModalOpen(false)
                navigate("/", {replace: true})
            }}
            title=""
        >
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                alignItems: "center"
            }}
            
            >
                <Box sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 99,
                    backgroundColor: "#13B887",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }} color="teal">
                    <Check size={24} color="white" />
                </Box>
                <Text ml={"md"}>Kartu berhasil dibuat</Text>
            </Box>
            <Container fluid sx={{
                display: "flex",
                justifyContent: "center"
            }}>
            <Button
                mt={"lg"}
                color={clipboard.copied? "teal": 'blue'}
                onClick={() => clipboard.copy(urlLink)}
            >
                {clipboard.copied? "Link disalin": "Salin Link"}
            
            </Button>

            </Container>
        </Modal>
        </>
    )
}

export default New;