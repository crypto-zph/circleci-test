const ItemClass = require('../classes/ItemClass');
const ImageClass = require('../classes/ImageClass');
const CategoryClass = require('../classes/CategoryClass');
const ScheduleClass = require('../classes/ScheduleClass');

module.exports =
{
	async addItem(req, res)
	{

		let item_image = [];

		for(item of req.files.transactions_image) {
			item_image.push('transactions / ' + item.filename);
		}

		let item_information = {
			seller_id		  				: req.body.seller_id,
			seller_avatar	  				: req.body.seller_avatar,
			seller_username   				: req.body.seller_username,
            seller_first_name 				: req.body.seller_first_name,
           	seller_last_name  				: req.body.seller_last_name,
           	buyer_id 		  				: req.body.buyer_id,
           	buyer_first_name  				: req.body.buyer_first_name,
           	buyer_last_name   				: req.body.buyer_last_name,
			item_name 		  				: req.body.item_name,
			category		  				: req.body.item_category,
			sub_category 	  				: req.body.item_sub_category,
			sub_category2 	  				: req.body.item_sub_category2,
			performance 	  				: req.body.item_performance,
			condition 		  				: req.body.item_condition,
			caption 		  				: req.body.caption,
			is_garage_sale	  				: req.body.is_garage_sale,
			garage_sale_percentage 			: req.body.garage_sale_percentage,
			is_featured_product				: req.body.is_featured_product,
			featured_product_duration_from	: req.body.featured_product_duration_from,
			featured_product_duration_to	: req.body.featured_product_duration_to,
			escrow_duration					: req.body.escrow_duration,
			item_image,
			description		  				: req.body.item_description,
			location 		  				: req.body.location,
			price 			  				: req.body.item_price,
			has_legalities					: req.body.has_legalities,
			legalities						: req.body.legalities
		}

		let item_class = new ItemClass(item_information);
		let item_add = await item_class.addItem();

		if (item_add.status == "success")
		{
			// console.log(req.body);
			res.send(true);
		}
		else if (item_add.status == "error")
		{
			res.status(400).send({ message: item_add.message });
		}
	},

	async upload(req, res)
	{
		let images = [];

		let item_class = new ItemClass();

		for (var i = 0; i < req.files.image.length; i++) {

			let ext = "";

            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg",
                "image/png": "png"
            };

            if (mime_types.hasOwnProperty(req.files.image[i].mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[req.files.image[i].mimetype];
            }

			let file_name = `${Date.now()}.${ext}`;
			await item_class.resizeImage(req.files.image[i].buffer, file_name);
			images.push(file_name);
		}

		res.status(200).send({ images: images });
	},

	async uploadLegalities(req, res)
	{
		let legalities = [];

		for (let i = 0; i < req.files.length; i++)
		{
			legalities.push(req.files[i].filename);
		}

		console.log(legalities);

		res.status(200).send({ legalities: legalities });
	},

	async getItem(req, res)
	{
		let item_information = {
			id: req.params.id
		}

		let item_class = new ItemClass(item_information);
		let items = await item_class.getItem();

		if (items.status == "error")
		{
			res.status(400).send({ message: items.message });
		}
		else
		{
			res.send(items);
		}
	},

	async checkSavedItem(req, res)
	{
		let item_information = {
			item_id: 	req.body.id,
			buyer_id: 	req.body.buyer_id
		}

		let item_class = new ItemClass(item_information);
		let item_check = await item_class.checkSavedItem();

		res.send(item_check);
	},

	async addToCart(req, res)
	{
		let item_information = {
			seller_id  : req.body.seller_id,
	        buyer_id   : req.body.buyer_id,
	        item_id    : req.body.item_id,
	        item_name  : req.body.item_name,
	        item_image : req.body.item_image[0],
	        category   : req.body.item_category,
	        price: {
	        	BRT : req.body.item_price.BRT
	        }
		}

		let item_class = new ItemClass(item_information);
		let item_save = await item_class.addToCart();

		if (item_save.status == "success")
		{
			res.send(true);
		}
		else if (item_save.status == "error")
		{
			res.status(400).send({ message: item_save.message });
		}
	},

	async removeToCart(req, res)
	{
		let item_information = {
			item_id   : req.body.id,
			buyer_id  : req.body.buyer_id
		}

		let item_class = new ItemClass(item_information);
		let item_remove = await item_class.removeToCart();

		if (item_remove.status == "success")
		{
			res.send(true);
		}
		else if (item_remove.status == "error")
		{
			res.status(400).send({ message: item_remove.message })
		}
	},

	async removeAllToCart(req, res)
	{
		let item_information = {
			buyer_id: req.body.buyer_id
		}

		let item_class = new ItemClass(item_information);
		let item_remove = await item_class.removeAllToCart();

		if (item_remove.status == "success")
		{
			res.send(true);
		}
		else if (item_remove.status == "error")
		{
			res.status(400).send({ message: item_remove.message })
		}
	},

	async barter(req, res)
	{
		let item_information =
		{
			item_id: req.body.item_id,
			seller_id: req.body.seller_id,
			buyer: req.user_info,
			duration: req.body.duration
		}

		let item_class = new ItemClass(item_information);
		let item_barter = await item_class.barter();

		if (item_barter.status == "success")
		{
			res.status(200).send(true);
			let schedule_class = new ScheduleClass(item_information);
			await schedule_class.setCancelSchedule();
		}
		else if (item_barter.status == "error")
		{
			res.status(400).send({ message: item_barter.message });
		}
	},

	async releaseAmount(req, res)
	{
		let item_information =
		{
			item_id: req.body.item_id,
			seller_id: req.body.seller_id,
		}

		let item_class = new ItemClass(item_information);
		let item_barter = await item_class.releaseAmount();

		if (item_barter.status == "success")
		{
			res.status(200).send(true);
		}
		else if (item_barter.status == "error")
		{
			res.status(400).send({ message: item_barter.message });
		}
	},

	async cancelBarter(req, res)
	{
		let item_details = 
		{
			buyer_id : req.body.buyer_id,
			item_id	 : req.body.item_id,
		}
		let item_class = new ItemClass(item_details);
		let item_barter = await item_class.cancelBarter();

		if (item_barter.status == "success")
		{
			res.status(200).send(true);
		}
		else if (item_barter.status == "error")
		{
			res.status(400).send({ message: item_barter.message });
		}
	},

	async conversion(req, res)
	{
		let item_class = new ItemClass();
		let item_conversion = await item_class.conversion();

		if (item_conversion.status == "error")
		{
			res.status(400).send({ message: item_conversion.message });
		}
		else
		{
			res.send(item_conversion);
		}
	},

	async view(req, res)
	{
		let item_information =
		{
			id: req.body.id,
			buyer_id: req.body.buyer_id
		}

		let item_class = new ItemClass(item_information);
		let response = await item_class.addView();

		res.send(`${response.item.total_views.length}`);
	},

	async itemStatus(req, res)
	{
		let item_information = {
			status : req.body.status
		}

		let item_class = new ItemClass(item_information);
		let image_class = new ImageClass();
		let item_status = await item_class.itemStatus();

		if (item_status.status == "success")
		{
			res.send(item_status);
		}
		else if (item_status.status == "error")
		{
			res.status(400).send({ message: item_status.message });
		}
	},

	async fetchFilteredItems(req, res)
	{
		// item_name
		// category
		// sub_category
		// country
		// price.USD
		// price.BRT
		// price.PHP
		// created_timestamp
		// performance
		// condition
		const item_information = {
			item_name		: req.body.item_name,
			category		: req.body.category,
			sub_category	: req.body.subcategory,
			sub_category2	: req.body.subcategory2,
			country			: req.body.country.name,
			performance 	: req.body.item_performance,
			condition		: req.body.item_condition,
			sort_by			: req.body.sort_by.toLowerCase(),
			min_price		: req.body.min_price,
			max_price		: req.body.max_price,
		}

		const items_res_obj = await ItemClass.fetchFilteredItems({...item_information});

		// console.log(items_res_obj.items)

		if(items_res_obj.status == 'success')
		{
			res.status(200).json({status: 'success', items: items_res_obj.items});
		}else
		if(items_res_obj == 'error')
		{
			res.status(400).json({status: 'error', message: 'error'})
		}
	},
	async getItems(req, res)
	{
		let item_class = new ItemClass();
        let items_data = await item_class.getItems();

        if (items_data.status == 'success') {
            res.status(200).json(items_data);
        } else {
            res.status(400).json(items_data);
        }
	},

	async listItem(req, res)
	{
		let item_class = new ItemClass();
		let item_list = await item_class.listItem();

		if (item_list.status == "success")
		{
			res.send(item_list);
		}
		else if (item_list.status == "error")
		{
			res.status(400).send({ message: item_list.message });
		}
	},

	async updateItem(req, res)
	{
		let item_information = {
			id		: req.body.id,
			status	: req.body.status
		}

		let item_class = new ItemClass(item_information);
		let item_update = await item_class.updateItem();

		if (item_update.status == "success")
		{
			res.send(true);
		}
		else if (item_update.status == "error")
		{
			res.status(400).send({ message: item_update.message });
		}
	},

	async checkItemForApproval(req, res)
	{
		let item_class = new ItemClass();
	},

	async identifySeller(req, res)
	{
		let item_information = {
			seller_id : req.body.seller_id
		}

		let item_class = new ItemClass(item_information);
		let item_seller = await item_class.identifySeller();

		if (item_seller.status == "success")
		{
			res.send(item_seller);
		}
		else if (item_seller.status == "error")
		{
			res.status(400).send({ message: item_seller.message });
		}

	},

	async fetchPostedItem(req, res)
	{
		const posted_item_details_res_obj = await ItemClass.fetchPostedItem(req.body.item_id);

		if(posted_item_details_res_obj.status == 'error')
		{
			res.json({status: 'error', message: 'the item you\'re trying to find do not exists'});
		}

		if(posted_item_details_res_obj.status == 'success' )
		{
			res.json({status: 'success', postedItem: posted_item_details_res_obj.item, comments: posted_item_details_res_obj.item_comments});
		}
	},
	async getCategories(req, res)
	{
		let item_class = new ItemClass();
		let item_categories = await item_class.getCategories();

		// console.log(item_categories);

		if (item_categories.status == "success")
		{
			res.send(item_categories);
		}
		else if (item_categories.status == "error")
		{
			res.status(400).send({ message: item_categories.message });
		}
	},

	async getSubCategories(req, res)
	{
		let item_information = {
			category_name : req.body.category
		}

		let item_class = new ItemClass(item_information);
		let item_sub_categories = await item_class.getSubCategories();

		// console.log(item_sub_categories);

		if (item_sub_categories.status == "success")
		{
			res.send(item_sub_categories);
		}
		else if (item_sub_categories.status == "error")
		{
			res.status(400).send({ message: item_categories.message });
		}

	},

	async fetchSavedItems(req, res)
	{
		let item_information = {
			buyer_id : req.body.buyer_id
		}

		let item_class = new ItemClass(item_information);
		let item_saved = await item_class.fetchSavedItems();

		if (item_saved.status == "success")
		{
			res.send(item_saved);
		}
		else if (item_saved.status == "error")
		{
			res.status(400).send({ message: item_saved.message });
		}
	},

    async getGarageSaleItems(req, res)
    {
        let item_class = new ItemClass();
        let garage_sale = await item_class.getGarageSaleItems();

        if (garage_sale.status == 'success') {
            res.status(200).send(garage_sale);
        } else {
            res.status(400).send(garage_sale);
        }
	},
	
	async getLimitedItems(req, res)
	{
		let item_class = new ItemClass(req.body);
		let item_list = await item_class.limitedItems();

		if (item_list.status == "success")
		{
			res.send(item_list);
		}
		else if (item_list.status == "error")
		{
			res.status(400).send({ message: item_list.message });
		}
	},

    async getSuggestedProducts(req, res)
    {	
        let searches = req.query.searches;

        searches = Array.isArray(searches) ? searches : [searches];

        for (let count = 0; count < searches.length; count++) {
            searches[count] = searches[count].replace('/%20/g', ' ');
        }

        let item_class = new ItemClass();
        let suggested_products = await item_class.getSuggestedProducts(searches);

        if (suggested_products.status == 'success') {
            res.status(200).send(suggested_products);
        } else {
            res.status(400).send(suggested_products);
        }
    },

    async getRelatedProducts(req, res)
    {
		let item_id = req.params.item_id;
		let skip = req.params.skip

        let item_class = new ItemClass();
        let related_products = await item_class.getRelatedProducts(item_id, skip);

        if (related_products.status == 'success') {
            res.status(200).send(related_products);
        } else {
            res.status(400).send(related_products);
        }
	},
	
	async getRelatedProductsNoLimit(req, res)
    {
		let item_id = req.params.item_id;

        let item_class = new ItemClass();
        let related_products = await item_class.getRelatedProductsNoLimit(item_id);

        if (related_products.status == 'success') {
            res.status(200).send(related_products);
        } else {
            res.status(400).send(related_products);
        }
    },

    async getFeaturedProducts(req, res)
    {
        let item_class = new ItemClass(req.query);
        let featured_products = await item_class.getFeaturedProducts();

        if (featured_products.status == 'success') {
            res.status(200).send(featured_products);
        } else {
            res.status(400).send(featured_products);
        }
	},

	async getProductsHistory(req, res)
    {
    	let item_information = 
    	{
    		status: req.body.status,
    		user_id: req.body.user_id 
    	}

    	let item_class = new ItemClass(item_information);
        let result = await item_class.getProductsHistory();

        if (result.status == 'success') 
        {
            res.status(200).send(result.data);
        } else 
        {
            res.status(400).send({ message: result.message });
        }
    },

	async getTotalFeaturedProducts(req, res)
    {
        let item_class = new ItemClass();
        let featured_products = await item_class.getTotalFeaturedProducts();
        if (featured_products.status == 'success') {
            res.status(200).send(featured_products);
        } else {
            res.status(400).send(featured_products);
        }
    },

    async getFeaturedProductSlots(req, res)
    {
        let item_class = new ItemClass();
        let slots = await item_class.getFeaturedProductSlots();

        if (slots.status == 'success') {
            res.status(200).send(slots);
        } else {
            res.status(400).send(slots);
        }
    },

    async checkFeaturedProductItem(req, res)
    {
        let item_id = req.params.item_id;

        let item_class = new ItemClass();
        let is_featured_product = await item_class.checkFeaturedProductItem(item_id);

        if (is_featured_product.status == 'success') {
            res.status(200).send(is_featured_product);
        } else {
            res.status(400).send(is_featured_product);
        }
	},
	
	async updateItems(req, res)
	{
		let item_information = req.body;

		let item_class = new ItemClass(item_information);
		let is_item_updated = await item_class.updateItems();

		if (is_item_updated.status == 'success')
		{
			res.status(200).send(is_item_updated);
		}
		else
		{
			res.status(400).send(is_item_updated);
		}
	},

    async notifyCancel(req, res)
    {
    	let item_information = 
    	{
    		seller_id: req.body.seller_id,
    		item_id: req.body.item_id,
    		buyer: req.user_info
    	}

    	let item_class = new ItemClass(item_information);
        let result = await item_class.notifyCancel();
        // console.log(result)
        if (result.status == 'success') {
            res.status(200).send(result.status);
        } else {
            res.status(400).send({ message: result.message });
        }
    },

    async getUserProducts(req, res)
    {
    	let item_information = 
    	{
    		user_id: req.body.user_id,
    		status: req.body.status
    	}

    	let item_class = new ItemClass(item_information);
        let result = await item_class.getUserProducts();

        res.status(200).send(result.data);
    },
}
