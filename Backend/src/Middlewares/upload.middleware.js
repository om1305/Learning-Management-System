import multer, { memoryStorage } from "multer";

//RAM store not disk storage
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
})

