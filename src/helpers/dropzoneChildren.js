import {Group, Text} from '@mantine/core'
import ImageUploadIcon from '../components/ImageUploadIcon'

const getIconColor = (status, theme) => {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
        ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

const dropzoneChildren = (status, theme) => (
    <Group position='center' spacing={'xl'} style={{
        minHeight: 220,
        
        pointerEvents: 'none'
    }}>
        <ImageUploadIcon
            status={status}
            style={{
                color: getIconColor(status, theme)
            }}
            size={80}
        />

        <div>
            <Text size="xl" inline>
                Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed 3mb
            </Text>
        </div>
    </Group>
)

export default dropzoneChildren;