const ENTROPEDIA_URL = import.meta.env.VITE_ENTROPEDIA_IMG_URL;

interface TabEntropediaImage {
    imgId: string;
}

function TabEntropediaImage({ imgId }: TabEntropediaImage) {
    return (
        <>
            {imgId && (
                <img
                    src={`${ENTROPEDIA_URL}/${imgId}Micro.jpg`}
                    alt="item image"
                />
            )}
        </>
    );
}

export default TabEntropediaImage;
