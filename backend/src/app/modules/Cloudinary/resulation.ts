import sharp from "sharp";

// eslint-disable-next-line no-undef
export const getImagesWithResulation = async (images: Express.Multer.File[]) => {
    const result = await Promise.all(images?.map(async (image) => {
        const metadata = await sharp(image.buffer).metadata()
        return {...metadata,...image}
    }))
   return result
}

export type TgetImagesWithResulation = Awaited<ReturnType<typeof getImagesWithResulation>>