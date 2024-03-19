import { Image as ImageResizer } from "react-native-compressor";

export const resizeImage = async (uri) => {
  const resizedImage = await ImageResizer.compress(uri, {
    quality: 0.8,
    format: "PNG",
    maxWidth: 800,
    maxHeight: 800,
    rotation: 0,
    base64: false,
    exif: true,
  });

  return resizedImage;
};
