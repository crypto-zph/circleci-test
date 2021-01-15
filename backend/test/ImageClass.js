const assert        = require('chai').assert;
const ImageClass    = require('../classes/ImageClass');

describe('IMAGE CLASS', () =>
{
    it ('should return array of data with converted image',
        async () =>
        {
            let data =
            [
                {
                    _id: '5f92b144d15bfd2eac776e92',
                    avatar_path: '1601622238633.jpeg',
                    gender: 'MALE',
                    username: 'sample',
                    followers: [ '5fb3992503ebc22d8cefbdb2' ],
                    full_name: 'Sample User'
                }
            ];

            let image_class = new ImageClass();
            data            = await image_class.convertImagePath(data, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            assert.isArray(data);

        }
    );

    it ('should return string of base64 image for valid image path',
        async () =>
        {
            let image_url = `${process.cwd()}/public/avatar/1601622238633.jpeg`;

            let image_class = new ImageClass();
            let image       = await image_class.convertImageToBase64(image_url);

            assert.notEqual(image, 'false');
        }
    );

    it ('should return false for invalid image url',
        async () =>
        {
            let image_url = `${process.cwd()}/public/avatar/asda.jpeg`;

            let image_class = new ImageClass();
            let image       = await image_class.convertImageToBase64(image_url);

            assert.equal(image, false);
        }
    );

    it ('should return array of converted images',
        async () =>
        {
            let images =
            [
                '1606221822636.jpeg',
                '1606221829482.jpeg',
                '1606221839243.jpeg'
            ];

            let image_class = new ImageClass();
            images = await image_class.convertImages(images);

            assert.isArray(images);
        }
    );

    it ('should return boolean to validate if image exists',
        async () =>
        {
            let image       = '';

            let image_class = new ImageClass();
            let is_valid    = await image_class.isImageExists(image);

            assert.isBoolean(is_valid);
        }
    );

    it ('should return a string of converted image',
        async () =>
        {
            let image = '1605873411913.jpeg';
            let path  = 'announcement';

            let image_class     = new ImageClass();
            let converted_image = await image_class.convertImage(image, path);

            assert.isString(converted_image);
        }
    );
});