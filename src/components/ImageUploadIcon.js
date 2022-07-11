import { Upload, Photo, X} from 'tabler-icons-react'

const ImageUploadIcon = ({status, ...props}) => {
    if (status.accepted) {
        return <Upload {...props} />;
      }
    
      if (status.rejected) {
        return <X {...props} />;
      }

    return <Photo {...props} />;
}

export default ImageUploadIcon