interface ImgProps {
    src: string;
    alt: string;
}

export const Img: React.FC<ImgProps> = ({src, alt}) => {
    return (
        <img src={src} alt={alt}/>
    )
}
