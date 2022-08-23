const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); //images s'enregistrent dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //remplace les espace par des _ dans le titre original
    const extension = MIME_TYPES[file.mimetype]; //recupere l'extension grace a l'objet mime_types en haut
    callback(null, name + Date.now() + "." + extension); //le nom final de l'image sera le titre original sans espace + la date et l'heure exacte (à la ms près) + l'extension
  },
});

module.exports = multer({ storage: storage }).single("image"); //seules les images sont acceptées
