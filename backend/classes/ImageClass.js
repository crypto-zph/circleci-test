const imageToBase64 = require('image-to-base64');
const fs            = require('fs');

module.exports = class ImagesClass
{
    constructor ()
    {
        this.image_path = `${process.cwd()}/public/`;
        this.default_avatar_path = `${this.image_path}/avatar/blank_avatar.jpg`;
    }

    /**
     *
     * @param { Array|Object } image_data
     * @param { String|Array } image_field_name
     * @param { String|Array } image_path
     * @param { String } type
     *
     * @return { Array|Object } with convert image
     */
    async convertImagePath(image_data, image_field_name, image_path, type = 'Items')
    {
        try {
            if (Array.isArray(image_field_name) && Array.isArray(image_path)) {
                for (let counter = 0; counter < image_data.length; counter++) {
                    // image_field_name.forEach(async (field, index) =>
                    // {
                        for (let field = 0; field < image_field_name.length; field++) {
                            let path = `${this.image_path}${image_path[field]}`;

                            if (Array.isArray(image_data[counter][image_field_name[field]])) {
                                for (let count = 0; count < image_data[counter][image_field_name[field]].length; count++) {
                                    let image = `${path}/${image_data[counter][image_field_name[field]][count]}`;

                                    image_data[counter][image_field_name[field]][count] = await this.convertImageToBase64(image);
                                }
                            } else {
                                image_data[counter][image_field_name[field]] = await this.convertImageToBase64(`${path}/${image_data[counter][image_field_name[field]]}`);

                                if (image_data[counter][image_field_name[field]] == '' && image_path[field] == 'avatar') {
                                    image_data[counter][image_field_name[field]] = await this.convertImageToBase64(this.default_avatar_path);
                                }
                            }
                        }
                    // });
                }
            } else {
                let path = `${this.image_path}${image_path}`;

                for (let counter = 0; counter < image_data.length; counter++) {

                    // if (image_data[counter].avatar_path) {
                        let new_path = (image_path == 'avatar' && type == 'Items' && image_data[counter].gender) ? `${path}/${image_data[counter].gender.toUpperCase()}` : path;

                        if (Array.isArray(image_data[counter][image_field_name])) {
                            for (let count = 0; count < image_data[counter][image_field_name].length; count++) {
                                let image = `${new_path}/${image_data[counter][image_field_name][count]}`;

                                image_data[counter][image_field_name][count] = await this.convertImageToBase64(image);
                            }
                        } else {
                            let image = `${new_path}/${image_data[counter][image_field_name]}`;

                            image_data[counter][image_field_name] = await this.convertImageToBase64(image);

                            if (image_data[counter][image_field_name] == '' && image_path == 'avatar') {
                                image_data[counter][image_field_name] = await this.convertImageToBase64(this.default_avatar_path);
                            }
                        }
                    // }

                }
            }

            return image_data;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    /**
     *
     * @param { String } image -> full path to convert
     *
     * @return { String|Base64 } converted image
     */
    async convertImageToBase64(image)
    {
        try {
            if (await this.isImageExists(image)) {
                image = await imageToBase64(image);
            } else {
                image = '';
            }
        } catch (error) {
            console.log(error);
        }

        return image;
    }

    /**
     *
     * @param { Array } images to convert
     * @param { String } path = image path in public folder
     *
     * @return { Array | Boolean } => boolean false for no converted image OR array of converted images
     */
    async convertImages(images, path)
    {
        path = `${this.image_path}${path}`;

        try {
            for (let count = 0; count < images.length; count++) {
                images[count] = await this.convertImageToBase64(`${path}/${images[count]}`);
            }

            return images;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    /**
     *
     * @param { String } image
     * @param { String } path
     *
     * @return { String } converted image to base64
     */
    async convertImage(image, path)
    {
        path = `${this.image_path}${path}`;

        try {
            image = await this.convertImageToBase64(`${path}/${image}`);

            return image;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    /**
     *
     * @param { String } image path
     *
     * @return { Boolean } if image exists or not
     */
    async isImageExists(image)
    {
        let is_exists = true;

        try {
            fs.accessSync(image);
        } catch (error) {
            is_exists = false;
        }

        return is_exists;
    }
}
