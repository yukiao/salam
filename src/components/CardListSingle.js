import { Button, Modal, TextInput, Textarea, Loader } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import {Edit, Trash} from 'tabler-icons-react';
import { db } from '../firebase';
import {useForm} from '@mantine/form'
import { BASE_URL } from '../CONSTANT';

const CardListSingle = ({id, title, receiver, message, setToggle}) => {
    const form = useForm({
        initialValues: {
            judul: title,
            penerima: receiver,
            pesan: message
        }
    })
    const [isModalOpened, setModalOpened] = useState(false)

    const [isUpload, setIsUpload] = useState(false);

    const clipboard = useClipboard({timeout: 1000})
    const handleDelete = async (e) => {
        const cardDocRef = doc(db, 'posts', id)
        try{
            await deleteDoc(cardDocRef)
            setToggle(prev => !prev)
        }catch(err){
            alert(err)
        }
    }

    return (
        <>
        <div style={{
            width: "100%",
            padding: "3px 10px",
            border: "2px solid #313131",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10px"
        }}>
            <p style={{
                flex:1
            }}>{title}</p>
            
            <Button
                mr={"md"}
                color={clipboard.copied? "teal": 'blue'}
                onClick={() => clipboard.copy(`${BASE_URL}/cards/${id}`)}
            >
                {clipboard.copied? "Link disalin": "Salin Link"}
            
            </Button>
            <Trash cursor={"pointer"} style={{marginRight: 5}} onClick={handleDelete} />
            <Edit cursor={"pointer"} onClick={() => setModalOpened(true)} />
        </div>

        <Modal opened={isModalOpened} size="sm" centered  onClose={() => setModalOpened(false)}>
            <form style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column"
            }}
            onSubmit={form.onSubmit(async (values) => {
                setIsUpload(true)
                const cardDocRef = doc(db, 'posts', id)
                try {
                    await updateDoc(cardDocRef, {
                        judul: values.judul,
                        penerima: values.penerima,
                        pesan: values.pesan,
                    })
                    setModalOpened(true)
                    setIsUpload(false)
                } catch (error) {
                    setIsUpload(false)
                    alert(error)
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
        </Modal>
        </>
    )
}

export default CardListSingle;